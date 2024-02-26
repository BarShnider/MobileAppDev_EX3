import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import EditDetails from "./Components/EditDetails";
import Admin from "./Components/Admin";

// https://colorhunt.co/palette/c4dfdfd2e9e9e3f4f4f8f6f4
function App() {
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [adminOrUser, setAdminOrUser] = useState(true);

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
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setUsers(JSON.parse(storedData));
      console.log("Users loaded:", JSON.parse(storedData));
    } else {
      console.log("No users found in localStorage.");
    }
  }, []);

  return (
    <>
      {/* <Register addNewUser={setUsers} usersFromStorage={users} /> */}
      <Login
        users={users}
        setIsConnected={setIsConnected}
        setUserAdmin={setAdminOrUser}
      />
      {isConnected ? (
        adminOrUser ? (
          <Profile users={users} setIsConnected={setIsConnected} />
        ) : (
          <Admin users={users} setUsers={setUsers} />
        )
      ) : (
        <div className="connectionProfile">
          <span>יש להתחבר למערכת</span>
        </div>
      )}
    </>
  );
}

export default App;
