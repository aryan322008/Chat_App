import { validationResult } from "express-validator";
import conversationModal from "../model/conversationModal.js";
import jwt from "jsonwebtoken"


const createUserConversationSchema = async (req, res) => {
  const user1 = req.body.currentUser
  const user2 = req.body.selected

  //    res.send({user1, user2})
  const convFind = await conversationModal.find(
    { $and: [{ $or: [{ user1: user1 }, { user1: user2 }] }, { $or: [{ user2: user1 }, { user2: user2 }] }] })

  if (convFind.length === 0) {
    const singleConversation = await conversationModal.create({
      user1,
      user2
    }).then((res) => {
      res.send(res)
    }).catch((err) => {
      res.send(err)
    })

  } else {
    res.json({message:"already exists", convFind})
  }
}

const sendMessage = async(req, res) => {
  const user1 = req.body.receiver
  const user2 = req.body.sender
  const senderMessage = req.body.message 

  const convFind = await conversationModal.find(
    { $and: [{ $or: [{ user1: user1 }, { user1: user2 }] }, { $or: [{ user2: user1 }, { user2: user2 }] }] })

    if (convFind.length === 0) {
      res.status(404).json({error:"User Not Selected"})
    }

   const ConversationId = convFind[0]._id

   const appendMessage = await conversationModal.findByIdAndUpdate(convFind[0]._id,  
    { $push: { conversation: {
      user : user2,
      msg : senderMessage
    } } }
    )

    res.send(appendMessage)

   
  //  const dbUser = await userModal.findByIdAndUpdate(req.user,{
  //   isImageAvatarSet : true,
  //   avatarImage : profile
  //  })


}




export { createUserConversationSchema, sendMessage }