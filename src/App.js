import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import "./App.css";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // Load expenses from localStorage
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (amount.trim() === "" || category.trim() === "") return;
    const newExpense = { id: Date.now(), amount, category };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={addExpense}>
          <FaPlus /> Add
        </button>
      </div>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category}: ₹{expense.amount}
            <FaTrash className="delete-icon" onClick={() => deleteExpense(expense.id)} />
          </li>
        ))}
      </ul>

      <h3>Total: ₹{expenses.reduce((acc, curr) => acc + Number(curr.amount), 0)}</h3>
    </div>
  );
};

export default ExpenseTracker;
