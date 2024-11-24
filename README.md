# Personal Library Manager

An intuitive and efficient application for managing a personal book collection. Users can easily add, view, update and delete books. Built with **React.js** for the user interface, **TypeScript** for type safety, **SWR** for data management, and **axios** for server communication. The design is crafted using **Material UI (v5)**, ensuring a modern and responsive experience across all devices. Book additions and updates are efficiently handled with **Formik**, while **Yup** ensures data validation to keep everything accurate and secure.

## How To Run

### Clone the repositories

```sh
$ git clone https://github.com/StiopAlexandra/PersonalLibraryManager.git
$ cd PersonalLibraryManager
```

### Setup environment variables

Inside the client directory, create a .env file with the following content:

```sh
VITE_BASE_URL='http://localhost:3001'
```

### Install the dependencies and run the applications

Server:

```sh
$ cd server
$ npm install
$ npm run start
```

Client:

```sh
$ cd client
$ npm install
$ npm run dev
```

Open http://localhost:3002 to view the app in the browser.
