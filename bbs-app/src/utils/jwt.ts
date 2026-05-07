import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const secretKey = 'secret';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

// JWT（JSON Web Token）は、
// 「ユーザー情報などを署名付きで安全にやり取りするための文字列トークン形式」です。

// ざっくり特徴はこれです。

// header.payload.signature の3部構成（. 区切り）
// payload に userId や exp（期限）などを入れる
// サーバー側の秘密鍵で署名し、改ざん検知できる
// DBセッションの代わりに、CookieやAuthorizationヘッダーで持たせることが多い
// 重要ポイント：

// JWTは暗号化されているとは限らない（多くはBase64URLエンコード）
// なので payload は見える前提で、機密情報は入れない
// 信頼できるかは署名検証（あなたの jwtVerify）で判断する
// あなたのコードだと、

// encrypt() で JWT 発行
// Cookie session に保存
// decrypt()（実質 verify）で検証して userId を取り出す
// という、典型的なログインセッション実装になっています。
