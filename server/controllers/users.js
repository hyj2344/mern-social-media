import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserRequestFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friendsRequest = await Promise.all(
      user.friendsRequest.map((id) => User.findById(id))
    );
    const formattedFriendsRequest = friendsRequest.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriendsRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user.friendsRequest.includes(friendId) && !friend.friendsRequest.includes(id)) {
      friend.friendsRequest.push(id);
    }
    await friend.save();

    const friendsRequest = await Promise.all(
      friend.friendsRequest.map((id) => User.findById(id))
    );
    const formattedFriendsRequest = friendsRequest.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriendsRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const approvedFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    user.friends.push(friendId);
    friend.friends.push(id);
    user.friendsRequest = user.friendsRequest.filter((id) => id !== friendId);
    friend.friendsRequest = friend.friendsRequest.filter((id) => id !== id);
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath, friendsRequest }) => {
        return { _id, firstName, lastName, occupation, location, picturePath, friendsRequest };
      }
    );
    const friendsRequest = await Promise.all(
      user.friendsRequest.map((id) => User.findById(id))
    );
    const formattedFriendsRequest = friendsRequest.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json([formattedFriends,formattedFriendsRequest]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const declineFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    user.friendsRequest = user.friendsRequest.filter((id) => id !== friendId);
    friend.friendsRequest = friend.friendsRequest.filter((id) => id !== id);
    await user.save();
    await friend.save();

    const friendsRequest = await Promise.all(
      user.friendsRequest.map((id) => User.findById(id))
    );
    const formattedFriendsRequest = friendsRequest.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriendsRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== id);
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
