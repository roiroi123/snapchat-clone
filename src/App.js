import React from "react";
import "./App.css";
import WebcamCapture from "./Components/WebcamCapture";
import Preview from "./Components/Preview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chats from "./Components/Chats";
import ChatView from "./Components/ChatView";
import Login from "./Components/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      }else{
        dispatch(logout())
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img className="app__logo" src="https://media.wired.com/photos/5955b319ad90646d424bb3d3/master/pass/snapchat-ghost.jpg" alt="" />
          <div className="app__body">
            <div className="app_bodyBackground">
            <Switch>
              <Route path="/chats/view">
                <ChatView />
              </Route>
              <Route path="/chats">
                <Chats />
              </Route>

              <Route path="/preview">
                <Preview />
              </Route>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
            </Switch>
            </div>
            
          </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
