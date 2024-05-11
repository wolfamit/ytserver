import mongoose from 'mongoose';
import User from '../models/auth.js'

export const updateChanelData = async(req,res) => {
    const {id: _id} = req.params;
    const {name, desc} = req.body;


    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("channel unavailable")
    }
    try {
        const updateData = await User.findByIdAndUpdate(_id,{
            $set:{
                'name':name, 'desc':desc
            }
        },{new:true})
        res.status(200).json({updateData})
    } catch (error) {
        res.status(405).json({message:error.message})
    }
}

export const getAllChanels = async(req,res) => {
    try {
        const allChanels = await User.find();
        const allChanelDetail=[]
        allChanels.forEach((chanels) => {
            allChanelDetail.push({_id: chanels._id, name: chanels.name, email: chanels.email, desc: chanels.desc})
        });

        res.status(200).json(allChanelDetail)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updatePremium = async() => {
    const {id: _id} = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Iser unavailable")
    }
    try {
        const updateData = await User.findByIdAndUpdate(_id,{
            $set:{
                'isPremium':true
            }
        },{new:true})
        console.log(updateData);
        res.status(200).json({updateData})
    } catch (error) {
        res.status(405).json({message:error})
    }
}