import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setFriendsRequest } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const FriendRequest = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const approvedFriend = async () => {
        const response = await fetch(
            // `http://54.245.62.145:4205/users/${_id}/approve/${friendId}`,
            `http://54.245.62.145:4205/users/${_id}/approve/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data[0]}));
        dispatch(setFriendsRequest({ friendsRequest: data[1] }));
    };

    const declineFriend = async () => {
        const response = await fetch(
            // `http://54.245.62.145:4205/users/${_id}/decline/${friendId}`,
            `http://54.245.62.145:4205/users/${_id}/decline/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriendsRequest({ friendsRequest: data }));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        //refresh page
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {_id !== friendId && (
                <FlexBetween gap="1rem">
                    <IconButton
                        onClick={() => approvedFriend()}
                        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                    >
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    </IconButton>
                    <IconButton
                        onClick={() => declineFriend()}
                        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                    >
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
    );
};

export default FriendRequest;
