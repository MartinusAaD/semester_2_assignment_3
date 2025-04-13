import { useState } from "react";
import styles from "./App.module.css";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className={styles.rootContainer}>
      <Form />
    </div>
  );
}

export default App;
