import React, { useState, useEffect } from "react";
import styles from "./SplashScreen.module.css";
import Homepage from "../Homepage/Homepage";

function SlpashScreen() {
  // a hook to show the splash screen when the component mounts
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // a hook to hide the splash screen when the component unmounts
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  });

  let splashScreenContent = (
    <div className={styles["splashscreen"]}>
      <div className={styles["cupcake-wrapper"]}>
        <div className={styles["frosting"]}></div>
        <div className={styles["cherry"]}></div>
        <div className={styles["cupcake-base"]}></div>
      </div>
      <h1>Loading...</h1>
    </div>
  );

  return (
    <>
      {showSplashScreen && splashScreenContent}
      {!showSplashScreen && <Homepage />}
    </>
  );
}
export default SlpashScreen;

// function App() {
//   // a hook to show the splash screen when the component mounts
//   const [showSplashScreen, setShowSplashScreen] = useState(true);

//   // a hook to hide the splash screen when the component unmounts
//   useEffect(() => {
//     setTimeout(() => {
//       setShowSplashScreen(false);
//     }, 5000);
//   });

//   return (
//     <div>
//       <div className="App">
//         {/* if showSplashScreen is true, show the splash screen */}
//         {/* if showSplashScreen is false, hide the splash screen */}
//         {showSplashScreen && <SlpashScreen />}
//         {!showSplashScreen && <Login />}
//       </div>
//     </div>
//   );
// }
