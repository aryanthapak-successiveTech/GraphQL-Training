import Message from "../../../models/MessageModel.js";
import Conversation from "../../../models/ConversationModel.js";
import User from "../../../models/UserModel.js";
export const messageMutationResolvers = {
  sendMessage: async (_, { senderId, receiverId, content }) => {
    try {
      const newMessage = await Message.create({
        content,
        author: senderId,
        recipient: receiverId,
        createdAt: new Date(),
      });

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId], $size: 2 },
      });

      if(!conversation){
        conversation=await Conversation.create({
          participants:[senderId,receiverId],
          messages:[newMessage._id]
        })
      }
      else{
        conversation=await Conversation.findOneAndUpdate({
          participants: { $all: [senderId, receiverId], $size: 2 }
        },{
          $push:{
            messages:newMessage._id
          }
        },{
          new:true,
          runValidators:true
        })
      }

      
      await User.updateMany(
        { _id: { $in: [senderId, receiverId] } },
        {
          $addToSet: {
            conversations: conversation._id,
          },
        }
      );

      return newMessage;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send message");
    }
  },
};
