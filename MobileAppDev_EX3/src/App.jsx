import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import EditDetails from "./Components/EditDetails";
import SystemAdmin from "./Components/SystemAdmin";

// https://colorhunt.co/palette/c4dfdfd2e9e9e3f4f4f8f6f4
function App() {
  document.title = "HW3"
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [adminOrUser, setAdminOrUser] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null)
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  
  // useEffect(() => {
  //   console.log("SET");
  //   // Setting initial users in localStorage with a key "users"
  //   localStorage.setItem(
  //     "users",
  //     JSON.stringify([
  //       {
  //         userName: "yoni",
  //         password: "!Zxc123",
  //         birthDay: "08/09/1997",
  //         email: "y@gmail.com",
  //         city: "נתניה",
  //         houseNumber: "40",
  //         street: "ויצמן",
  //         firstName: "יוני",
  //         lastName: "בנינו",
  //       },
  //     ])
  //   );
  // }, []);

  // Load users from localStorage when the component mounts
  useEffect(() => {
    loadUsers()
  }, []);


  const loadUsers = () => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
      console.log("Users loaded:", JSON.parse(storedData));
    } else {
      console.log("No users found in localStorage");
      setUsers([]);

    }
  }

  return (
    <>
      <Register addNewUser={setUsers} usersFromStorage={users} />
      <Login
        users={users}
        setIsConnected={setIsConnected}
        setUserAdmin={setAdminOrUser}
        setConnectedUser={setConnectedUser}
      />
      {isConnected ? (
        adminOrUser ? (
          <Profile user={connectedUser} setIsConnected={setIsConnected} setShowEditDetails={setShowEditDetails} setUserToEdit={setUserToEdit} />
        ) : (
          <SystemAdmin users={users} setShowEditDetails={setShowEditDetails} setUserToEdit={setUserToEdit} setUsers={setUsers} />
        )
      ) : (
        <div className="connectionProfile">
          <p>יש להתחבר למערכת</p>
        </div>
      )}
    {showEditDetails && <EditDetails userToEdit={userToEdit} usersFromStorage={users} setUsers={setUsers}/>}   
    </>
  );
}

export default App;
