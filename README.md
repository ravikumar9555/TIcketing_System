# Jira Ticketing System

This project is a Jira-like ticketing system implemented using the MERN stack with MySQL as the database and Redis for caching.

## Overview

The Jira Ticketing System provides a platform for managing tasks, issues, and projects within an organization. It allows users to create, assign, track, and prioritize tasks effectively. The system supports three types of user roles: Admin, Manager, and Developer, each with different permissions and capabilities.

### Features

- User authentication and authorization with role-based access control
- Create, update, and delete projects
- Create, update, and delete tasks within projects
- Assign tasks to team members
- Track task status and progress
- Prioritize tasks based on urgency and importance
- Dashboard for overview and analytics
- Integration with MySQL for relational database management
- Redis caching for improved performance

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
git clone https://github.com/your_username/jira-ticketing-system.git

2. Navigate to the project directory:


3. Install dependencies for the server:


4. Install dependencies for the client:


5. Configure environment variables:

- Create a `.env` file in the `server` directory and set the following variables:
  ```
  PORT=3001
  DB_HOST=your_mysql_host
  DB_USER=your_mysql_user
  DB_PASSWORD=your_mysql_password
  DB_DATABASE=your_mysql_database
  REDIS_HOST=your_redis_host
  REDIS_PORT=your_redis_port
  ```

6. Initialize the MySQL database schema:

- Run the SQL script `database.sql` in your MySQL database to create the necessary tables.

7. Start the server:


8. Start the client:


9. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- **Admin**: Has full access to all features including creating, updating, and deleting projects and tasks. Can also manage user roles.
- **Manager**: Can create projects, assign tasks to team members, and track progress. Cannot modify system-wide settings.
- **Developer**: Can view assigned tasks, update task status, and provide updates. Limited access to project management functionalities.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
