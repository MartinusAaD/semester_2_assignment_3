import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Form from "./components/Form/Form";
import OpenFormButton from "./components/openFormButton/OpenFormButton";
import DisplayExpenses from "./components/DisplayExpenses/DisplayExpenses";
import FilterExpenses from "./components/FilterExpenses/FilterExpenses";

function App() {
  const [expensesList, setExpensesList] = useState(
    JSON.parse(localStorage.getItem("expensesList")) || []
  );
  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  const [filteredList, setFilteredList] = useState([]);
  const [isListFiltered, setIsListFiltered] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  return (
    <div className={styles.rootContainer}>
      <main>
        <h1>Expenses List</h1>
        <FilterExpenses
          expensesList={expensesList}
          filteredList={filteredList}
          setFilteredList={setFilteredList}
          setIsListFiltered={setIsListFiltered}
        />

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
            setExpenseToEdit={setExpenseToEdit}
          />
        )}
        <OpenFormButton onClick={() => setIsFormOpen(true)} />
      </main>
    </div>
  );
}

export default App;
