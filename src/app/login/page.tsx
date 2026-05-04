import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className='container' style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className='card'>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>ログイン</h2>
        <form>
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
          {/* {error && <p className='error-message'>{error}</p>} */}
          <button
            type='submit'
            className='btn'
            style={{ width: '100%', marginBottom: '15px' }}
          >
            ログイン
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          アカウントをお持ちでないですか？
          <br />
          <Link href='#' style={{ color: '#0070f3' }}>
            新規登録はこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
