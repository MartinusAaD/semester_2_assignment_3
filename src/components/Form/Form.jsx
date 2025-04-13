import React, { useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [expense, setExpense] = useState({
    expenseTitle: "",
    expenseCategory: "",
    expenseAmount: "",
    expenseDate: "",
    expenseId: uuidv4(),
  });

  const [expensesList, setExpensesList] = useState(
    JSON.parse(localStorage.getItem("expensesList")) || []
  );

  useEffect(() => {
    localStorage.setItem("expensesList", JSON.stringify(expensesList));
  }, [expensesList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  // const expenseTitle = useRef();
  // const expenseCategory = useRef();
  // const expenseAmount = useRef();
  // const expenseDate = useRef();
  // const expenseId = useRef();

  const handleValidation = () => {};

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(expense);

    setExpensesList((prev) => [...prev, expense]);

    // Reset Form
    setExpense({
      expenseTitle: "",
      expenseCategory: "",
      expenseAmount: "",
      expenseDate: "",
      expenseId: uuidv4(),
    });
  };
  const handleCancel = () => {};
  return (
    <div className={styles.formContainer}>
      <form className={styles.formExpenses} onSubmit={handleSubmit} noValidate>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseTitleContainer}`}
        >
          <label htmlFor="expenseTitle" className={styles.expenseLabel}>
            Title:
          </label>
          <input
            type="text"
            name="expenseTitle"
            id="expenseTitle"
            className={styles.expenseInput}
            placeholder="Enter title of expense"
            value={expense.expenseTitle}
            onChange={handleChange}
          />
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseCategoryContainer}`}
        >
          <label htmlFor="expenseCategory" className={styles.expenseLabel}>
            Category:
          </label>
          <select
            name="expenseCategory"
            id="expenseCategory"
            className={styles.expenseInput}
            value={expense.expenseCategory}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="housing">Housing</option>
            <option value="utilities">Utilities</option>
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseAmountContainer}`}
        >
          <label htmlFor="expenseAmount" className={styles.expenseLabel}>
            Amount:
          </label>
          <input
            type="number"
            name="expenseAmount"
            id="expenseAmount"
            className={styles.expenseInput}
            placeholder="Enter expense amount"
            value={expense.expenseAmount}
            onChange={handleChange}
          />
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseDateContainer}`}
        >
          <label htmlFor="expenseDate">Date of expense:</label>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            className={styles.expenseInput}
            value={expense.expenseDate}
            onChange={handleChange}
          />
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseIdContainer}`}
        >
          <label htmlFor="expenseId" className={styles.expenseLabel}>
            ID:
          </label>
          <input
            type="text"
            name="expenseId"
            id="expenseId"
            className={styles.expenseInput}
            placeholder={expense.expenseId}
            value={expense.expenseId}
            disabled
            onChange={handleChange}
          />
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formButtonsContainer}`}
        >
          <button className={`${styles.formSubmitButton} ${styles.formButton}`}>
            Submit
          </button>
          <button
            type="button"
            className={`${styles.formCancelButton} ${styles.formButton}`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
