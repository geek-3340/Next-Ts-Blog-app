import { logout } from '@/actions/auth';
import { verifySession } from '@/utils/session';
import Link from 'next/link';

export default async function Header() {
    const session = await verifySession();

    return (
        <header
            style={{
                backgroundColor: '#333',
                color: '#fff',
                padding: '15px 0',
            }}
        >
            <div
                className='container'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1>
                    <Link
                        href='/'
                        style={{ fontSize: '24px', fontWeight: 'bold' }}
                    >
                        BBS App
                    </Link>
                </h1>
                {session && session.userId && (
                    <nav
                        style={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            href='/posts/create'
                            style={{ fontWeight: 'bold' }}
                        >
                            投稿する
                        </Link>
                        <form action={logout}>
                            <button
                                type='submit'
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                }}
                            >
                                ログアウト
                            </button>
                        </form>
                    </nav>
                )}
            </div>
        </header>
    );
}
