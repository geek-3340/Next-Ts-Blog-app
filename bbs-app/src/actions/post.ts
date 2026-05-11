'use server';

import { redirect } from 'next/navigation';
import { revalidateTag, cacheTag, updateTag } from 'next/cache';
import { AppDataSource, getRepository } from '@/utils/data-source';
import { Post } from '@/entities/Post';
import { verifySession } from '@/utils/session';
import { User } from '@/entities/User';
import { error } from 'console';
import { NextRequest } from 'next/server';
import { decrypt } from '@/utils/jwt';

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
        return { error: 'タイトルと本文を入力してください' };
    }

    try {
        const session = await verifySession();
        if (!session || !session.userId) {
            return { error: 'ログインしてください' };
        }
        const postRepository = await getRepository(Post);
        const userRepository = await getRepository(User);

        // ユーザーの取得（リレーションのため）
        const user = await userRepository.findOneBy({
            id: Number(session.userId),
        });
        if (!user) {
            return { error: 'ユーザーが見つかりません' };
        }

        const newPost = postRepository.create({
            title,
            content,
            user: user, // ユーザーオブジェクトをセット
        });

        await postRepository.save(newPost);
    } catch (e) {
        console.error(e);
        return { error: '投稿の作成中にエラーが発生しました' };
    }

    updateTag('posts');
    redirect('/');
}

export async function getPosts() {
    'use cache';
    cacheTag('posts');

    const postRepository = await getRepository(Post);

    // 投稿一覧を取得（作成日時の降順）
    const posts = await postRepository.find({
        relations: {
            user: true,
        },
        order: {
            createdAt: 'DESC',
        },
    });

    return posts.map((post) => ({
        ...post,
        user: { ...post.user },
    }));
}

export async function getPost(id: number) {
    'use cache';
    cacheTag(`post-${id}`);

    const postRepository = await getRepository(Post);

    // この時点、postの型はPostとなっており、見た目はオブジェクトでもクラスのインスタンス
    // server componentで意図しないエラーを防ぐために、プレーンオブジェクトにした方が安全
    const post = await postRepository.findOne({
        where: { id },
        relations: {
            user: true,
        },
    });

    // {スプレッド構文}でプレーン化できる
    // このplainPostの型を見るとプレーンオブジェクトとなっていることが分かる
    const plainPost = { ...post };

    if (!post) return null;
    return {
        // 以下のスプレッド構文はプレーン化の意図がある！！！
        ...post,
        user: { ...post.user },
    };
}

export async function deletePost(id: number) {
    const session = await verifySession();
    if (!session || !session.userId) {
        return { error: 'ログインしてください' };
    }

    const postRepository = await getRepository(Post);
    const post = await postRepository.findOne({
        where: { id },
        relations: { user: true },
    });

    if (!post) {
        return { error: '投稿が見つかりません' };
    }

    // 本人の投稿か確認
    if (post.user.id !== Number(session.userId)) {
        return { error: '削除権限がありません' };
    }

    await postRepository.remove(post);

    updateTag('posts');
    updateTag(`posts-${id}`);
    redirect('/');
}
