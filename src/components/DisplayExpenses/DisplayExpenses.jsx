import React, { useEffect, useState } from "react";
import styles from "./DisplayExpenses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../DeleteModal/DeleteModal";

const DisplayExpenses = ({
  expensesList,
  setExpensesList,
  filteredList,
  isListFiltered,
  setIsFormOpen,
  setIsInEditMode,
  setExpenseToEdit,
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

  // Choose to display full or filtered expensesList
  useEffect(() => {
    if (isListFiltered) {
      setListToDisplay(filteredList);
    } else {
      setListToDisplay(expensesList);
    }
  }, [isListFiltered, filteredList, expensesList]);

  // Capitalize first letter function
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <>
      <table>
        <thead>
          <tr className={styles.expensesTableHeadRow}>
            <th className={styles.expenseTitleCell} scope="col">
              Title
            </th>
            <th className={styles.expenseCategoryCell} scope="col">
              Category
            </th>
            <th className={styles.expenseAmountCell} scope="col">
              Amount
            </th>
            <th className={styles.expenseDateCell} scope="col">
              Date
            </th>
            {/* <th className={styles.expenseIdCell} scope="col">
              ID
            </th> */}
            <th className={styles.expenseToolsCell} scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {/* Either display starting message or the filtered/full expensesList */}
          {listToDisplay.length === 0 ? (
            <tr className={styles.expenseRowEmpty}>
              <td colSpan={6}>
                Start logging your expenses by clicking the plus button in the
                bottom right corner!
              </td>
            </tr>
          ) : (
            listToDisplay.map((expense) => {
              return (
                <tr className={styles.expenseRow} key={expense.expenseId}>
                  <td className={styles.expenseTitleCell}>
                    {capitalizeFirstLetter(expense.expenseTitle)}
                  </td>
                  <td className={styles.expenseCategoryCell}>
                    {capitalizeFirstLetter(expense.expenseCategory)}
                  </td>
                  <td className={styles.expenseAmountCell}>
                    {Number(expense.expenseAmount).toFixed(2)} ,-
                  </td>
                  <td className={styles.expenseDateCell}>
                    {expense.expenseDate}
                  </td>
                  {/* ID can be accessed in the edit window, or in the local storage */}
                  {/* <td className={styles.expenseIdCell}>{expense.expenseId}</td> */}
                  <td className={styles.expenseToolsCell}>
                    <div className={styles.toolsContainer}>
                      {/* Edit Button */}
                      <button
                        className={styles.editButton}
                        onClick={() => {
                          setIsFormOpen(true);
                          setIsInEditMode(true);
                          setExpenseToEdit(expense);
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>

                      {/* Delete Button */}
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
            })
          )}
        </tbody>

        {/* Total expense renderer */}
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

      {/* Delete Modal */}
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
