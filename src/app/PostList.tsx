import Link from 'next/link';

export default function PostList() {
  return (
    <div className='post-list'>
      <div key={1} className='card'>
        <h3 className='post-title'>
          <Link href='#'>ダミー投稿1</Link>
        </h3>
        <p className='post-meta'>
          投稿者: くるしb | 作成日:2023-12-01T10:00:00.000Z
        </p>
        <p className='post-content'>これはダミーの投稿内容です。</p>
      </div>
      <div key={2} className='card'>
        <h3 className='post-title'>
          <Link href='#'>ダミー投稿2</Link>
        </h3>
        <p className='post-meta'>
          投稿者: くるしb | 作成日:2023-12-01T10:00:00.000Z
        </p>
        <p className='post-content'>これは別のダミー投稿です。</p>
      </div>
    </div>
  );
}
