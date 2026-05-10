import Link from 'next/link';
import PostDetail from './PostDetail';
import { Suspense } from 'react';
import Loader from '@/app/Loader';

export default await function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <div
            className='container'
            style={{ maxWidth: '800px', marginTop: '30px' }}
        >
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
            <Suspense fallback={<Loader />}>
                <PostDetail params={params} />
            </Suspense>
        </div>
    );
};
