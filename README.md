# Task Management System

### Author: Lujain Al-Jarrah
### Version : 1.0.0
## Overview

This is a Task Management System built using Node.js and MongoDB to manage tasks with functionalities for creating, editing, and deleting tasks.

## Features

- **Task Creation**: Create new tasks with a name, status, and due date.
- **Task Listing**: View a list of all tasks.
- **Task Editing**: Modify task details such as name, status, and due date.
- **Task Deletion**: Remove tasks from the system.

## Installation

1. Clone the repository: `git clone https://github.com/lujain92/task-management.git`
2. Navigate to the project directory: `cd task-management`
3. Install dependencies: `npm install`

## Configuration

1. Set up a MongoDB database and obtain connection credentials.
2. Configure the database connection in `util/database.js`.

## Usage

### Running the Application

Run the application using:

```bash
npm start
```

The application will start on `http://localhost:3000`.

### Routes

- `/tasks`: View all tasks.
- `/task/create`: Create a new task.
- `/task/edit/:taskId`: Edit a specific task.
- `/task/delete/:taskId`: Delete a specific task.

## Dependencies

- `express`: Web application framework for Node.js
- `mongodb`: Official MongoDB driver for Node.js
- Other dependencies can be found in `package.json`.
