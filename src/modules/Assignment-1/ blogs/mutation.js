import {posts, users} from "./dataSource.js"
export const userMutationsResolvers={
    addUser:(_,{userName,email})=>{
        const user={
            id:`${users.length}`,
            email,
            userName
        }

        users.push(user);
        return user;
    },

    editUser:(_,{id,userName,email})=>{
        const user=users.find((user)=>user.id===id);
        const updatedUser={...user,userName,email};
        return updatedUser;
    }
}

export const postMutationResolvers={
    addPost:(_,{email,description})=>{
        const addedPost={
            id:`${posts.length+1}`,
            postedBy:email,
            description
        };

        posts.push(addedPost);

        return addedPost;
    },

    editPost:(_,{postId,description})=>{
        const post=posts.find((post)=>post.id===postId);
        const updatedPost={...post,description};
        return updatedPost;
    },

    addComment:(_,{postId,email,text})=>{
        const post=posts.find((post)=>post.id===postId);
        const comment={commentedBy:email,text};
        if(!post.comments){
            post.comments=[comment];
            return comment;
        }
        post.comments.push(comment);
        return comment;
    }
};