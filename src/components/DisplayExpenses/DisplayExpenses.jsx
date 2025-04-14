import React, { useEffect, useState } from "react";
import styles from "./DisplayExpenses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../DeleteModal/DeleteModal";
import FilterExpenses from "../FilterExpenses/FilterExpenses";

const DisplayExpenses = ({
  expensesList,
  setExpensesList,
  filteredList,
  isListFiltered,
}) => {
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [expenseIdToDelete, setExpenseIdToDelete] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [listToDisplay, setListToDisplay] = useState(expensesList);

  // Calculate total expense
  useEffect(() => {
    const totalValue = listToDisplay.reduce((acc, expense) => {
      return acc + Number(expense.expenseAmount);
    }, 0);

    setTotalExpense(totalValue);
  }, [listToDisplay]);

  // Choose to display full or filtered list
  useEffect(() => {
    console.log(isListFiltered);

    if (isListFiltered) {
      setListToDisplay(filteredList);
    } else {
      setListToDisplay(expensesList);
    }
  }, [isListFiltered, filteredList, expensesList]);

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
          {listToDisplay.map((expense) => {
            return (
              <tr className={styles.expenseRow} key={expense.expenseId}>
                <td className={styles.expenseTitleCell}>
                  {expense.expenseTitle}
                </td>
                <td className={styles.expenseCategoryCell}>
                  {expense.expenseCategory}
                </td>
                <td className={styles.expenseAmountCell}>
                  {Number(expense.expenseAmount).toFixed(2)} ,-
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
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className={styles.totalExpenseContainer}>
                <p>Total Expenses:</p>
                <p>{Number(totalExpense).toFixed(2)} ,-</p>
              </div>
            </td>
          </tr>
        </tfoot>
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
