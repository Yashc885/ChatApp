import User from "../models/usermodels.js";

export const  getUserForSidewar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id :{$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getuserforsidebar function",error.message);
        res.status(500).json({error:"internal server error"});
    }
}