// 'use server';

// import { redirect } from 'next/navigation';
// import { revalidateTag, cacheTag } from 'next/cache';
// import { AppDataSource, getRepository } from '@/utils/data-source';
// import { Post } from '@/entities/Post';
// import { verifySession } from '@/utils/session';
// import { User } from '@/entities/User';

// export async function createPost(formData: FormData) {
//   try {
//     const postRepository = await getRepository(Post);
//     const userRepository = await getRepository(User);

//     // ユーザーの取得（リレーションのため）
//     const user = await userRepository.findOneBy({ id: Number(session.userId) });
//     if (!user) {
//       return { error: 'ユーザーが見つかりません' };
//     }

//     const newPost = postRepository.create({
//       title,
//       content,
//       user: user, // ユーザーオブジェクトをセット
//     });

//     await postRepository.save(newPost);
//   } catch (e) {
//     console.error(e);
//     return { error: '投稿の作成中にエラーが発生しました' };
//   }
// }

// export async function getPosts() {
//   const postRepository = await getRepository(Post);

//   // 投稿一覧を取得（作成日時の降順）
//   const posts = await postRepository.find({
//     relations: {
//       user: true,
//     },
//     order: {
//       createdAt: 'DESC',
//     },
//   });

//   return posts.map((post) => ({
//     ...post,
//     user: { ...post.user },
//   }));
// }

// export async function getPost(id: number) {
//   const postRepository = await getRepository(Post);

//   const post = await postRepository.findOne({
//     where: { id },
//     relations: {
//       user: true,
//     },
//   });

//   if (!post) return null;
//   return {
//     ...post,
//     user: { ...post.user },
//   };
// }

// export async function deletePost(id: number) {
//   const postRepository = await getRepository(Post);
//   const post = await postRepository.findOne({
//     where: { id },
//     relations: { user: true },
//   });

//   if (!post) {
//     return { error: '投稿が見つかりません' };
//   }

//   // 本人の投稿か確認
//   if (post.user.id !== Number(session.userId)) {
//     return { error: '削除権限がありません' };
//   }

//   await postRepository.remove(post);
// }
