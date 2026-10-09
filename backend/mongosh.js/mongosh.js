db.users.insertMany([
  { name: "Adrian", email: "adrian@example.com", role: "manager" },
  { name: "Ravi", email: "ravi@example.com", role: "developer" }
]);

db.projects.insertOne({
  name: "Project Management Tool",
  description: "A mini Jira-like app",
  createdBy: ObjectId(), // replace with Adrian's _id from users
  members: [],           // later add team member IDs
  status: "active"
});

db.tasks.insertOne({
  title: "Setup MongoDB",
  description: "Install and configure MongoDB",
  assignedTo: ObjectId(), // replace with Ravi's _id
  projectId: ObjectId(),  // replace with your project's _id
  status: "todo",
  priority: "high",
  dueDate: new Date("2025-09-10")
});
