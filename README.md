# To-Do List App (React)

This project is a fully functional To-Do List application built with React, featuring admin-managed users and separate task lists, demonstrating core front-end development concepts and user data management within an organizational context.

## About

This To-Do List application showcases my ability to build scalable, user-friendly applications with React, applying modern development techniques and best practices. It demonstrates effective state management, routing, performance optimization, and now, admin-managed users and data persistence.

## Features

* **Admin-Managed Users:**
    * Managers can create and manage user accounts (employees).
    * No public signup or login; users are created by an administrator.
* **User-Specific Task Lists:**
    * Each employee has their own separate to-do list.
    * Tasks are associated with the assigned employee.
* **Add Tasks:** Easily add new tasks to your to-do list.
* **Mark Tasks as Completed:** Toggle task completion status.
* **Delete Tasks:** Remove tasks from the list.
* **Filter Tasks:** Filter tasks based on completion status (All, Active, Completed).
* **Search Tasks:** Search for specific tasks using a debounce-optimized search bar.
* **Routing:** Seamless navigation between different views.
* **Responsive Design:** Works well on various screen sizes.

## Technologies Used

* **React:** For building the user interface.
* **React Router:** For navigation between views.
* **Context API:** For state management.
* **Hooks (useState, useReducer, useEffect):** For managing component state and side effects.
* **JavaScript (ES6+):** For application logic.
* **CSS:** For styling.

## Usage

* **Adding Tasks:** Type your task in the input field and press Enter or click the "Add" button.
* **Marking Tasks:** Click the checkbox next to a task to mark it as completed.
* **Deleting Tasks:** Click the delete button (usually an "X" or trash icon) next to a task.
* **Filtering Tasks:** Use the date filter option to view specific tasks of that date.
* **Searching Tasks:** Type in the search bar to filter tasks by their date. The search uses a debounce technique to reduce unnecessary filtering operations.

## State Management

This application uses the React Context API for state management, allowing for efficient handling of application state across components. `useReducer` and `useState` hooks are utilized for managing component-level state.

## Debounce

The search functionality implements a debounce technique to optimize performance. This prevents rapid and excessive filtering operations when the user types in the search bar, improving the user experience.

