# User Management Dashboard

A responsive User Management Dashboard built using **React**, **Vite**, **Tailwind CSS**, and **Axios**. The project uses the **JSONPlaceholder API** to demonstrate user management features.

## Features

- View all users
- Add, Edit and Delete users
- Search users
- Filter users by first name, last name, email and department
- Sort users
- Pagination (10, 25, 50 and 100 rows)
- Client-side form validation
- API error handling
- Responsive UI
- Basic unit tests using Vitest

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Vitest
- React Testing Library

## API

JSONPlaceholder
https://jsonplaceholder.typicode.com/users

## Setup

```bash
npm install
npm run dev
```

Run tests

```bash
npm test
```

## Project Structure

src/
api
components
pages
tests
App.jsx
main.jsx

## Assumptions

- JSONPlaceholder provides only 10 users.
- POST, PUT and DELETE requests are simulated by the API.
- User data is updated on the client side after a successful API response.

## Challenges

- Combining search, filter, sorting and pagination together.
- Reusing the same form component for both Add and Edit operations.
- Handling the limitations of the JSONPlaceholder API.

## Future Improvements

- Add more unit test coverage.
- Implement server-side pagination.
- Connect to a real backend instead of a mock API.
