const express = require("express");
const router = express.Router();
const { query } = require("../config/db");

// @route GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const { rows } = await query("SELECT * FROM tasks ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Unable to load tasks" });
  }
});

// @route POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { rows } = await query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, COALESCE($3, 'pending')) RETURNING *",
      [title, description || null, status || null]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: "Unable to create task" });
  }
});

// @route PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { rows } = await query(
      `UPDATE tasks
       SET title = COALESCE($1, title), description = COALESCE($2, description),
           status = COALESCE($3, status), updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [title, description, status, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ message: "Task not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ message: "Unable to update task" });
  }
});

// @route DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const { rowCount } = await query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete task" });
  }
});

module.exports = router;
