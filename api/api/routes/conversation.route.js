import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);
router.get("/getName/:buyerId", async (req, res) => {
  const buyerId = req.params.buyerId;

  try {
    const buyer = await User.findById(buyerId); // Use `buyerId` directly
    if (buyer) {
      res.status(200).send(buyer.username);
      
    } else {
      res.status(404).json({ message: "Buyer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
