import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Secret key for JWT. In production, use environment variable.
const SECRET_KEY = new TextEncoder().encode('my-super-secret-key-for-culfest-test');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, latitude, longitude } = body;

    if (username === 'admin' && password === 'admin') {
      const alg = 'HS256';
      
      const payload = {
        username,
        location: {
          latitude,
          longitude
        }
      };

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(SECRET_KEY);

      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { success: false, message: 'Kredensial tidak valid' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
