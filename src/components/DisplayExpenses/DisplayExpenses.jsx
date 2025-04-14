import React, { useState } from "react";
import styles from "./DisplayExpenses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../DeleteModal/DeleteModal";

const DisplayExpenses = ({ expensesList, setExpensesList }) => {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [expenseIdToDelete, setExpenseIdToDelete] = useState(null);
  return (
    <>
      <table>
        <thead>
          <tr className={styles.expensesTableHeadRow}>
            <th className={styles.expenseTitleCell}>Title</th>
            <th className={styles.expenseCategoryCell}>Category</th>
            <th className={styles.expenseAmountCell}>Amount</th>
            <th className={styles.expenseDateCell}>Date</th>
            <th className={styles.expenseIdCell}>ID</th>
            <th className={styles.expenseToolsCell}></th>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense) => {
            return (
              <tr className={styles.expenseRow} key={expense.expenseId}>
                <td className={styles.expenseTitleCell}>
                  {expense.expenseTitle}
                </td>
                <td className={styles.expenseCategoryCell}>
                  {expense.expenseCategory}
                </td>
                <td className={styles.expenseAmountCell}>
                  {expense.expenseAmount}
                </td>
                <td className={styles.expenseDateCell}>
                  {expense.expenseDate}
                </td>
                <td className={styles.expenseIdCell}>{expense.expenseId}</td>
                <td className={styles.expenseToolsCell}>
                  <div className={styles.toolsContainer}>
                    <button className={styles.editButton}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        setExpenseIdToDelete(expense.expenseId);
                        setIsDeleteModalActive(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isDeleteModalActive && (
        <DeleteModal
          setIsDeleteModalActive={setIsDeleteModalActive}
          expensesList={expensesList}
          setExpensesList={setExpensesList}
          expenseIdToDelete={expenseIdToDelete}
        />
      )}
    </>
  );
};

export default DisplayExpenses;
