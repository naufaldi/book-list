# Book Application

A dynamic book management application built with React, React Query, and React Router. This application allows users to view book details, add new books, edit existing books, and manage their favorite books. The application ensures data persistence using local storage.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React.
- **React Router**: A library for routing in React applications.
- **React Toastify**: A library for displaying toast notifications.
- **Local Storage**: Web storage for persistent data.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.

## Features

- **Book Listing**: Displays a paginated list of books fetched from an API and local storage.
- **Book Details**: View detailed information about each book.
- **Add/Edit Book**: Add new books or edit existing books.
- **Favorites Management**: Mark books as favorites and persist favorites in local storage.
- **Responsive Design**: Ensures usability across different device sizes.
- **Notifications**: Display success messages for adding and editing books using React Toastify.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/naufaldi/book-list.git
   cd book-application
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn run dev
   ```

## Usage

### Viewing Books

- The home page displays a list of books with pagination.
- Click on a book to view its details.

### Adding a New Book

- Click the "Add Book" button to open the modal form.
- Fill in the book details and submit the form.

### Editing an Existing Book

- Click the "Edit" button on a book card to open the modal form pre-filled with the book's details.
- Update the information and submit the form.

### Managing Favorites

- Click the heart icon on a book card to add or remove it from your favorites.
- Favorites are stored in local storage and persist across sessions.

### Notifications

- Success messages are displayed at the top center of the screen when a book is successfully added or edited.

## License

This project is licensed under the MIT License.
