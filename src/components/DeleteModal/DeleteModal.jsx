import React from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({
  setIsDeleteModalActive,
  expensesList,
  setExpensesList,
  expenseIdToDelete,
}) => {
  // Remove Expense
  const removeExpense = () => {
    const updatedList = expensesList.filter(
      (expense) => expense.expenseId !== expenseIdToDelete
    );
    setExpensesList(updatedList);
    setIsDeleteModalActive(false);
  };

  // Find specific expense
  const expenseToDelete = expensesList.find(
    (expense) => expense.expenseId === expenseIdToDelete
  );
  return (
    <div className={styles.deleteModalRootContainer}>
      <div className={styles.deleteModalContainer}>
        <p className={styles.deleteMessage}>
          Are you sure you want to delete "{expenseToDelete.expenseTitle}"?
        </p>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.confirmButton}
            onClick={() => removeExpense()}
          >
            Confirm
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => setIsDeleteModalActive(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
