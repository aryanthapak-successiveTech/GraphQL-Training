import bcrypt from "bcryptjs"
export const users = [
  {
    id: "1",
    email: "aryanthapak8@gmail.com",
    userName: "Aryanth",
    posts:["1"],
    password:await bcrypt.hash("Aryan111",12)
  },
  {
    id: "2",
    email: "amanmehra@gmail.com",
    userName: "Amanmeh",
    posts:["2"],
    password:await bcrypt.hash("Aman111",12)
  },
  {
    id: "3",
    email: "adarshtrivedi8@gmail.com",
    userName: "Adarsht",
    posts:["3"],
    password:await bcrypt.hash("Adarsh111",12)
  },
];

export const posts = [
  {
    id: "1",
    postedBy: "aryanthapak8@gmail.com",
    description: "Some Desc 1",
    comments: ["1_1", "1_2"],
    createdAt: "2025-08-20T09:00:00Z"
  },
  {
    id: "2",
    postedBy: "amanmehra@gmail.com",
    description: "Some Desc 2",
    comments: ["2_1"],
    createdAt: "2025-08-22T09:00:00Z" 
  },
  {
    id: "3",
    postedBy: "adarshtrivedi8@gmail.com",
    description: "Some Desc 3",
    comments: ["3_1","3_2"],
    createdAt: "2025-08-12T09:00:00Z" 
  },
];

export const comments = [
  {
    id: "1_1",
    commentedBy: "amanmehra@gmail.com",
    text: "Nice post Aryanth!",
  },
  {
    id: "1_2",
    commentedBy: "adarshtrivedi8@gmail.com",
    text: "Very informative, thanks!",
  },
  {
    id: "2_1",
    commentedBy: "aryanthapak8@gmail.com",
    text: "Great content Aman!",
  },
  {
    id: "3_1",
    commentedBy: "amanmehra@gmail.com",
    text: "Loved this one!",
  },
  {
    id: "3_2",
    commentedBy: "aryanthapak8@gmail.com",
    text: "Keep sharing!",
  },
];
