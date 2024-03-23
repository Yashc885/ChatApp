import User from "../models/usermodels.js"
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }
    //hashing 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);


    // Placeholder images 
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName: fullName,
      username: username,
      password: hashedPassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
   
if(newUser){
  generateTokenAndSetCookie(newUser._id , res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    });
} 
else{
  res.status(400).json({error:"invalid user data"});
 }
} catch (error) {
    console.log("error in signup controller " , error.message);
    res.status(500).json({error:"internal server error "});
  }
};


//login 
export const login = async (req, res) => { // Add async here
  try {
    const { username , password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    // const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username, // Change user to username
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ error: "Internal server error" }); // Change status code to 500
  }
};



export const logout = (req, res) => {
  try {
    res.cookie("jwt","" , {maxAge:0});
    res.status(200).json({message:"logged out succesfully"});
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};