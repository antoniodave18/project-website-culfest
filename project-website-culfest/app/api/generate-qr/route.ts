import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('my-super-secret-key-for-culfest-test');
// Use a different secret for the QR code to keep it isolated, or the same. We'll use the same for simplicity.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Token tidak diberikan' }, { status: 400 });
    }

    // Verify admin token to get their location
    let adminPayload;
    try {
      const verified = await jwtVerify(token, SECRET_KEY);
      adminPayload = verified.payload;
    } catch (e) {
      return NextResponse.json({ success: false, message: 'Admin token tidak valid atau kedaluwarsa' }, { status: 401 });
    }
    
    if (adminPayload.username !== 'admin') {
      return NextResponse.json({ success: false, message: 'Tidak memiliki izin (Unauthorized)' }, { status: 401 });
    }

    const loc = adminPayload.location as { latitude: number; longitude: number };
    
    // Generate QR code as a JWT containing the target location
    // Valid for 1 minute and 15 seconds (75 seconds)
    const alg = 'HS256';
    const qrPayload = {
      type: 'attendance_qr',
      targetLat: loc.latitude,
      targetLon: loc.longitude,
    };

    const qrToken = await new SignJWT(qrPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('75s') // 75 seconds
      .sign(SECRET_KEY);

    return NextResponse.json({ success: true, code: qrToken });
  } catch (error) {
    console.error('Generate QR error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
