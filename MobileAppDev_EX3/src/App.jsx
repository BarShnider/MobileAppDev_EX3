import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import EditDetails from "./Components/EditDetails";
import SystemAdmin from "./Components/SystemAdmin";
import 'animate.css';

// https://colorhunt.co/palette/c4dfdfd2e9e9e3f4f4f8f6f4
function App() {
  document.title = "HW3";
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [adminOrUser, setAdminOrUser] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // Load users from localStorage when the component mounts
  useEffect(() => {
    loadUsers();
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
  };

  return (
    <>
      {!isConnected && <Register addNewUser={setUsers} usersFromStorage={users} />}
      {!isConnected && <Login
        users={users}
        setIsConnected={setIsConnected}
        
        setUserAdmin={setAdminOrUser}
        setConnectedUser={setConnectedUser}
        setShowEditDetails={setShowEditDetails}
      />}
      {isConnected ? (
        adminOrUser ? (
          <Profile
            user={connectedUser}
            setIsConnected={setIsConnected}
            setShowEditDetails={setShowEditDetails}
            setUserToEdit={setUserToEdit}
          />
        ) : (
          <SystemAdmin
            users={users}
            setShowEditDetails={setShowEditDetails}
            setUserToEdit={setUserToEdit}
            setUsers={setUsers}
            setIsConnected={setIsConnected}
          />
        )
      ) : (
        <div className="connectionProfile">
          <p>יש להתחבר למערכת</p>
        </div>
      )}
      {showEditDetails && (
        <EditDetails
          userToEdit={userToEdit}
          usersFromStorage={users}
          setUsers={setUsers}
          setEditUser={setShowEditDetails}
          isConnected={isConnected}
        />
      )}
    </>
  );
}

export default App;
