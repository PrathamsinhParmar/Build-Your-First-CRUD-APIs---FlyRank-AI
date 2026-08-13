# Task API

A simple CRUD API for managing a to-do list, built with Node.js and Express.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. The API will be available at `http://localhost:3000`.

## Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API info |
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |

## Swagger UI

Interactive API documentation is available at `http://localhost:3000/docs` via Swagger UI.

*(Insert your Swagger screenshot here)*

## Example Usage

Create a new task:
```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
```

## AI vs me

**My Prompt:**
"Create a simple CRUD API for a to-do list using Node.js and Express. It needs 5 endpoints: GET /tasks, GET /tasks/:id, POST /tasks, PUT /tasks/:id, and DELETE /tasks/:id. Use an in-memory list for storage. Validate that the POST and PUT endpoints have a title. Return appropriate status codes: 200, 201, 204, 400, 404. Also add Swagger UI at /docs."

**Observations:**

1. **What did the AI do better?**
   The AI built the entire Swagger configuration directly into a JavaScript object inside `index.js` instead of using an external `openapi.json` file, which is arguably cleaner for a very small API. It also used a `currentId` counter for auto-incrementing IDs instead of computing `Math.max` on the array on every creation.
2. **What did it get wrong or ignore?**
   The AI incorrectly required `title` on the `PUT /tasks/:id` route even if a user just wanted to update the `done` status. It also missed the root (`/`) and `/health` endpoints. 
3. **What did your prompt forget to specify?**
   I forgot to mention that the API should start with 3 pre-filled tasks. I also forgot to specify the root and health endpoints, and I wasn't clear enough about partial updates on the PUT route.
