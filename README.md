### todo & reminders App

## Features:

- collaboration with other users to create notes, todo lists and reminders
- integration with Google to authenticate and import/export user's data from Google Callendar
- personalized notifications including real time-and push notifications
- innovative interface based on animations and gestures
- high customization of interface, support of different themes and languages

## Demo:

[In Progress]

## Built with:

- React, Tyescript, MUI, hook-form, framer-motion, dnd, i18next, socket.io
- NodeJS, Tyescript, inversify-express-utils, passport, mongoose, node-cache, node-schedule, googleapis

## Project Status

[In Progress]

## Project Screen Shot(s)

[In Progress]
![image](https://github.com/wojciechszutryk/todoReact/assets/72247608/f7c3f329-1810-4c15-a563-85e7fbb5aa08)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Setup environment variables:

in /backend/.env and /frontend/.env according to .env.example files

Installation in /backend and /frontend:

`npm install`

To setup shared models e.g.:

    Windows:

    ```bash
    mklink /D "D:\...\frontend\src\linked-models" "D:\...\models"
    mklink /D "D:\...\backend\src\linked-models" "D:\...\models"
    ```

    Mac OS and Linux:

    ```bash
    ln -s /Users/wojciechszutryk/Desktop/RemDo/models /Users/wojciechszutryk/Desktop/RemDo/frontend/src/linked-models
    ln -s /Users/wojciechszutryk/Desktop/RemDo/models /Users/wojciechszutryk/Desktop/RemDo/backend/src/linked-models
    ```

To Start Server (both backend and frontend):

`npm start`

To Visit App:

`localhost:3001` (CLIENT_URL)
