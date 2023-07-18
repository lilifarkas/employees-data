# Employee Management System
A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows you to manage employees and equipment.

## Features
- Create, read, update, and delete employee records
- Add and manage equipment inventory
- Assign equipment to employees and track the amount
- Arrange employees based on various criteria
- Filter employees by position and level

## Technologies Used
- MongoDB: Database for storing employee and equipment data
- Express: Backend framework for building RESTful APIs
- React: Frontend library for building user interfaces
- Node.js: JavaScript runtime environment for server-side development
- HTML/CSS: Markup and styling of the application
- Bootstrap: CSS framework for responsive and modern UI design

## Installation

To run this portfolio page locally, follow these steps:

1. Clone the repository:

```powershell
git clone https://github.com/lilifarkas/employees-data.git
```
2. Install dependencies:

```powershell
cd backend
npm install
```
3. Set up the environment variables:

- Create a .env file in the root directory.
- Specify the MongoDB connection URI in the .env file:

4. Start the development server:

```powershell
npm run dev
```
This will start the backend server on http://localhost:5000

5. Change into the frontend project directory:

```powershell
cd frontend
cd client
```

6. Start the frontend:

```powershell
npm start
```
This will start the React development server on http://localhost:3000.

## Usage

- Create Employee:

Fill in the required fields such as first name, last name, and position.
Select the level and equipment for the employee (optional).
Click the "Create record" button to add the employee to the system.
- Edit Employee:

Click the "Edit" button next to an employee in the employee list.
Modify the employee's details or equipment.
Click the "Update" button to save the changes.
- Delete Employee:

Click the "Delete" button next to an employee in the employee list.
Confirm the deletion when prompted.
- Add Equipment:

Navigate to the Equipment section in the application.
Fill in the equipment details such as name, type, and amount.
Click the "Add Equipment" button to add the equipment to the system.
- Assign Equipment to Employee:

While creating or editing an employee, select the desired equipment from the dropdown list.
The selected equipment will be added to the employee's equipment list.
The amount of equipment will be automatically adjusted based on assignments.
- Arrange Employees:

Use the "Arrange" dropdown menu to sort employees based on different criteria such as first name, last name, position, level, etc.
- Filter Employees:

Use the "Filter by position" and "Filter by level" input fields to search for employees based on their position or level.
