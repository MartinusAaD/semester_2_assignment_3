import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import OpenFormButton from "./components/OpenFormButton/OpenFormButton";
import DisplayExpenses from "./components/DisplayExpenses/DisplayExpenses";
import FilterExpenses from "./components/FilterExpenses/FilterExpenses";

function App() {
  // List logic
  const [expensesList, setExpensesList] = useState(
    JSON.parse(localStorage.getItem("expensesList")) || []
  );
  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  const [filteredList, setFilteredList] = useState([]);
  const [isListFiltered, setIsListFiltered] = useState(false);

  // Form logic
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  return (
    <div className={styles.rootContainer}>
      <main>
        <h1>Expenses Tracker</h1>

        {/* Selector for filtering */}
        <FilterExpenses
          expensesList={expensesList}
          setFilteredList={setFilteredList}
          setIsListFiltered={setIsListFiltered}
        />

        {/* Renderer for expenses */}
        <DisplayExpenses
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          filteredList={filteredList}
          isListFiltered={isListFiltered}
          setIsFormOpen={setIsFormOpen}
          setIsInEditMode={setIsInEditMode}
          setExpenseToEdit={setExpenseToEdit}
        />

        {/* Display form if isFormOpen = true */}
        {isFormOpen && (
          <Form
            setIsFormOpen={setIsFormOpen}
            expensesList={expensesList}
            setExpensesList={setExpensesList}
            isInEditMode={isInEditMode}
            setIsInEditMode={setIsInEditMode}
            expenseToEdit={expenseToEdit}
          />
        )}
        <OpenFormButton onClick={() => setIsFormOpen(true)} />
      </main>
    </div>
  );
}

export default App;
