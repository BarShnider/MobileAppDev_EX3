import { useEffect, useState } from "react"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Register from "./Components/Register"
import EditDetails from "./Components/EditDetails"


// https://colorhunt.co/palette/c4dfdfd2e9e9e3f4f4f8f6f4
function App() {
  const [users,setUsers] = useState([]) // connect to use effect 


  useEffect(function(){
    console.log("SET")
    localStorage.setItem("users", JSON.stringify(users))
  },[users])

  useEffect(function(){
    console.log("GET")
    setUsers(JSON.parse(localStorage.getItem("users")))
  },[])

  
  return (
    <>
    <Register />
    <Login />
    <Profile />
    <EditDetails />
    </>
  )
}

export default App
