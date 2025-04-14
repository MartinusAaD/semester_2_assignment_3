import React from "react";
import styles from "./FilterExpenses.module.css";

const FilterExpenses = ({
  expensesList,
  filteredList,
  setFilteredList,
  setIsListFiltered,
}) => {
  const handleFilterChange = (e) => {
    const selectedMonth = e.target.value;

    if (selectedMonth === "all") {
      setFilteredList(expensesList);
      setIsListFiltered(false);
    } else {
      const filtered = expensesList.filter((expense) => {
        const expenseMonth = new Date(expense.expenseDate).getMonth() + 1;
        setIsListFiltered(true);
        return expenseMonth === Number(selectedMonth);
      });

      setFilteredList(filtered);
    }
  };
  return (
    <div className={styles.filterExpenseContainer}>
      <label htmlFor="">Filter by month: </label>
      <select
        name="monthFilter"
        id="monthFilter"
        onChange={handleFilterChange}
        className={styles.monthSelector}
      >
        <option value="all">All</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">Mars</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default FilterExpenses;
