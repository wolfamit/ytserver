import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type:String , require: true},
    name: {type:String},
    desc:{type:String},
    joinedOn:{type:Date,default:Date.now},
    hashedIP: {type:String},
    geolocation: {
        city: String,
        region: String,
        country: String,
        loc:String
      },
    isPremium:{
      type:Boolean,
      default:false
    },
    loginHistory: [{
      timestamp: { type: Date, default: Date.now },
      userAgent: String,
      ipAddress: String,
      network: String
  }]
})

export default mongoose.model("User",userSchema)