import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import OpenFormButton from "./components/openFormButton/OpenFormButton";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className={styles.rootContainer}>
      <main>
        {isFormOpen && <Form setIsFormOpen={setIsFormOpen} />}
        <OpenFormButton onClick={() => setIsFormOpen(true)} />
      </main>
    </div>
  );
}

export default App;
