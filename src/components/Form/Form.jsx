import React, { useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import shortUUID from "short-uuid";

const Form = ({ setIsFormOpen, setExpensesList }) => {
  const [expense, setExpense] = useState({
    expenseTitle: "",
    expenseCategory: "",
    expenseAmount: "",
    expenseDate: "",
    expenseId: shortUUID().new(),
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [formIsValid, setFormIsValid] = useState(true);

  const handleValidation = () => {
    const errors = { ...errorMessages };
    let isValid = true;

    if (!expense.expenseTitle.trim()) {
      errors.expenseTitleError = "Please enter the expenses title!";
      isValid = false;
    } else {
      errors.expenseTitleError = "";
    }

    if (!expense.expenseCategory) {
      errors.expenseCategoryError = "Please choose an expense category!";
      isValid = false;
    } else {
      errors.expenseCategoryError = "";
    }

    if (!expense.expenseAmount) {
      errors.expenseAmountError = "Please specify the expense amount!";
      isValid = false;
    } else {
      errors.expenseAmountError = "";
    }

    if (!expense.expenseDate) {
      errors.expenseDateError = "Please enter the date of specified expense!";
      isValid = false;
    } else {
      errors.expenseDateError = "";
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [`${name}Error`]: "" }));
  };

  // This useEffect was created with the help of ChatGPT
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFormOpen(false);
        resetForm();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsFormOpen]);

  // Cancel Button
  const handleCancel = () => {
    setIsFormOpen(false);
    resetForm();
  };

  // Reset Form
  const resetForm = () => {
    setExpense({
      expenseTitle: "",
      expenseCategory: "",
      expenseAmount: 0,
      expenseDate: "",
      expenseId: shortUUID().new(),
    });
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = handleValidation();

    if (!isFormValid) {
      return;
    } else {
      setExpensesList((prev) => [...prev, expense]);
      resetForm();
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formExpenses} onSubmit={handleSubmit} noValidate>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseTitleContainer}`}
        >
          <label htmlFor="expenseTitle" className={styles.expenseLabel}>
            Title: *
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
          <p className={styles.inputError}>{errorMessages.expenseTitleError}</p>
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseCategoryContainer}`}
        >
          <label htmlFor="expenseCategory" className={styles.expenseLabel}>
            Category: *
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
          <p className={styles.inputError}>
            {errorMessages.expenseCategoryError}
          </p>
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseAmountContainer}`}
        >
          <label htmlFor="expenseAmount" className={styles.expenseLabel}>
            Amount: *
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
          <p className={styles.inputError}>
            {errorMessages.expenseAmountError}
          </p>
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseDateContainer}`}
        >
          <label htmlFor="expenseDate" className={styles.expenseLabel}>
            Date of expense: *
          </label>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            className={styles.expenseInput}
            value={expense.expenseDate}
            onChange={handleChange}
          />
          <p className={styles.inputError}>{errorMessages.expenseDateError}</p>
        </div>
        <div
          className={`${styles.formExpenseContainer} ${styles.formExpenseIdContainer}`}
        >
          <label htmlFor="expenseId" className={styles.expenseLabel}>
            ID: *
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
          <p className={styles.inputError}></p>
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
