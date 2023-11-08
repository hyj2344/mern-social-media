import express from "express";
import {
  getUser,
  getUserFriends,
  addFriend,
  approvedFriend,
  getUserRequestFriends,
  declineFriend,
  removeFriend
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);
router.get("/:id/friends", verifyToken,getUserFriends);
router.get("/:id/requestFriends", verifyToken,getUserRequestFriends);

/* UPDATE */
router.patch("/:id/request/:friendId", verifyToken,addFriend);
router.patch("/:id/approve/:friendId", verifyToken,approvedFriend);
router.patch("/:id/decline/:friendId", verifyToken,declineFriend);
router.patch("/:id/remove/:friendId", verifyToken,removeFriend);
export default router;
