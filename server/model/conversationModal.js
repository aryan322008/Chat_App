import mongoose from 'mongoose';
const { Schema } = mongoose;

const convSchema = new Schema({
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required : true
      },
      user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
      },
      conversation : [
        {
           user: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
              },
            msg : {
                type: Schema.Types.Mixed,
                // default : ""
            }
      }
    ]

})





const conversationModal = mongoose.model('conversations', convSchema);

export default conversationModal