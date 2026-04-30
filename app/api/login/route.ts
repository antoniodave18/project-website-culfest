import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // --- INI ADALAH MOCK/SIMULASI BERUPA HARDCODE ---
        // Ganti bagian ini nanti dengan koneksi ke database Anda yang sebenarnya.
        const validUsername = 'admin';
        const validPassword = 'password123';

        if (username === validUsername && password === validPassword) {
            // Jika login sukses
            return NextResponse.json({
                success: true,
                message: 'Login berhasil',
                token: 'mock-token-admin-123456789'
            }, { status: 200 });
        } else {
            // Jika login gagal (username/password salah)
            return NextResponse.json({
                success: false,
                message: 'Username atau password salah!'
            }, { status: 401 });
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Terjadi kesalahan pada server.'
        }, { status: 500 });
    }
}
