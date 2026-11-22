import { createAccessControl } from 'better-auth/plugins/access';

const actions = ['profile', 'roster', 'editors', 'admins', 'transfer'] as const;
export const workspaceAccess = createAccessControl({ workspace: actions });
export const workspaceRoles = {
  owner: workspaceAccess.newRole({ workspace: actions }),
  admin: workspaceAccess.newRole({ workspace: ['profile', 'roster', 'editors'] }),
  editor: workspaceAccess.newRole({ workspace: ['profile', 'roster'] }),
};
export type MemberRole = keyof typeof workspaceRoles;
export function allowed(role: MemberRole, action: typeof actions[number]) {
  return workspaceRoles[role].authorize({ workspace: [action] }).success;
}
