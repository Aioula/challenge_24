const express = require("express");
const { connectToDb, getDB, getDb } = require("./db");
const { error } = require("console");
const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Employee = require("./models/Employee");

const port = 5000;

const app = express();
app.use(express.json());

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
    database = getDb();
  }
});
///////////////////////////////////////////// get all employee
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
////////////////////////////////////////// update an api
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
///////////////////////////////////////// delete an employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//////////////////////////////////////// create an employee
app.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
