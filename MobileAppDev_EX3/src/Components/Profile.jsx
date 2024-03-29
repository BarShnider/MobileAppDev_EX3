/* eslint-disable react/prop-types */
import { Avatar, Box, Button, SvgIcon } from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import { useEffect, useState } from "react";

function Profile({ user, setShowEditDetails, setUserToEdit,logoutUser }) {
    
  // This function sets the user data to be edited and toggles the visibility of the edit details modal.
  const onEdit = () => {
    setUserToEdit(user);
    setShowEditDetails((state) => !state);
  };
  
  // This function logs out the current user and hides the edit details modal.
  const onLogout = () => {
    logoutUser();
    setShowEditDetails(false)
  }


  return (
    <>
      <h1 className="header">פרופיל</h1>
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #dedede",
            padding: "15px 50px",
            gap: "30px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            margin: "50px 0px",
            boxShadow: "3px 3px 5px #87878729",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between", 
              gap: "30px",
            }}
          >
            <Box /// Details Container
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: "15px",
                fontFamily: "heebo",
                direction: "rtl",
              }}
            >
              <h2 className="profile-title">
                {user.firstName} {user.lastName}{" "}
              </h2>
              <span className="profile-mail">
                <SvgIcon className="icon" component={MailOutlineRoundedIcon} />
                {user.email}
              </span>
              <span className="profile-home">
                <SvgIcon className="icon" component={HomeRoundedIcon} />
                {`${user.street} ${user.houseNumber}, ${user.city}`}
              </span>
              <span className="profile-birthDay">
                <SvgIcon className="icon" component={CakeRoundedIcon} />
                {user.birthDay.split("-")[2] +
                  "-" +
                  user.birthDay.split("-")[1] +
                  "-" +
                  user.birthDay.split("-")[0]}
              </span>
            </Box>
            <Box // IMAGE CONTAINER
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "#fff",
                width: "50%", 
                padding: "20px",
              }}
            >
              <Avatar
                sx={{ width: "150px", height: "150px", fontSize: "70px" }}
                alt={user.firstName}
                src={user.img}
              />
            </Box>
          </Box>
          <div className="userButtons">
            <Button
              style={{ backgroundColor: "red" }}
              variant="contained"
              onClick={onLogout}
            >
              התנתק
            </Button>
            <a
              href="https://play.runescape.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained">למשחק</Button>
            </a>
            <Button
              onClick={() => onEdit()}
              style={{ backgroundColor: "grey" }}
              variant="contained"
            >
              עדכון פרטים
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Profile;
