/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, SvgIcon } from "@mui/material";

export default function SystemAdmin({users,setUsers,setShowEditDetails,setUserToEdit,setIsConnected}) {
  // Function to delete a user by email from the users array and update the state and local storage
  const deleteUser = (mail) => {
    const updatedUsers = users.filter((user) => user.email !== mail);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Function to show the edit details modal for a specific user
  const onShowEdit = (user) => {
    setUserToEdit(user);
    setShowEditDetails((state) => !state);
  };

  return (
    <>
    
    <h1 className="header">ניהול משתמשים</h1>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        border: "1px solid #dedede",
        padding: "15px",
        margin: "20px 100px",
        borderRadius: "15px",
        boxShadow: "3px 3px 5px #87878729",
        backgroundColor: "#fff",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderRadius: "15px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>דואר אלקטרוני</TableCell>
              <TableCell>כתובת</TableCell>
              <TableCell>תאריך לידה</TableCell>
              <TableCell>שם מלא</TableCell>
              <TableCell>שם משתמש</TableCell>
              <TableCell>תמונה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <Button onClick={() => onShowEdit(user)}>
                    <SvgIcon component={EditIcon} />
                  </Button>
                  <Button onClick={() => {deleteUser(user.email);setShowEditDetails(false)}}>
                    <SvgIcon component={RemoveCircleIcon} />
                  </Button>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.street + " " + user.houseNumber + ", " + user.city}
                </TableCell>
                <TableCell>{user.birthDay}</TableCell>
                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>
                  <Avatar
                    sx={{ width: "50px", height: "50px", fontSize: "30px" }}
                    alt={user.firstName + " " + user.lastName}
                    src={user.img}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
              style={{ backgroundColor: "red",width: "300px",margin:"auto"}}
              variant="contained"
              onClick={() => { setIsConnected(false); setShowEditDetails(false)}}
            >
              התנתק
            </Button>
    </Box>
    </>
  );
}
