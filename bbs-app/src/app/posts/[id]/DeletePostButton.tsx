'use client';

import { deletePost } from '@/actions/post';

export default function DeletePostButton({ postId }: { postId: number }) {
    const handleDelete = async () => {
        if (window.confirm('本当に削除しますか？')) {
            await deletePost(postId);
        }
    };

    return <button className='btn-danger' onClick={handleDelete}>削除</button>;
}
