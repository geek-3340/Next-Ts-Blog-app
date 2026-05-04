import Link from 'next/link';
import PostDetail from './PostDetail';

export default function PostDetailPage() {
  return (
    <div className='container' style={{ maxWidth: '800px', marginTop: '30px' }}>
      <Link
        href='#'
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          color: '#0070f3',
        }}
      >
        &larr; 一覧に戻る
      </Link>

      <PostDetail />
    </div>
  );
}
