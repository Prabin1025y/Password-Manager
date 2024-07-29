# <span style="color: #0ea5e9;">&#123;</span> Pass<span style="color: #0ea5e9;">Guard</span> <span style="color: #0ea5e9;">&#125;</span>

Welcome to **PassGuard**! Where security meets simplicity. Manage your passwords with ease and confidence using this lightweight, user-friendly application built with React. PassGuard ensures that your credentials are safely stored and readily accessible whenever you need them.


## Table of Contents

- [{ PassGuard }](#-passguard-)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Clipboard Copy**: Quickly copy usernames and passwords with a single click.
- **Edit and Delete**: Modify or remove your saved credentials with ease.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.
- **Login and Register**: Register and login in the app to access your own password manager

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/download/) also have a [mongodb atlas](https://www.mongodb.com/products/platform/atlas-database) with connection string. Create a new project and a cluster to get your connection string. You can even use your local mongodb compass

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Prabin1025y/Password-Manager.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd Password-Manager
    ```
3. **Frontend**
    - Navigate to frontend
    ```bash
    cd frontend
    ```
    - Install Dependencies
     ```bash
    npm install
    ```
    - Create a .env file in the root frontend directory with following variables
    ```bash
    VITE_BACKEND_URL = http://localhost:3000
    VITE_FRONTEND_URL = http://localhost:5173
    ```
    - Start the frontend
     ```bash
    npm run dev
    ```
4. **Backend**
    - Navigate to backend in new terminal
    ```bash
    cd backend
    ```
    - Install Dependencies
     ```bash
    npm install
    ```
    - Create a .env file in the root backend directory with following variables
    ```bash
    DB_URL=Your_database_connection_string
    SECRET=Your_JWT_(Can be anything like your name)
    ORIGIN_CORS = http://localhost:5173
    ```
    - Start the frontend
     ```bash
    node --watch index.js
    ```

Open [http://localhost:5173](http://localhost:5173) to view frontend in browser and [http://localhost:3000](http://localhost:3000) to inspect response from backend

## Usage

1. **Register**

    - Click **Register**
    - Fill in your details
    - Click on the **Register** button.
    - Your credential will be saved and now you can login with that credential
  
2. **Login**

    - Fill in your details
    - Click on the **Login** button.
    - You will be redirected to your dashboard
  
3. **Add a New Credential**

    - Fill in the website name, username, and password.
    - Click on the **Save** button.
    - Your credential will be saved and displayed in the list.

4. **Toggle Password Visibility**

    - Click on the eye icon next to the password field to toggle visibility.

5. **Edit a Credential**

    - Click on the edit icon next to the credential you want to edit.
    - Make the necessary changes.
    - Click **Save** to update the credential.

6. **Delete a Credential**

    - Click on the delete icon next to the credential you want to remove.
    - Confirm the deletion in the prompt.

7. **Copy to Clipboard**

    - Click on the copy icon next to the username or password to copy the text to your clipboard.
    - 
8. **Logout**

    - Click on profile in top right corner from where you can logout of your account

## Contributing

We welcome contributions from the community. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

---

Thank you for using PassGuard! If you have any questions or feedback, please feel free to open an issue or reach out. Secure your credentials effortlessly and enjoy the peace of mind that comes with PassGuard.
