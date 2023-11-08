import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import FriendPost from "components/FriendPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  type,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [newComment, setnewComment] = useState("");
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserfirstName = useSelector((state) => state.user.firstName);
  const loggedInUserLastName = useSelector((state) => state.user.lastName);
  const loggedInUserFriends = useSelector((state) => state.user.friends);
  const loggedInUserFriendsId = loggedInUserFriends.map((user)=>user._id);
  loggedInUserFriendsId.push(loggedInUserId);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const patchLike = async () => {
    // const response = await fetch(`http://54.245.62.145:4205/posts/${postId}/like`, {
      const response = await fetch(`http://54.245.62.145:4205/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handlePost = async () => {
    // const response = await fetch(`http://54.245.62.145:4205/posts/${postId}/comments`, {
      const response = await fetch(`http://54.245.62.145:4205/posts/${postId}/comments`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: newComment, name: `${loggedInUserfirstName} ${loggedInUserLastName}` }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setnewComment("");
  };

  return (
    <WidgetWrapper mb="2rem">
      <FriendPost
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (type === "image") && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          // src={`http://54.245.62.145:4205/assets/${picturePath}`}
          src={`http://54.245.62.145:4205/assets/${picturePath}`}
        />
      )}
      {picturePath && (type === "video") && (
        <video
          // src={`http://54.245.62.145:4205/assets/${picturePath}`}
          src={`http://54.245.62.145:4205/assets/${picturePath}`}
          width="100%"
          height="auto"
          controls
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        ></video>
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {loggedInUserFriendsId.includes(postUserId) && (
        <FlexBetween gap="1.5rem">
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setnewComment(e.target.value)}
            value={newComment}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              mt: "0.5rem"
            }}
          />
          <Button
            disabled={newComment === ""}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
