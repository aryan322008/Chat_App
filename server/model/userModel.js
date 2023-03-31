import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    required : true,
    type : String,
  },
  email: {
    required : true,
    type : String,
  },
  password: {
    required : true,
    type : String,
  },
  isImageAvatarSet: {
    type : Boolean,
    default : false
  },
  avatarImage :{
    type: String,  
    default: ""
  }
});

const userModal = mongoose.model('User', userSchema);

export default userModal