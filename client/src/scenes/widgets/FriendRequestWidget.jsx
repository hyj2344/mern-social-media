import { Box, Typography, useTheme } from "@mui/material";
import FriendRequest from "components/FriendRequest";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriendsRequest } from "state";

const FriendRequestWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friendsRequest = useSelector((state) => state.user.friendsRequest);

  const getRequestFriends = async () => {
    const response = await fetch(
      // `http://54.245.62.145:4205/users/${userId}/requestFriends`,
      `http://54.245.62.145:4205/users/${userId}/requestFriends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriendsRequest({ friendsRequest: data }));
  };

  useEffect(() => {
    getRequestFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend  Request List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friendsRequest.map((friend) => (
          <FriendRequest
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendRequestWidget;
