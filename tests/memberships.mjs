import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { provisionAll } from '../scripts/workspace-provision.mjs';

const issuePath = '/api/admin/email-verification';
const redeemPath = '/api/community/verify';
const acceptPath = '/api/community/invitations';
const profiles = JSON.parse(readFileSync(new URL('../prisma/ormada-seed.json', import.meta.url)));

export async function verifyMemberships({ db, fixture, login, admin, cookie, user, userCookie, status, request }) {
  const post = (path, credential, body, expected = 200) => status(path, expected, { method: 'POST', cookie: credential, body });
  const issue = async email => (await (await post(issuePath, cookie, {email})).json()).url.split('#')[1];
  const redeem = (credential, token, expected) => post(redeemPath, credential, {token}, expected);
  const profileCopies = await db.community.findMany({ where: { slug: { in: profiles.map(p => p.slug) } }, orderBy: {slug:'asc'} });
  await provisionAll(db);
  const count = await db.organization.count();
  await provisionAll(db);
  assert.equal(await db.organization.count(), count);
  assert.deepEqual(await db.community.findMany({ where: { slug: { in: profiles.map(p => p.slug) } }, orderBy:{slug:'asc'} }), profileCopies);
  const mapped = await db.organization.findMany({where:{slug:{in:profiles.map(p=>p.slug)}}, include:{community:true}});
  assert.equal(mapped.length,25);
  assert.ok(mapped.every(o=>o.name===o.community.name && o.slug===o.community.slug));
  await post(issuePath, undefined, {email:user.email}, 401);
  await post(issuePath, userCookie, {email:user.email}, 403);
  await status(issuePath,403,{method:'POST',cookie,site:'https://invalid.test',body:{email:user.email}});
  const first = await issue(user.email);
  const challenge = () => db.emailChallenge.findUniqueOrThrow({where:{userId:user.id}});
  assert.ok((await challenge()).digest === createHash('sha256').update(first).digest('hex'));
  assert.equal((await challenge()).expiresAt - (await challenge()).issuedAt, 900000);
  await post(issuePath,cookie,{email:user.email},429);
  await redeem(undefined, first, 401);
  await redeem(cookie,first,400);
  await post(redeemPath,userCookie,{token:first,emailVerified:true,userId:user.id},400);
  await db.user.update({where:{id:user.id},data:{email:'changed-'+user.email}});
  await redeem(userCookie,first,400);
  await db.user.update({where:{id:user.id},data:{email:user.email}});
  await db.emailChallenge.update({where:{userId:user.id},data:{expiresAt:new Date(0),issuedAt:new Date(0)}});
  await redeem(userCookie,first,400);
  const fresh = await issue(user.email);
  await redeem(userCookie,first,400);
  assert.equal((await db.user.findUniqueOrThrow({where:{id:user.id}})).emailVerified,false);
  const race = await Promise.all([1,2].map(()=>request(redeemPath,{method:'POST',cookie:userCookie,body:{token:fresh}})));
  assert.deepEqual(race.map(r=>r.status).sort(),[200,400]);
  await redeem(userCookie,fresh,400);
  assert.equal(await db.emailChallenge.count({where:{userId:user.id}}),0);
  for(let i=0;i<9;i++) await redeem(cookie,first,400);
  await redeem(cookie,first,429);
  await db.workspaceAudit.findFirstOrThrow({where:{actorId:user.id,action:'verification.completed'}});
  await post('/api/community/audit', cookie, { action:'delete' },404);
  const events = await db.workspaceAudit.findMany({where:{targetId:user.id},orderBy:{createdAt:'asc'}});
  assert.deepEqual(events.map(event=>event.action),['verification.issued','verification.issued','verification.completed']);
  console.log('Verification identity, email, lifetime, replacement, replay, limits and append-only audit: passed.');

  const other = await fixture('USER');
  const otherCookie = await login(other);
  const editor = await fixture('USER');
  const editorCookie = await login(editor);
  const slug = 'membership-'+randomUUID();
  const data = {slug,name:'Membership fixture',summary:'Synthetic summary',description:'Synthetic description'};
  const created = (await (await post('/api/admin/communities',cookie,data,201)).json()).data;
  const path = '/api/community/workspaces/'+slug;
  const action = (cred,body,expected) => post(path,cred,body,expected);
  const invite = async (cred,email,role) => (await (await action(cred,{action:'invite',email,role})).json()).url.split('#')[1];
  const accept = (cred,token,expected) => post(acceptPath,cred,{token},expected);
  const org = await db.organization.findUniqueOrThrow({where:{communityId:created.id}});
  const member = userId => db.member.findUniqueOrThrow({where:{organizationId_userId:{organizationId:org.id,userId}}});
  try {
    assert.equal((await member(admin.id)).platformBootstrap, true);
    await db.user.update({where:{id:admin.id},data:{role:'USER'}});
    try {
      await action(cookie,{action:'profile',summary:'Denied'},403);
      assert.match(await (await status('/Community/workspaces/'+slug,200,{cookie})).text(), /Akses ditolak/);
    } finally {
      await db.user.update({where:{id:admin.id},data:{role:'PLATFORM_ADMIN'}});
    }
    const ownerInvite = {action:'invite',role:'owner',email:user.email};
    await action(cookie,ownerInvite,403);
    await status('/api/admin/communities/'+created.id,200,{cookie,method:'PATCH',body:{...data,publicationStatus:'PUBLISHED',claimStatus:'CLAIMED',verificationStatus:'VERIFIED'}});
    await action(undefined,ownerInvite,401);
    await action(otherCookie,{action:'profile',summary:'x'},403);
    const initial = await invite(cookie,user.email,'owner');
    await accept(otherCookie,initial,403);
    await accept(userCookie,initial);
    await accept(userCookie,initial,403);
    assert.equal((await member(user.id)).role,'owner');
    await action(cookie,ownerInvite,409);
    await action(userCookie,{action:'remove',member:(await member(user.id)).id},403);
    await action(userCookie,{action:'invite',role:'admin',email:other.email},400);
    await redeem(otherCookie,await issue(other.email),200);
    const adminInvite = await invite(userCookie,other.email,'admin');
    await action(userCookie,{action:'invite',email:other.email,role:'editor'},409);
    await db.user.update({where:{id:other.id},data:{emailVerified:false}});
    await accept(otherCookie,adminInvite,403);
    await redeem(otherCookie,await issue(other.email),200);
    await db.user.update({where:{id:other.id},data:{email:'other-'+other.email}});
    await accept(otherCookie,adminInvite,403);
    await db.user.update({where:{id:other.id},data:{email:other.email}});
    await accept(otherCookie,adminInvite);
    await redeem(editorCookie,await issue(editor.email),200);
    const canceled = await invite(otherCookie,editor.email,'editor');
    await action(otherCookie,{action:'cancel',invitation:canceled});
    await accept(editorCookie,canceled,403);
    const expired = await invite(otherCookie,editor.email,'editor');
    await db.invitation.update({where:{id:expired},data:{expiresAt:new Date(0)}});
    await accept(editorCookie,expired,403);
    const valid = await invite(otherCookie,editor.email,'editor');
    await accept(editorCookie,valid);
    const editorMember = await member(editor.id);
    await action(editorCookie,{action:'invite',email:user.email,role:'owner'},403);
    await action(editorCookie,{action:'profile',claimStatus:'CLAIMED'},400);
    await action(editorCookie,{action:'profile',description:'Editor update'});
    await action(otherCookie,{action:'transfer',member:editorMember.id},403);
    await action(otherCookie,{action:'role',member:editorMember.id,role:'admin'},403);
    await action(userCookie,{action:'role',member:editorMember.id,role:'admin'});
    await action(userCookie,{action:'role',member:editorMember.id,role:'editor'});
    await post('/api/community/workspaces/'+profiles[0].slug,editorCookie,{action:'profile',summary:'x'},403);
    const foreign = await db.member.findFirstOrThrow({where:{organizationId:{not:org.id}}});
    await action(userCookie,{action:'remove',member:foreign.id},403);
    await status(path,403,{method:'POST',cookie:userCookie,site:'https://invalid.test',body:{action:'profile'}});
    await post('/api/auth/organization/update-member-role',userCookie,{},404);
    const moves = await Promise.all([editorMember.id,(await member(other.id)).id].map(id =>
      request(path,{method:'POST',cookie:userCookie,body:{action:'transfer',member:id}})));
    assert.deepEqual(moves.map(r=>r.status).sort(),[200,403]);
    assert.equal(await db.member.count({where:{organizationId:org.id,role:'owner'}}),1);
    await assert.rejects(db.member.update({
      where:{id:(await member(user.id)).id}, data:{role:'owner',ownerSlot:1},
    }), {code:'P2002'});
    assert.equal((await member(user.id)).role,'admin');
    const newOwner = await db.member.findFirstOrThrow({where:{organizationId:org.id,role:'owner'}});
    const currentOwner = newOwner.userId===editor.id ? editorCookie : otherCookie;
    await action(currentOwner,{action:'remove',member:(await member(user.id)).id});
    await action(userCookie,{action:'profile',summary:'x'},403);
    await provisionAll(db);
    assert.equal((await member(newOwner.userId)).role,'owner');
    await status('/api/admin/communities/'+created.id+'/archive',200,{method:'PATCH',cookie});
    await action(currentOwner,{action:'profile',summary:'x'},403);
    const log = await db.workspaceAudit.findMany({where:{communityId:created.id}});
    for(const name of ['ownership.assigned','ownership.transferred','invitation.accepted','invitation.canceled','member.removed','member.role.admin','profile.updated']) {
      assert.ok(log.some(row=>row.action===name),name);
    }
    assert.ok(log.every(row=>![valid,initial,canceled].includes(row.targetId)));
    console.log('25 workspaces, verified invitations, role boundaries, scoped writes and competing transfers: passed.');
  } finally {
    await db.community.delete({where:{id:created.id}});
  }
}
