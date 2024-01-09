# Task Management System with Docker

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

1. Ensure you have Docker installed on your machine.
2. Clone the repository: `git clone git@github.com:Lujain92/task-management.git`
3. Navigate to the project directory: `cd task-management`

## Configuration

1. Docker configuration is handled through the provided Docker Compose file.
2. Ensure you have a `.env` file for necessary environment variables.

## Usage

### Running the Application

Ensure Docker is running and execute:

```bash
docker-compose up
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

## Docker Compose Configuration

The provided `docker-compose.yml` file defines the services required to run the application:

- **nodeapp**: Builds the Node.js application and exposes it on port 3000.
- **mongo**: Uses the official MongoDB image, setting up required environment variables.
- **mongo-express**: Provides a web-based MongoDB administration tool on port 8081.

The volumes defined ensure data persistence for the MongoDB service.
