/**
 * ファイル名と関数名の「proxy,config」は予約語
 * Nextではsrcまたはルートディレクトリに配置必須
 */

import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './utils/jwt';

const PUBLIC_PATHS = ['/signup', '/login'];

export async function proxy(request: NextRequest) {
    // 分割代入は読みやすさのため
    // オブジェクトの分割代入は右辺のオブジェクトからキー名が左辺の
    // プロパティを取得して同名の変数に入れる挙動となる
    // つまりこれと同じ　const pathname = request.nextUrl.pathname;
    const { pathname } = request.nextUrl;

    // cookiesの中のsessionのJWTを取得
    const cookie = request.cookies.get('session');

    // sessionがあればJWT検証、正しければpayload（session）を返す
    // sessionが無いまたは検証失敗ならnull
    const session = await decrypt(cookie?.value);

    // payloadがあって、且つuserIdがあればtrue
    // どちらか１つでもnullならfalse
    const isAuthenticated = !!session?.userId;

    // some()は「条件に合う要素が1つでもあれば true」 を返す配列メソッド
    // startsWith()でリクエストされたpathの始まりが
    // PUBLIC_PATHSのどちらかでもの始まりと一致するか判定している
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    if (isAuthenticated && isPublicPath) {
        // URL()は絶対URLに変換するためのコンストラクタ
        // 第一引数にpathを指定し、第二引数に元となるリクエストURLを指定することで
        // path=/login,リクエスト=https://hoge/signup
        // のときにプロトコルとサーバー名をリクエスト参照
        // pathを第一引数参照とした絶対URLを返す
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // 処理を継続するメソッド
    return NextResponse.next();
}

// このproxyの適用除外を定義（正規表現）
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};