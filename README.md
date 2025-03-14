# Task Manager App  

The Task Manager App is a web-based application designed to help users create, manage, and track tasks efficiently. The app is built using React and Firebase, featuring authentication, task prioritization, and a user-friendly dashboard.  

## Overview  

This application allows users to create tasks with a title, description, priority level, and due date. Tasks can be marked as completed, edited, or deleted. Firebase Authentication ensures secure user access, and Firestore is used to store task data. The application includes a dark mode option for better readability.  

## Features  

- User authentication using Firebase Authentication  
- Task creation with title, description, priority, and due date  
- Task editing and deletion  
- Task status updates including pending, in progress, and completed  
- Dark mode toggle for user preference  
- Responsive design for both desktop and mobile devices  
- Task filtering to separate active and completed tasks  

## How It Works  

Users log in through Firebase Authentication and are redirected to the dashboard, where they can view, create, and manage tasks. Tasks are displayed in an organized list, showing active and recently completed tasks. Users can update the status of a task or delete it if necessary.  

The dark mode toggle allows users to switch between light and dark themes. The selected mode is saved locally so that it persists across sessions.  

## File and Code Overview  

index.html - Entry point of the application  
App.jsx - Main component that defines the application structure and routes  
Dashboard.jsx - Displays tasks and includes task management functionality  
Home.jsx - The landing page with a login prompt  
Login.jsx - Handles user authentication and login process  
TaskDetail.jsx - Allows users to view and update individual tasks  

## Services  

taskService.js - Handles Firestore interactions for task storage and retrieval  

## Styling  

App.css and index.css - Styles the application, including layout, buttons, and dark mode  

## Task Lifecycle  

Users log in using Firebase Authentication  
The dashboard loads tasks specific to the logged-in user  
Users create tasks by entering details in the form  
The task appears in the active tasks list  
Users can update the task status to in progress or completed  
Tasks can be edited or deleted at any time  

## Additional Notes  

The app is designed to be fully responsive  
Dark mode settings persist even after logout  
Only the logged-in user can access and modify their tasks  
Firestore provides real-time updates for task data  

This project serves as a simple yet effective task management system for users who need to track their tasks efficiently.  
