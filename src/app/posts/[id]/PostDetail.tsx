import DeletePostButton from './DeletePostButton';

export default function PostDetail() {
  const isOwner = true; // 投稿者の場合 (削除ボタン表示)

  return (
    <>
      <div className='card'>
        <h1 style={{ marginBottom: '15px', fontSize: '24px' }}>
          ダミー投稿の詳細
        </h1>
        <p
          style={{
            color: '#666',
            fontSize: '14px',
            marginBottom: '20px',
            borderBottom: '1px solid #eee',
            paddingBottom: '10px',
          }}
        >
          投稿者: くるしば | 作成日: 2023-12-01T10:00:00.000Z
        </p>
        <div style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          これはダミーの投稿詳細内容です。ここには投稿の本文が表示されます。
        </div>
      </div>

      {isOwner && (
        <div style={{ marginTop: '20px' }}>
          <DeletePostButton />
        </div>
      )}
    </>
  );
}
