const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;

// Swagger Setup
const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Todo API', version: '1.0.0' },
  paths: {
    '/tasks': {
      get: { responses: { 200: { description: 'Success' } } },
      post: { responses: { 201: { description: 'Created' }, 400: { description: 'Bad Request' } } }
    },
    '/tasks/{id}': {
      get: { responses: { 200: { description: 'Success' }, 404: { description: 'Not Found' } } },
      put: { responses: { 200: { description: 'Success' }, 400: { description: 'Bad Request' }, 404: { description: 'Not Found' } } },
      delete: { responses: { 204: { description: 'Deleted' }, 404: { description: 'Not Found' } } }
    }
  }
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: currentId++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Read all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Read a single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(task);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { title, done } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  task.title = title;
  if (done !== undefined) task.done = done;
  
  res.status(200).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  
  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
