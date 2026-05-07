'use client';

import { signup } from '@/actions/auth';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {

    // server componentからエラーを受け取るためのstate
    const [error, setError] = useState<string | null>(null);

    // form送信時にserver actionであるsignupを呼び出す関数
    const handleSubmit = async (formData: FormData) => {
        setError(null); // エラーのリセット
        const result = await signup(formData);

        // 返り値が「空ではなく」「errorがある」時にerror stateを更新する
        if (result && result.error) {
            setError(result.error);
        }
    };

    return (
        <div
            className='container'
            style={{ maxWidth: '400px', marginTop: '50px' }}
        >
            <div className='card'>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
                    アカウント登録
                </h2>
                <form action={handleSubmit}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='username'>
                            ユーザー名
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            className='form-input'
                            placeholder='ユーザー名'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='email'>
                            メールアドレス
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='form-input'
                            placeholder='example@email.com'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor='password'>
                            パスワード
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='form-input'
                            placeholder='********'
                            required
                        />
                    </div>
                    {/* errorがあれば表示 */}
                    {error && <p className='error-message'>{error}</p>}
                    <button
                        type='submit'
                        className='btn'
                        style={{ width: '100%', marginBottom: '15px' }}
                    >
                        登録する
                    </button>
                </form>
                <p style={{ textAlign: 'center', fontSize: '14px' }}>
                    すでにアカウントをお持ちですか？ <br />
                    <Link href='/login' style={{ color: '#0070f3' }}>
                        ログインはこちら
                    </Link>
                </p>
            </div>
        </div>
    );
}
