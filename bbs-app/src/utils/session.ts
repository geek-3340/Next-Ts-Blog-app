import 'server-only';
import { cookies } from 'next/headers';
import { encrypt, decrypt } from './jwt';

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session');
  const session = await decrypt(cookie?.value);

  if (!session?.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId as string };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
