import { Autocomplete, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  return (
    <>
      <h1 className="header">הרשמה</h1>
    <div className="container ">
      <Box sx={{ display: "flex", flexDirection: "row",gap:"100px", border:"1px solid #dedede", padding:"50px",borderRadius:"15px",boxShadow:"3px 3px 5px #87878729",backgroundColor:"#fff"}}>
      <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "20px",
            }}
          >

          <TextField sx={{width:"300px"}} id="outlined-basic" label='דוא"ל' variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{width:"300px"}} />
          </LocalizationProvider>
          <Autocomplete sx={{width:"300px"}}
            disablePortal
            id="combo-box"
            options={["א", "ב"]}
            renderInput={(params) => <TextField {...params} label="עיר" />}
          />
          <TextField sx={{width:"300px"}} id="outlined-basic" label='רחוב' variant="outlined" />
          <TextField sx={{width:"300px"}} id="outlined-basic" label='מספר בית' variant="outlined" />

        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap:"20px",
          }}
        >
          <TextField sx={{width:"300px"}} id="outlined-basic" label="שם משתמש" variant="outlined" />
          <TextField sx={{width:"300px"}}
            id="password-input"
            label="הזן סיסמא"
            type="password"
            autoComplete="current-password"
          />
          <TextField sx={{width:"300px"}}
            id="password-validate-input"
            label="הזן סיסמה בשנית"
            type="password"
            autoComplete="current-password"
          />
          <Button sx={{width:"300px"}}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            העלה תמונה
            <VisuallyHiddenInput type="file" />
          </Button>
          <TextField sx={{width:"300px"}}
            id="outlined-basic"
            label="שם פרטי"
            variant="outlined"
          />
          <TextField sx={{width:"300px"}} id="outlined-basic" label="שם משפחה" variant="outlined" />

          </Box>
          
      </Box>
      <Button sx={{width:"200px", margin:"20px"}} variant="contained">הרשם</Button>
      </div>

    </>
  );
}

export default Register;
