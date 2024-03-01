/* eslint-disable react/prop-types */
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



function Register({ addNewUser, usersFromStorage }) {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordValidate: "",
    birthDay: "",
    city: null,
    houseNumber: "",
    street: "",
    firstName: "",
    lastName: "",
    img: null,
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
    img: "",
  });

  const regexPatternNumbers = /^[1-9]\d*$/; // any positive number except 0
  const regexPatternPassword =
    /^(?=.*[!@#$%^&*()_+{}|:"<>?])(?=.*[A-Z])(?=.*\d).{7,12}$/;
  const regexPatternUserName =
    /^[a-zA-Z0-9\u00C0-\u00FF!@#$%^&*()_+{}|:"<>?]{1,60}$/; // limited to length 60
  const regexPatternHebrew = /^[\u0590-\u05FF]+$/;
  const regexPatternEmail = /^[a-zA-Z@]+\.com$/;

  const cityOptions = [
    "חדרה",
    "נתניה",
    "תל אביב",
    "חיפה",
    "עמק חפר",
    "ירושלים",
    "באר שבע",
    "ראשון לציון",
    "פתח תקווה",
    "אשדוד",
    "נצרת",
    "אילת",
    "קריית מוצקין",
    "נהריה",
    "בית שמש",
    "רמת גן",
    "רחובות",
    "בת ים",
    "הרצליה",
    "קריית אתא",
    "טבריה",
    "הוד השרון",
    "חולון",
    "נס ציונה",
    "לוד",
    "רמת השרון",
    "כפר סבא",
    "רמלה",
    "עפולה",
    "זכרון יעקב",
    "קריית גת",
    "גבעתיים",
    "אופקים",
    "דימונה",
    "טייבה",
    "קריית שמונה",
    "כרמיאל",
    "עכו",
    "מודיעין מכבים רעות",
    "יבנה",
    "קריית ים",
    "מודיעין עילית",
    "אלעד",
    "ביתר עילית",
    "ערד",
    "מגדל העמק",
    "קריית ביאליק",
    "ראש העין",
    "בית שאן",
    "תושיה",
    "אבן יהודה",
    "כפר יונה",
    "כפר קאסם",
    "רמת ישי",
    "בנימינה",
    "גן יבנה",
    "גבעת שמואל",
    "קדימה-צורן",
    "זרזיר",
    "כפר יאסיף",
    "סח'נין",
    "פרדס חנה-כרכור",
    "כפר גנים",
    "יקנעם עילית",
    "נשר",
    "אור יהודה",
    "נווה אור",
    "באקה אל-גרביה",
    "כפר יובל",
    "אור עקיבא",
    "כפר מנדא",
    "ראש פינה",
    "אום אל-פחם",
    "טירה",
    "כפר קרע",
    "מגאר",
    "מזרע",
    "כפר מצר",
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    // Validate the image file
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setUserErrors({
          ...userErrors,
          img: "יש להעלות תמונה בפורמט JPG או JPEG בלבד",
        });
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Set the 'img' field in userData to the Base64 string of the uploaded image
          setUserData({ ...userData, img: reader.result });
        };
        setUserErrors({ ...userErrors, img: "" }); // Clear the image error
      }
    }
  };
  // checks if inputs are valid
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

      case "userName": {
        let errorUserName = ""; // Now safely declared within a block scope
        if (!regexPatternUserName.test(value)) {
          errorUserName =
            "ניתן למלא אותיות לועזיות בלבד, מספרים ותווים מיוחדים, לכל היותר באורך 60 תווים.";
        } else {
          const isUserNameTaken = usersFromStorage.some(
            (user) => user.userName === value
          );
          if (isUserNameTaken) {
            errorUserName = "משתמש כבר קיים";
          }
        }
        setUserErrors((prevErrors) => ({
          ...prevErrors,
          [fieldError]: errorUserName,
        }));
        break;
      }

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

  const registerUser = () => {
    let flag = true;
    const requiredFields = [
      "userName",
      "email",
      "password",
      "passwordValidate",
      "birthDay",
      "city",
      "houseNumber",
      "street",
      "firstName",
      "lastName",
    ];
    setUserErrors({});
    for (let key of requiredFields) {
      if (!userData[key]) {
        flag = false; // Set flag to false if a required field is missing
        setUserErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "שדה חובה",
        }));
      } else if (
        (key === "email" || key === "userName") &&
        userErrors[key] !== ""
      ) {
        flag = false;
      }
    }
    if (flag) {
      const { passwordValidate, ...userWithoutPasswordValidate } = userData;
      const newUser = { ...userWithoutPasswordValidate };
      addNewUser((prevUsers) => [...prevUsers, newUser]);
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      localStorage.setItem(
        "users",
        JSON.stringify([...existingUsers, newUser])
      );
      setUserData({
        userName: "",
        email: "",
        password: "",
        passwordValidate: "",
        birthDay: "",
        city: null,
        houseNumber: "",
        street: "",
        firstName: "",
        lastName: "",
        img: null,
      });
      setUserErrors({
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
        img: "",
      });
    }
  };

  const handleDateChange = (newValue) => {
    const selectedDate = dayjs(newValue);
    const currentDate = dayjs();
    const age = currentDate.diff(selectedDate, "year");
    if (age <= 120 && age >= 18) {
      setUserErrors({
        ...userErrors,
        birthDay: "", // No error, so set it to empty string
      });
      setUserData({ ...userData, birthDay: selectedDate.format("YYYY-MM-DD") });
    } else {
      setUserErrors({
        ...userErrors,
        birthDay:
          "תאריך לא תקין, יש לוודא שהפרטים נכונים והינך מעל 18 ",
      });
      setUserData({ ...userData, birthDay: "" });
    }
  };

  const handleSecondPass = (secondPass) => {
    //checking if the second password equals to the first
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
    // handles with email
    if (email === "") {
      setUserErrors({
        ...userErrors,
        email: "",
      });
    } else {
      if (regexPatternEmail.test(email)) {
        let flag = false;
        for (let user of usersFromStorage) {
          if (user.email === email) {
            flag = true;
            break;
          }
        }
        if (flag) {
          setUserErrors({
            ...userErrors,
            email: `כתובת המייל כבר תפוסה`, // Email is already in use
          });
        } else {
          setUserErrors({ ...userErrors, email: "" });
        }
      } else {
        setUserErrors({
          ...userErrors,
          email: `כתובת המייל צריכה להיות בפורמט example@example.com`, // Invalid email format
        });
      }
    }
  };

  const handleCity = (selectedCity) => {
    setUserData({ ...userData, city: selectedCity });
    setUserErrors({ ...userErrors, city: "" });
  };

  

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
              error={!!userErrors.email}
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
                onChange={(newValue) => handleDateChange(newValue)}
                label="בחירת תאריך"
                slotProps={{
                  textField: {
                    helperText: userErrors.birthDay,
                    error: !!userErrors.birthDay,
                  },
                }}
                minDate={dayjs().subtract(120, "year")}
                maxDate={dayjs().subtract(18, "year")}
              />
            </LocalizationProvider>

            {/* CITY */}
            <Autocomplete
              sx={{ width: "300px" }}
              disablePortal
              id="combo-box"
              options={cityOptions}
              value={userData.city || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="עיר"
                  error={!!userErrors.city}
                  helperText={userErrors.city}
                />
              )}
              onChange={(event, newValue) => handleCity(newValue)}
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
              value={userData.password ? userData.password : ""}
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
              value={userData.password ? userData.passwordValidate : ""}
              error={!!userErrors.passwordValidate}
              helperText={userErrors.passwordValidate}
              onChange={(event) => handleInputChange(event, "passwordValidate")}
              onBlur={(event) => handleSecondPass(event.target.value)}
            />

            <Button // IMG
              sx={{ width: "300px" }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />} //.       Need TO HANDLE IMG
            >
              העלה תמונה
              <VisuallyHiddenInput type="file" accept="image/jpeg, image/jpg" onChange={handleImageChange} />
              
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
          onClick={() => registerUser()}
        >
          הרשם
        </Button>
      </div>
    </>
  );
}

export default Register;
