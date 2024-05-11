import jwt from 'jsonwebtoken'
import User from '../models/auth.js'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

export const login = async(req,res) => {
    const {email} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser){
            try {
                const ipifyResponse = await axios.get('https://api.ipify.org?format=json');
                const clientIP = ipifyResponse.data.ip;
                console.log("ip",clientIP);

                // Get geolocation information based on the IP address
                const geolocationResponse = await axios.get(`https://ipinfo.io/${clientIP}/json`);
                const geolocationData = geolocationResponse.data;
                console.log(geolocationData);
                const hashedIP = await bcrypt.hash(clientIP, 10);

                const newUser = await User.create({
                    email,
                    hashedIP: hashedIP,
                    geolocation: geolocationData,
                });

                const token = jwt.sign({
                    email:newUser.email, id:newUser._id 
                }, process.env.JWT_SECRET,{
                    expiresIn:"1h"
                } )
                console.log("try",token)

                res.status(200).json({result:newUser, token})

            } catch (error) {
                res.status(500).json({message:"Something went wrong in looginn",error})
            }
        } else {
            console.log("enter")
            const token = jwt.sign({
                email:existingUser.email, id:existingUser._id 
            }, process.env.JWT_SECRET,{
                expiresIn:"1h"
            });

            const ipifyResponse = await axios.get('https://api.ipify.org?format=json');
            const clientIP = ipifyResponse.data.ip;
            const loginInfo = {
                timestamp: new Date(),
                userAgent: req.headers['user-agent'],
                ipAddress: clientIP, // Make sure to use appropriate method to get IP address
                // Add more fields as needed
            };
            existingUser.loginHistory.push(loginInfo);
            await existingUser.save();

            res.status(200).json({result:existingUser, token})  
        }

    } catch (error) {
        res.status(500).json({message:"Something went wrong in laogin",error})
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.render('profile', { loginHistory: user.loginHistory });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
};

export const updatePremium = async(req,res) => {
    const {_id} = req.params;

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