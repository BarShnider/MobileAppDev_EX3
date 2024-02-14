import { Autocomplete, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Register() {
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [birthDay, setBirthDay] = useState("");
  // const [city, setCity] = useState("");
  // const [houseNumber, setHouseNumber] = useState("");
  // const [street, setStreet] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    birthDay: "",
    city: "",
    houseNumber: "",
    street: "",
    firstName: "",
    lastName: "",
  });
  const [userErrors, setUserErrors] = useState({
    userName: "",
    email: "",
    birthDay: "",
    city: "",
    houseNumber: "",
    street: "",
    firstName: "",
    lastName: "",
  });

  //const [error, setError] = useState("");

  const regexPatternNumbers = /^[1-9]\d*$/; // any positive number except 0
  const regexPatternPassword =
    /^(?=.*[!@#$%^&*()_+{}|:"<>?])(?=.*[A-Z])(?=.*\d).{7,12}$/;
  const regexPatternUserName =
    /^[a-zA-Z0-9\u00C0-\u00FF!@#$%^&*()_+{}|:"<>?]*$/;
  const regexPatternString = /^[a-zA-Z\u00C0-\u00FF]+$/;
  const regexPatternStreet = /^[\u0590-\u05FF]+$/;
  const regexPatternEmail = /^[a-zA-Z@]+\.com$/;

  const handleInputChange = (event, field) => {
    const input = event.target.value;
    validateInput(input, field);
    setUserData({ ...userData, [field]: input });
  };

  const validateInput = (value, fieldError) => {
    //to do switch case !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! for all erros.
    switch (fieldError) {
      case "password":
        if (!regexPatternPassword.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "Input must contain only positive numbers",
          });
        }
        break;
      case "userName":
        if (regexPatternUserName.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]:
              "Input must contain only English letters, numbers, and special characters",
          });
        }
        break;
      case "firstName":
        if (!regexPatternString.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "Input must contain only letters",
          });
        }
        break;
      case "lastName":
        if (regexPatternString.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "Input must contain only letters",
          });
        }
        break;
      case "houseNumber":
        if (regexPatternNumbers.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "Input must contain only positive numbers",
          });
        }
        break;
      case "street":
        if (regexPatternStreet.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "Input must contain only letters in Hebrew",
          });
        }
        break;
      case "email":
        if (regexPatternEmail.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "Input wrong (example@example.com)",
          });
        }
        break;
    }
  };

  const handleEmailChange = (event) => {
    setUserData({ ...userData, ["email"]: event.target.value });
  };

  function registerUser() {}

  return (
    <>
      <h1 className="header">הרשמה</h1>
      <div className="container ">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "100px",
            border: "1px solid #dedede",
            padding: "50px",
            borderRadius: "15px",
            boxShadow: "3px 3px 5px #87878729",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField //EMAIL
              value={userData.email}
              sx={{ width: "300px" }}
              id="outlined-basic"
              label='דוא"ל'
              variant="outlined"
              error={!!userErrors.email} // Converts string to boolean
              helperText={userErrors.email}
              onChange={(event) => handleEmailChange(event, "email")}
              onFocus={(event) => handleEmailChange(event, "email")}
              onBlur={(event) => validateInput(event.target.value, "email")}
            />

            {/* BIRTHDAY CALENDAR */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ width: "300px" }} />
            </LocalizationProvider>

            {/* CITY */}
            <Autocomplete
              sx={{ width: "300px" }}
              disablePortal
              id="combo-box"
              options={["א", "ב"]}
              renderInput={(params) => <TextField {...params} label="עיר" />}
            />

            <TextField //STREET
              value={userData.street}
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="רחוב"
              variant="outlined"
              error={!!userErrors.street}
              helperText={userErrors.street}
              onChange={(event) => handleInputChange(event, "street")}
            />

            <TextField //HOUSE NUMBER
              value={userData.houseNumber}
              onChange={(event) => handleInputChange(event, "houseNumber")}
              error={!!userErrors.houseNumber} // Converts string to boolean
              helperText={userErrors.houseNumber}
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="מספר בית"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField //USERNAME
              value={userData.userName}
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="שם משתמש"
              variant="outlined"
              maxLength={60}
              error={!!userErrors.userName}
              helperText={userErrors.userName}
              onChange={(event) => handleInputChange(event, "userName")}
            />

            <TextField //PASSWORD               NEED TO HNADLE PASSWORD
              sx={{ width: "300px" }}
              id="password-input"
              label="הזן סיסמא"
              type="password"
              autoComplete="current-password"
            />

            <TextField //SECOND PASSWORD              NEED TO HANDLE PASSWORD
              sx={{ width: "300px" }}
              id="password-validate-input"
              label="הזן סיסמה בשנית"
              type="password"
              autoComplete="current-password"
            />

            <Button
              sx={{ width: "300px" }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />} //.       Need TO HANDLE IMG
            >
              העלה תמונה
              <VisuallyHiddenInput type="file" />
            </Button>

            <TextField //FIRST NAME
              value={userData.firstName}
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="שם פרטי"
              variant="outlined"
              error={!!userErrors.firstName}
              helperText={userErrors.firstName}
              onChange={(event) => handleInputChange(event, "firstName")}
            />

            <TextField //LAST NAME
              value={userData.lastName}
              sx={{ width: "300px" }}
              id="outlined-basic"
              label="שם משפחה"
              variant="outlined"
              error={!!userErrors.lastName}
              helperText={userErrors.lastName}
              onChange={(event) => handleInputChange(event, "lastName")}
            />
          </Box>
        </Box>
        <Button sx={{ width: "200px", margin: "20px" }} variant="contained">
          הרשם
        </Button>
      </div>
    </>
  );
}

export default Register;
