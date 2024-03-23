import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js"

export const sendMessage = async (req, res) => {
    try {
     const { message } = req.body;
     const { id: receiverId } = req.params;
     const senderId = req.user._id;
 
     let conversation = await Conversation.findOne({
         participants: { $all: [senderId, receiverId] },
     });
 
     if (!conversation) {
         conversation = await Conversation.create({
             participants: [senderId , receiverId],
         });
     }
 
     const newMessage = new Message({
         senderId,
         receiverId,
         message,
     });
 
     conversation.messages.push(newMessage._id); // Push message ID into conversation
 
     await Promise.all([conversation.save(), newMessage.save()]); // Save both conversation and new message
 
     res.status(201).json(newMessage);
    } catch (error) {
     console.log("Error in send message controller:", error.message);
     res.status(500).json({ error: "Internal server error" });
    }
 };
 
 export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages || []; // Access messages property or set to empty array if undefined

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get message controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

