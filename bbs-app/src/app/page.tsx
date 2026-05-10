import { Suspense } from 'react';
import PostList from './PostList';
import Loader from './Loader';

export default function Home() {
    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>記事一覧</h2>
            <Suspense fallback={<Loader />}>
                <PostList />
            </Suspense>
        </div>
    );
}
