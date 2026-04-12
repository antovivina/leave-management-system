const express = require("express");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Temporary storage (no MongoDB)
let leaves = [];

// Apply Leave
app.post("/api/apply", (req, res) => {
    const newLeave = {
        _id: Date.now().toString(),
        name: req.body.name,
        reason: req.body.reason,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        status: "Pending"
    };

    leaves.push(newLeave);

    res.send("Leave Applied");
});

// Get All Leaves
app.get("/api/leaves", (req, res) => {
    res.json(leaves);
});

// Update Leave Status
app.post("/api/update/:id", (req, res) => {
    const id = req.params.id;
    const status = req.body.status;

    leaves = leaves.map(l => {
        if (l._id === id) {
            return { ...l, status: status };
        }
        return l;
    });

    res.send("Status Updated");
});

// Start Server (IMPORTANT for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
