import React from 'react';
import './App.css';
import { useMoralis } from "react-moralis";
import Feed from './components/Feed';


function App() {



  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  //   useEffect(() => {
  //   if (isAuthenticated) {
  //     // add your logic here
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }



  return (
    <div className="App">

      {isAuthenticated ? <Feed logout = {logout} user = {user.get("ethAddress")}/> : <button onClick={login}>Moralis Metamask Login</button> }

      
    </div>
  );
}

export default App;