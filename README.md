# Trainings Hub

Trainings Hub is a web-based platform designed to facilitate the management and participation in various training programs. It allows users to browse, register, and manage training courses efficiently.

## Features
- User authentication and authorization
- Course browsing and filtering
- Enrollment in training programs
- User dashboard for managing registered courses
- Admin panel for adding and managing courses
- Responsive and user-friendly UI

## Technologies Used
- **Frontend:** React, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js
- MongoDB
- Git

### Steps to Run the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/maryamsherif/Trainings-Hub.git
   cd Trainings-Hub
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the server:**
   ```sh
   npm start
   ```

5. **Access the application:**
   Open your browser and go to `http://localhost:3000`

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

