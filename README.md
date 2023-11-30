# dps-password-validator

This repository contains the implementation of a password validator, a technical challenge for the DPS Software Engineer track. The validator solely runs in the frontend.

## Project Structure

This project structure focuses on the most important files in this project.

```
dps-password-validator
├── README.md
├── client
    ├── node_modules        -> installed node modules (do not touch)
    └── src
        ├── assets          -> assets such as images & logos
        ├── components      -> common components
        ├── contexts        -> contexts for sharing global state accross the application
        ├── pages           -> individual pages
        └── App.tsx         -> contains routing
```

## Project description

This web application provides a user-friendly interface for validating passwords based on specific criteria. The password validation is handled entirely on the frontend leveraging React, Typescript, Material-UI, and Vite.

This project leverages the MERN (MongoDB, Express.js, React, Node.js) Stack, a powerful combination of technologies, to build a comprehensive messenger application. The architecture is divided into the server side, where MongoDB, Node.js, and Express handle the backend, and the client side, where Typescript, React, and Material-UI contribute to a dynamic and user-friendly frontend.

### Environmnet variables

The necessary environment variables can be found in `.env` in `client`.
The secrets are intentionally shared for ease of setup. Contact one of the maintainers of the project for further access to the secrets.

The following environment variables are necessary to run the application:

`client`

- `VITE_RAPID_API_KEY`: API key to access WordsAPI and source English dictionary

## Get started

### Prerequisites

- Node.js
- `npm` or `yarn`

### Run application

1. Clone respository using `git clone https://github.com/tcw0/dps-password-validator.git`
2. Run frontend:
   1. Move to the client folder using `cd client`
   2. Install the necessary dependencies using `npm install` or `yarn install`
   3. Start the client using `npm run dev` or `yarn dev`
   4. Open the application locally under `http://localhost:5173/`

### Use password validator
1. Enter a password that should be validated
2. Repeat the password until they match each other
3. The password must have a length of 8-16, contain letters of the latin alphabet and at least one digit
4. To strengthen the password further, you can include uppercase letters and special characters
5. After clicking on `VALIDATE YOUR PASSWORD`, the password is checked for english words using a dictionary API
6. You can see in a snackbar message if the validation was successful


## Requirements

### Minimal Requirements
- Password length between 8 and 16 characters
- Contain letters of latin alphabet 
- Contain at least one digit
- Not contain full english words

### Extra Features
- Real-time password validation: Validation rules are checked as the user types
- Real-time password strength: Feedback on password strength is provided as the user types
- Repeat password: Enhance security for users to confirm their passwords
- Snackbar alerts: Informative alerts for users
- Responsive UI: The application is designed to work seamlessly on various screen sizes
- Efficient bundling: Built with Vite for faster development and optimized production builds
- DPS styling: Reflects the company's branding, colors and buttons including animations