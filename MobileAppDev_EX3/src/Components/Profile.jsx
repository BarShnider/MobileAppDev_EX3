/* eslint-disable react/prop-types */
import { Avatar, Box, Button, SvgIcon } from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import { useEffect, useState } from "react";

function Profile({ users, setIsConnected }) {
  const [userData, setUserData] = useState(); // check if needed

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      document.querySelector(".profile-title").textContent =
        parsedData.firstName + " " + parsedData.lastName;
      document.querySelector(".profile-mail").innerHTML += parsedData.email;
      let house =
        parsedData.street +
        " " +
        parsedData.houseNumber +
        ", " +
        parsedData.city;
      document.querySelector(".profile-home").innerHTML += house;
      document.querySelector(".profile-birthDay").innerHTML +=
        parsedData.birthDay;
    }
  }, []);

  const logOut = () => {
    sessionStorage.removeItem("userData");
    setIsConnected(false);
  };

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
            boxShadow: "3px 3px 5px #87878729",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between", // Adjust as needed
              gap: "30px",
            }}
          >
            <Box /// Details Container
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%", // Adjust as needed
                gap: "15px",
                fontFamily: "heebo",
                direction: "rtl",
              }}
            >
              <h2 className="profile-title"></h2>
              <span className="profile-mail">
                <SvgIcon className="icon" component={MailOutlineRoundedIcon} />
              </span>
              <span className="profile-home">
                <SvgIcon className="icon" component={HomeRoundedIcon} />
              </span>
              <span className="profile-birthDay">
                <SvgIcon className="icon" component={CakeRoundedIcon} />
              </span>
            </Box>
            <Box // IMAGE CONTAINER
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "#fff",
                width: "50%", // Adjust as needed
                padding: "20px",
              }}
            >
              <Avatar
                sx={{ width: "150px", height: "150px", fontSize: "70px" }}
                alt="בר שניידר"
                src="/static/images/avatar/1.jpg"
              />
            </Box>
          </Box>
          <div className="userButtons">
            <Button
              style={{ backgroundColor: "red" }}
              variant="contained"
              onClick={logOut}
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
            <Button style={{ backgroundColor: "grey" }} variant="contained">
              עדכון פרטים
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Profile;
