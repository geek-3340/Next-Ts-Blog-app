'use client';

import { createPost } from '@/actions/post';
import { useState } from 'react';

export default function CreatePostPage() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        const result = await createPost(formData);
        if (result && result.error) {
            setError(result.error);
        }
    };

    return (
        <div
            className='container'
            style={{ maxWidth: '600px', marginTop: '30px' }}
        >
            <div className='card'>
                <h2 style={{ marginBottom: '20px' }}>新規投稿</h2>
                <form action={handleSubmit}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='title'>
                            タイトル
                        </label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            className='form-input'
                            placeholder='タイトルを入力'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='content'>
                            本文
                        </label>
                        <textarea
                            id='content'
                            name='content'
                            className='form-textarea'
                            placeholder='本文を入力'
                        ></textarea>
                    </div>
                    {error && <p className='error-message'>{error}</p>}
                    <button type='submit' className='btn'>
                        投稿する
                    </button>
                </form>
            </div>
        </div>
    );
}
