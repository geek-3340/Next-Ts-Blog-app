import './globals.css';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* <header
          style={{ backgroundColor: '#333', color: '#fff', padding: '15px 0' }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                BBS App
              </span>
            </h1>
          </div>
        </header> */}
        <Header />
        <main className="container" style={{ padding: '40px 20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
