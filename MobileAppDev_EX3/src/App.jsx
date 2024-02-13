import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Register from "./Components/Register";

// https://colorhunt.co/palette/c4dfdfd2e9e9e3f4f4f8f6f4
function App() {
  const [users, setUsers] = useState([]); // connect to use effect

  
  useEffect(
    function () {
      console.log("SET");
      localStorage.setItem(
        "users",
        JSON.stringify([{ name: "avi" }, { name: "ben" }])
      );
    },
    [users]
  );

  //useEffect that will work every time the apps opens and will check if there users in the database.
  function loadUsers() {
    useEffect(() => {
      const storedData = localStorage.getItem("users"); //convert into json
      if (
        storedData !== null &&
        storedData !== undefined &&
        storedData.length > 0
      ) {
        () => setUsers(storedData);
        console.log(storedData);
      } else {
        console.log("NO");
      }
    }, []);
  }

  return (
    <>
      {loadUsers()}
      <Register addNewUser={setUsers}/>
      <Login />
      <Profile />
    </>
  );
}

export default App;
