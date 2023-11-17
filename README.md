# Star Wars People Explorer

Welcome to the Star Wars People Explorer, a project showcasing my skills as a front-end developer. This application, developed in ReactJS, is a result of completing the Front End Developer Challenge.

## Overview

The Star Wars People Explorer is a frontend application that interacts with the Star Wars API to present a user-friendly table of characters. It incorporates a variety of features to enhance the user experience, adhering to the specified functionality and acceptance criteria.

## Project Features

### Table Display

- **Pagination:** The table efficiently handles the display of characters, with 10 records per page for a seamless browsing experience.
- **Sorting and Searching:** Users can easily sort and search through the table, making it convenient to find their favorite characters.

### Species Icons

- Each character entry is accompanied by an icon that visually represents their species.
- Icons include the Font Awesome Android icon for droids, the user circle icon for humans, and a question mark for other species.

### Error Handling

- The application gracefully handles error states, providing a clear indication with the Font Awesome exclamation circle icon when the Star Wars API is down.

### Search Functionality

- **Dynamic Searching:** The search functionality allows users to find characters by name, with a loading state displayed during request processing.
- **Clear Interaction:** Clearing the search input resets the table, returning to the first page and clearing any sorting selections.

### Empty State

- When there are no results from the search API, the application presents an empty state with a warning icon, maintaining a polished user interface.

### Count Cards

- Informative count cards offer a quick overview, displaying totals for all results, droids, and humans (or other species).

## Setup

Before running the application, ensure the following resources are included:

- [Font Awesome icon font](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css)
- [Titillium Web font from Google Fonts](https://fonts.googleapis.com/css?family=Titillium+Web:200,600)

## Building and Running the Application

This frontend application is built using ReactJS. To get started:

1. Clone the repository: `git clone https://github.com/Kkknight-12/front-end-task.git`
2. Navigate to the project directory: `cd front-end-task`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

Visit [http://localhost:3000](http://localhost:3000) in your browser to explore the Star Wars People Explorer.

Feel free to open issues for any feedback, suggestions, or improvements. Thank you for exploring the Star Wars People Explorer!
