import { posts, users } from "./dataSource.js";

export const userQueryResolvers={
    getUsers:()=>users,
    getUser:(_,{userName})=>{
        const user=users.find((user)=>user.userName===userName);
        return user;
    }
};

export const postQueryResolvers={
    getPosts:()=>posts,
    getPostsByUser:(_,{email})=>{
        const userPosts=posts.filter((post)=>post.postedBy===email);
        return userPosts;
    },

    getPostComments:(_,{postId})=>{
        const postComments=posts.filter((post)=>post.id===postId).map((userPost)=>userPost.comments);
        return postComments;
    }
};
