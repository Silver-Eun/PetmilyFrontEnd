import styles from "./App.module.css";
import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";


function App() {
  return (
    <div className={styles["App"]}>
      <Header />
      <Main />
      <Footer />
    </div>);

}

export default App;