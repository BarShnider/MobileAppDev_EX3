import { Avatar, Box, Button, SvgIcon } from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";

function Profile() {
  return (
    <>
      <h1 className="header">פרופיל</h1>
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
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
          <Box /// Details Container
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: "15px",
              fontFamily: "heebo",
              direction: "rtl",
            }}
          >
            <h2 className="profile-title">בר שניידר</h2>
            <span className="profile-text">
              <SvgIcon className="icon" component={MailOutlineRoundedIcon} />
              barshnider@gmail.com
            </span>
            <span className="profile-text">
              <SvgIcon className="icon" component={HomeRoundedIcon} />
              חדרה
            </span>
            <span className="profile-text">
              <SvgIcon className="icon" component={CakeRoundedIcon} />
              08/04/1999
            </span>
          </Box>
          <Box // IMAGE CONTAINER
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "#fff",
              width: "100%",
              height: "100%",
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
      </div>
    </>
  );
}

export default Profile;
