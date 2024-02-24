import { Avatar, Box, Button, SvgIcon } from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import { useEffect, useState } from "react";

function Profile({ users }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }

    for (let user of users) {
      if (user.userName === userData.userName) {
        document.querySelector(".profile-title").textContent =
          user.firstName + " " + user.lastName;
        document.querySelector(".profile-mail").innerHTML += user.email;
        let house = user.street + " " + user.houseNumber + ", " + user.city;
        document.querySelector(".profile-home").innerHTML += house;
        document.querySelector(".profile-birthDay").innerHTML += user.birthDay;
      }
    }
  }, [users]);

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
            <Button style={{ backgroundColor: "red" }} variant="contained">
              התנתק
            </Button>
            <Button variant="contained">למשחק</Button>
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
