import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import 'server-only'

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    const token = jwt.sign({
        id: userId
    }, process.env.JWT_SECRET!, { expiresIn: '2d' });

    cookieStore.set('session', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export async function decryptSession(session : string) {
    try {
        const { payload } = await jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET));
        return payload;
    } catch(error) {
        console.log('error with decrypt', error);
    }
}