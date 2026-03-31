import { NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode('my-super-secret-key-for-culfest-test');

// Haversine formula to calculate distance in meters
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Radius of the earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in meters
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, latitude, longitude } = body;

    // Validate inputs
    if (!code || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ success: false, message: 'Data lokasi atau kode QR tidak lengkap' }, { status: 400 });
    }

    // Decode and verify the JWT QR code
    let qrPayload;
    try {
      const verified = await jwtVerify(code, SECRET_KEY);
      qrPayload = verified.payload;
    } catch (e: any) {
      if (e.code === 'ERR_JWT_EXPIRED') {
        return NextResponse.json({ success: false, message: 'QR Code tersebut sudah kedaluwarsa (berlaku hanya 1 menit 15 detik).' }, { status: 403 });
      }
      return NextResponse.json({ success: false, message: 'QR Code tidak valid.' }, { status: 400 });
    }

    if (qrPayload.type !== 'attendance_qr') {
      return NextResponse.json({ success: false, message: 'Jenis QR Code tidak sesuai.' }, { status: 400 });
    }

    const targetLat = qrPayload.targetLat as number;
    const targetLon = qrPayload.targetLon as number;

    const distance = getDistanceFromLatLonInM(latitude, longitude, targetLat, targetLon);

    if (distance > 300) {
      return NextResponse.json({ 
        success: false, 
        message: `Lokasi Anda terlalu jauh dari target. Jarak saat ini: ${Math.round(distance)}m (Maksimal 300m)` 
      }, { status: 403 });
    }

    // Buat Vote Token Khusus yang akan dipakai sebagai "tiket" memilih
    const voteTokenId = `VOTE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const voteAlgs = 'HS256';
    const votePayload = { type: 'vote_ticket', id: voteTokenId };
    const voteJwt = await new SignJWT(votePayload)
      .setProtectedHeader({ alg: voteAlgs })
      .setIssuedAt()
      .setExpirationTime('1h') // Berlaku 1 jam untuk memilih
      .sign(SECRET_KEY);

    return NextResponse.json({ 
      success: true, 
      message: `Verifikasi sukses! Anda berada dalam jangkauan (${Math.round(distance)} meter).`,
      voteToken: voteJwt
    });
  } catch (error) {
    console.error('Verify QR error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server saat verifikasi' },
      { status: 500 }
    );
  }
}
