import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{ backgroundColor: '#333', color: '#fff', padding: '15px 0' }}
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
          <Link href='#' style={{ fontSize: '24px', fontWeight: 'bold' }}>
            BBS App
          </Link>
        </h1>
        {/* <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link href='#' style={{ fontWeight: 'bold' }}>
              投稿する
            </Link>
            <form>
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
          </nav> */}
      </div>
    </header>
  );
}
