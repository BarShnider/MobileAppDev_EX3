import { Autocomplete, Box, Button, useEventCallback } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
    password: "",
    passwordValidate: "",
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
    password: "",
    passwordValidate: "",
    birthDay: "",
    houseNumber: "",
    street: "",
    firstName: "",
    lastName: "",
  });

  const [IsFormValid, setIsFormValid] = useState(false);

  const regexPatternNumbers = /^[1-9]\d*$/; // any positive number except 0
  const regexPatternPassword =
    /^(?=.*[!@#$%^&*()_+{}|:"<>?])(?=.*[A-Z])(?=.*\d).{7,12}$/;
  const regexPatternUserName =
    /^[a-zA-Z0-9\u00C0-\u00FF!@#$%^&*()_+{}|:"<>?]{1,60}$/; // limited to length 60
  //const regexPatternString = /^[a-zA-Z\u00C0-\u00FF]+$/;
  const regexPatternHebrew = /^[\u0590-\u05FF]+$/;
  const regexPatternEmail = /^[a-zA-Z@]+\.com$/;

  const handleInputChange = (event, field) => {
    const input = event.target.value;
    validateInput(input, field);
    setUserData({ ...userData, [field]: input });
  };

  const validateInput = (value, fieldError) => {
    switch (fieldError) {
      case "password":
        if (regexPatternPassword.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]:
              "הסיסמה חייבת להכין בין 7 ל- 12 תווים. יש לוודא שיש לפחות תו אחד מיוחד, אות גדולה ומספר",
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
              "ניתן למלא אותיות לועזיות בלבד, מספרים ותווים מיוחדים, לכל היותר באורך 60 תווים.",
          });
        }
        break;
      case "firstName":
        if (regexPatternHebrew.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "ניתן למלא טקסט בעברית בלבד",
          });
        }
        break;
      case "lastName":
        if (regexPatternHebrew.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "ניתן למלא טקסט בעברית בלבד",
          });
        }
        break;
      case "houseNumber":
        if (regexPatternNumbers.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "ניתן להזין רק מספרים",
          });
        }
        break;
      case "street":
        if (regexPatternHebrew.test(value) || value === "") {
          setUserErrors({ ...userErrors, [fieldError]: "" });
        } else {
          setUserErrors({
            ...userErrors,
            [fieldError]: "ניתן למלא טקסט בעברית בלבד",
          });
        }
        break;
    }
  };

  const ValidateForm = () => {
    setIsFormValid(false); // Assume the form is invalid initially
    for (let f in userErrors) {
      if (userErrors[f] === "" && userData[f] !== "") {
        setIsFormValid(true);
      } else if (userErrors[f] !== "") {
        setIsFormValid(false); // Set isValid to false if any field has an error
        break;
      }
    }
    // Set the form as valid if isValid is true
    // setIsFormValid(isValid); // Update the form validity state based on the isValid value
    // console.log(isValid);
    console.log(IsFormValid);
  };

  // const handleDateChange = (newValue) => {
  //   const selectedDate = dayjs(newValue);
  //   const currentDate = dayjs();
  //   const age = currentDate.diff(selectedDate, "year");
  //   if (age <= 120 && age >= 18) {
  //     setUserErrors({
  //       ...userErrors,
  //       birthDay: "",
  //     });
  //     setUserData({ ...userData, birthDay: selectedDate.format("YYYY-MM-DD") });
  //   } else {
  //     console.log(age);
  //     setUserErrors({
  //       ...userErrors,
  //       birthDay:
  //         "תאריך לא תקין, נא לוודא שהפרטים נכונים והינך מעל 18 (ומתחת ל-120)",
  //     });
  //     setUserData({ ...userData, birthDay: "" });
  //   }
  //   console.log("Age:", age);
  // };
  const handleDateChange = (newValue) => {
    const selectedDate = dayjs(newValue);
    const currentDate = dayjs();
    const age = currentDate.diff(selectedDate, "year");
    if (age <= 120 && age >= 18) {
      setUserErrors({
        ...userErrors,
        birthDay: "",
      });
      setUserData({ ...userData, birthDay: selectedDate.format("YYYY-MM-DD") });
    } else {
      setUserErrors({
        ...userErrors,
        birthDay:
          "תאריך לא תקין, יש לוודא שהפרטים נכונים והינך מעל 18 (ומתחת ל-120)",
      });
      setUserData({ ...userData, birthDay: "" });
    }
  };

  const handleSecondPass = (secondPass) => {
    //checking if the second password equals to the first
    console.log(secondPass);
    console.log(userData.password);
    if (secondPass === "") {
      setUserErrors({
        ...userErrors,
        passwordValidate: "",
      });
    } else {
      if (secondPass !== userData.password) {
        setUserErrors({
          ...userErrors,
          passwordValidate: "הסיסמאות אינן זהות",
        });
      } else {
        setUserErrors({
          ...userErrors,
          passwordValidate: "",
        });
      }
    }
  };
  const handleEmail = (email) => {
    console.log(email);
    if (email === "") {
      setUserErrors({
        ...userErrors,
        email: "",
      });
    } else {
      if (regexPatternEmail.test(email) || email === "") {
        setUserErrors({ ...userErrors, email: "" });
      } else {
        setUserErrors({
          ...userErrors,
          email:
            "הסיסמה חייבת להכין בין 7 ל- 12 תווים. יש לוודא שיש לפחות תו אחד מיוחד, אות גדולה ומספר",
        });
      }
    }
  };

  useEffect(
    function () {
      ValidateForm();
    },
    [userErrors]
  );

  const onFormSubmit = () => {
    if (IsFormValid) {
      console.log(userData);
    } else {
      alert("invalid");
    }
  };

  // function registerUser() {}

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
              id="email"
              label='דוא"ל'
              variant="outlined"
              error={!!userErrors.email} // Converts string to boolean
              helperText={userErrors.email}
              onChange={(event) => {
                setUserData({ ...userData, email: event.target.value });
              }}
              onBlur={(event) => handleEmail(event.target.value)}
            />
            {/* BIRTHDAY CALENDAR */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                variant="outlined"
                label="בחירת תאריך"
                onChange={(newValue) => handleDateChange(newValue)}
                // error={!!userErrors.birthDay}
                // helperText={userErrors.birthDay}
                minDate={dayjs().subtract(120, "year")} // Set minimum date 120 years ago
                maxDate={dayjs().subtract(18, "year")} // Set maximum date 18 years ago
                disableTextInput
              />
            </LocalizationProvider>

            {/* CITY */}
            <Autocomplete
              sx={{ width: "300px" }}
              disablePortal
              id="combo-box"
              options={["חדרה", "נתניה", "תל אביב", "חיפה", "עמק חפר"]}
              renderInput={(params) => <TextField {...params} label="עיר" />}
              onChange={(event, value) => {
                if (value === null) {
                  setUserData({ ...userData, city: "" });
                } else {
                  setUserData({ ...userData, city: value });
                }
              }}
            />
            <TextField //STREET
              value={userData.street}
              sx={{ width: "300px" }}
              id="street"
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
              id="house-num"
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
              id="username"
              label="שם משתמש"
              variant="outlined"
              maxLength={60}
              error={!!userErrors.userName}
              helperText={userErrors.userName}
              onChange={(event) => handleInputChange(event, "userName")}
            />

            <TextField //PASSWORD
              sx={{ width: "300px" }}
              id="password-input"
              label="הזן סיסמא"
              type="password"
              autoComplete="current-password"
              error={!!userErrors.password}
              helperText={userErrors.password}
              onChange={(event) => handleInputChange(event, "password")}
            />

            <TextField //SECOND PASSWORD
              sx={{ width: "300px" }}
              id="password-validate-input"
              label="הזן סיסמה בשנית"
              type="password"
              autoComplete="current-password"
              error={!!userErrors.passwordValidate}
              helperText={userErrors.passwordValidate}
              onChange={(event) => handleInputChange(event, "passwordValidate")}
              onBlur={(event) => handleSecondPass(event.target.value)}
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
              id="first-name"
              label="שם פרטי"
              variant="outlined"
              error={!!userErrors.firstName}
              helperText={userErrors.firstName}
              onChange={(event) => handleInputChange(event, "firstName")}
            />

            <TextField //LAST NAME
              value={userData.lastName}
              sx={{ width: "300px" }}
              id="last-name"
              label="שם משפחה"
              variant="outlined"
              error={!!userErrors.lastName}
              helperText={userErrors.lastName}
              onChange={(event) => handleInputChange(event, "lastName")}
            />
          </Box>
        </Box>
        <Button
          sx={{ width: "200px", margin: "20px" }}
          variant="contained"
          onClick={onFormSubmit}
        >
          הרשם
        </Button>
      </div>
    </>
  );
}

export default Register;
