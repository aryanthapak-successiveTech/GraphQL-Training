import { posts, users } from "./dataSource.js";

export const userQueryResolvers={
    getUsers:()=>users,
    getUser:async(_,{userName})=>{
        try{           
        const userRetrival=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(users.find((user)=>user.userName===userName));
            },2000);
        })
        const user=await userRetrival;
        if(!user){
            throw new Error("User not found");
        }
        return user;   
        }
        catch(err){
            return {
                __typename:"UserError",
                message:err.message||"Something went wrong",
                code:500
            }
        }
    }
};

export const postQueryResolvers={
    getPosts:()=>posts,
    getPostsByUser:async(_,{email})=>{
        const userPostsRetrival=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(posts.filter((post)=>post.postedBy===email))
            },2000)
        })
        const userPosts=await userPostsRetrival;
        return userPosts;
    },

    getPostComments:(_,{postId})=>{
        const postComments=posts.filter((post)=>post.id===postId).map((userPost)=>userPost.comments);
        return postComments;
    },

    getPaginatedPosts:(_,{limit,page})=>{
        const totalCount=posts.length;
        const totalPages=Math.ceil(posts.length/limit);
        const startIdx=(page-1)*limit;
        const sortedPosts=[...posts].sort((postA,postB)=>postA.createdAt.localeCompare(postB.createdAt));
        const items=sortedPosts.slice(startIdx,startIdx+limit);
        return{
            data:items,
            totalCount,
            totalPages,
            hasNext:page<totalPages,
            hasPrev:page>1,
            currentPage:page
        }
    }
};
