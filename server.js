const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection (LOCAL)
mongoose.connect("mongodb://127.0.0.1:27017/leaveDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const leaveSchema = new mongoose.Schema({
    name: String,
    reason: String,
    fromDate: String,
    toDate: String,
    status: { type: String, default: "Pending" }
});

const Leave = mongoose.model("Leave", leaveSchema);

// Apply Leave
app.post("/api/apply", async (req, res) => {
    const leave = new Leave(req.body);
    await leave.save();
    res.send("Leave Applied");
});

// Get Leaves
app.get("/api/leaves", async (req, res) => {
    const data = await Leave.find();
    res.json(data);
});

// Update Status
app.post("/api/update/:id", async (req, res) => {
    await Leave.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });
    res.send("Updated");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});