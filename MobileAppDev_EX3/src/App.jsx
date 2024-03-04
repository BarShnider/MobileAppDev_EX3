import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import EditDetails from "./Components/EditDetails";
import SystemAdmin from "./Components/SystemAdmin";
import "animate.css";

function App() {
  document.title = "HW3";
  // States for managing user data and UI state
  const [users, setUsers] = useState([]); // State for storing user data
  const [isConnected, setIsConnected] = useState(false); // State for tracking user connection status
  const [adminOrUser, setAdminOrUser] = useState(false); // State for determining user role (admin or regular user)
  const [connectedUser, setConnectedUser] = useState(null); // State for storing details of connected user
  const [showEditDetails, setShowEditDetails] = useState(false); // State for controlling the visibility of edit details component
  const [userToEdit, setUserToEdit] = useState(null); // State for storing user to be edited

  // Load users from localStorage when the component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  // Function to logout user
  const logoutUser = () => {
    sessionStorage.removeItem("connectedUser");
    setIsConnected(false);
  };

  // Function to load users from localStorage
  const loadUsers = () => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      {/* Render Register component if user is not connected */}
      {!isConnected && (
        <Register addNewUser={setUsers} usersFromStorage={users} />
      )}
      {/* Render Login component if user is not connected */}
      {!isConnected && (
        <Login
          users={users}
          setIsConnected={setIsConnected}
          setUserAdmin={setAdminOrUser}
          setConnectedUser={setConnectedUser}
          setShowEditDetails={setShowEditDetails}
        />
      )}
      {/* Render Profile or SystemAdmin component based on user connection and role */}
      {isConnected ? (
        adminOrUser ? (
          <Profile
            logoutUser={logoutUser}
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
        // Render message prompting user to connect if not connected
        <div className="connectionProfile">
          <p>יש להתחבר למערכת</p>
        </div>
      )}
      {/* Render EditDetails component if showEditDetails is true */}
      {showEditDetails && (
        <EditDetails
          setShowEditDetails={setShowEditDetails}
          logoutUser={logoutUser}
          userToEdit={userToEdit}
          usersFromStorage={users}
          setUsers={setUsers}
          setEditUser={setShowEditDetails}
          isConnected={isConnected}
          adminOrUser={adminOrUser}
        />
      )}
    </>
  );
}

export default App;
