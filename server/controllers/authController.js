import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import userModal from "../model/userModel.js";
import conversationModal from "../model/conversationModal.js";
import jwt from "jsonwebtoken"


const register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await userModal.findOne({ email: req.body.email })
    if(user){
      return res.status(400).json("email already exists");
    }
   
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const singleUser = await userModal.create({
      username: req.body.username,
      password: hash,
      email: req.body.email
    })

   const userId = {
      id : singleUser.id
    }

    const token = jwt.sign(userId, process.env.PRIVATE_KEY);

    res.send(token)

  } catch (error) {
    res.status(400).json("wrong credentials")
  }

}


const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await userModal.findOne({ email: req.body.email })
    if(!user){
      return res.status(400).json("email doesn't exists");
    }

    bcrypt.compare(req.body.password, user.password , function(error, isMatch) {
      if(error) {
        return res.status(400).json("Try agian");
      }

    if(!isMatch){
      return res.status(400).json("Try agian");
    }else{
   const userId = {
      id : user.id
    }

    const token = jwt.sign(userId, process.env.PRIVATE_KEY);

    res.send({token, isImageAvatarSet:user.isImageAvatarSet})
  }

  })
  } catch (error) {
    res.status(400).json("wrong credentials")
  }

}

const storedAvatar = async (req, res) => {
    const profile = req.body.image

   const dbUser = await userModal.findByIdAndUpdate(req.user,{
    isImageAvatarSet : true,
    avatarImage : profile
   })

   res.send("succesfully set the avatar")
}

const fetchUsers = async (req,res) =>{
     let users = await userModal.find({_id: { $ne: req.user } }).select('_id username isImageAvatarSet avatarImage');
    res.send(users)

  }

const getCurrentUser =async (req,res) => {
  let user = await userModal.findById(req.user).select('_id username isImageAvatarSet avatarImage');

  res.send(user)
}




export { register, login, storedAvatar,fetchUsers,getCurrentUser }