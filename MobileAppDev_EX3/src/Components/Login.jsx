import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Login() {
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
          label='שם משתמש'
          variant="outlined"
        />


<TextField sx={{width:"300px"}}
            id="login-password-input"
            label="הזן סיסמא"
            type="password"
            autoComplete="current-password"
          />
        <Button variant="contained">התחבר</Button>
      </Box>
      </div>
    </>
  );
}

export default Login;
