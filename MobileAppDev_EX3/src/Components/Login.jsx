/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function Login({users,setIsConnected,setUserAdmin,setConnectedUser,setShowEditDetails}) {
  const [userName, setUserName] = useState("");
  const [errorName, setErrorName] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const regexPatternUserName =
    /^[a-zA-Z0-9\u00C0-\u00FF!@#$%^&*()_+{}|:"<>?]{1,60}$/;

  const handleUserName = (event) => {
    const value = event.target.value;
    if (regexPatternUserName.test(value) || value === "") {
      setUserName(value);
      setErrorName("");
    } else {
      setErrorName(
        "ניתן למלא אותיות לועזיות בלבד, מספרים ותווים מיוחדים, לכל היותר באורך 60 תווים."
      );
    }
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    setErrorPassword("");
  };

  const loginUser = () => {
    if (userName === "admin" && password === "ad12343211ad") {
      setIsConnected(true);
      setUserAdmin(false);
    } else {
      for (let user of users) {
        if (user.userName === userName) {
          if (user.password === password) {
            console.log("User Entered !!!!!!!!!!!!!!");
            const jsonData = JSON.stringify(user);
            sessionStorage.setItem("connectedUser", jsonData);
            setErrorName("");
            setUserAdmin(true);
            setConnectedUser(user);
            setIsConnected(true);
            setShowEditDetails(false);
            break;
          } else {
            setErrorPassword("סיסמה שגויה");
          }
        } else {
          setErrorName("משתמש לא קיים");
        }
      }
    }
  };

  return (
    <>
      <h1 className="header">התחברות</h1>
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            border: "1px solid #dedede",
            padding: "50px",
            borderRadius: "15px",
            boxShadow: "3px 3px 5px #87878729",
            backgroundColor: "#fff",
          }}
        >
          <TextField
            sx={{ width: "300px" }}
            id="outlined-basic"
            label="שם משתמש"
            variant="outlined"
            error={!!errorName}
            helperText={errorName}
            onChange={handleUserName}
          />

          <TextField
            sx={{ width: "300px" }}
            id="login-password-input"
            label="הזן סיסמא"
            type="password"
            autoComplete="current-password"
            error={!!errorPassword}
            helperText={errorPassword}
            onChange={handlePassword}
          />
          <Button variant="contained" onClick={loginUser}>
            התחבר
          </Button>
        </Box>
      </div>
    </>
  );
}

export default Login;
