import express from "express";
const router = express.Router();
import Message from "../model/messageSchema";

router.post("/", async (req, res) => {
    console.log(req.body);
    
    const newMessage = new Message(req.body);
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get
  
  router.get("/:conversationId", async (req, res) => {
    console.log('call is coming')
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });







export default router;