import { getPosts } from '@/actions/post';
import Link from 'next/link';

export default async function PostList() {
    const posts = await await getPosts();

    if (posts.length === 0) {
        return (
            <div className='card'>
                <p className='post-content'>投稿がありません</p>
            </div>
        );
    }

    return (    
        <div className='post-list'>
            {posts.map((post) => (
                <div key={post.id} className='card'>
                    <h3 className='post-title'>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className='post-meta'>
                        投稿者: {post.user.userName} | 作成日:
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                    <p className='post-content'>{post.content}</p>
                </div>
            ))}
        </div>
    );
}
