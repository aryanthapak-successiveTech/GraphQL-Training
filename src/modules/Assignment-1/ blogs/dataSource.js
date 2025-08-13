
export const users = [
  {
    id: "1",
    email: "aryanthapak8@gmail.com",
    userName: "Aryanth"
  },
  {
    id: "2",
    email: "amanmehra@gmail.com",
    userName: "Amanmeh"
  },
  {
    id: "3",
    email: "adarshtrivedi8@gmail.com",
    userName: "Adarsht"
  }
];


export const posts = [
  {
    id: "1",
    postedBy: "aryanthapak8@gmail.com",
    description:"Some Desc 1",
    comments: [
      {
        commentedBy: "amanmehra@gmail.com", 
        text: "Nice post Aryanth!"
      },
      {
        commentedBy: "adarshtrivedi8@gmail.com",
        text: "Very informative, thanks!"
      }
    ]
  },
  {
    id: "2",
    postedBy: "amanmehra@gmail.com",
    description:"Some Desc 2",
    comments: [
      {
        commentedBy: "aryanthapak8@gmail.com",
        text: "Great content Aman!"
      }
    ]
  },
  {
    id: "3",
    postedBy: "adarshtrivedi8@gmail.com", 
    description:"Some Desc 3",
    comments: [
      {
        commentedBy: "amanmehra@gmail.com",
        text: "Loved this one!"
      },
      {
        commentedBy: "aryanthapak8@gmail.com",
        text: "Keep sharing!"
      }
    ]
  }
];
