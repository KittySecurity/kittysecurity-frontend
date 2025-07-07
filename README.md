# KittySecurity Frontend

KittySecurity is a secure password manager web application. This repository contains the frontend code built with React and TypeScript.

## Features

- User registration and login with master password
- Secure password storage using encryption
- Add, view, and delete password entries
- Password generator with customizable settings
- Responsive and modern UI

## Tech Stack

- **React** (with TypeScript)
- **Axios** for HTTP requests
- **CSS** for styling

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/kittysecurity-frontend.git
cd kittysecurity-frontend
npm install
```

### Running the App

```bash
npm dev run
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  components/      # React components (PasswordEntry, AddPassword, etc.)
  pages/           # Page components (Vault, Register, Login, etc.)
  services/        # API and crypto services
  styles/          # CSS files
  App.tsx          # Main app component
  main.tsx        # Entry point
```

## API Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user
- `POST /api/auth/logout` — Logout user
- `GET /api/passwords` — Get all password entries
- `POST /api/passwords` — Add a new password entry
- `DELETE /api/password/{id}` — Delete a password entry


## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

**KittySecurity** — Secure your passwords with confidence!