import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import ee from "./events";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const gameLoop = () => {
  var gamepad = navigator.getGamepads()[0]; //get the first controller.
  if (gamepad && gamepad.connected) {
    //check if direction buttons (UP, DOWN, LEFT, RIGHT) was pressed
    // var axes = gamepad.axes;
    // to check if other buttons(A,B,C,D,OK,Exit...) was pressed
    var buttons = gamepad.buttons;
    for (var i in buttons) {
      if (buttons[i].pressed == true) {
        ee.emit("gamepadButtonPressed", i);
        // console.log("buttons[%s] pressed", i);
      }
    }
  }
};

setInterval(gameLoop, 100);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
