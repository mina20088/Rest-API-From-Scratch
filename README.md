<div align="center">
  <img src="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_light.svg" width="100" alt="Deno logo">
  <h1>Rest API From Scratch Using Deno</h1>
  <p><b>A simple, modular Deno-powered web server with custom routing and static file support.</b></p>
  <p>
    <img alt="Deno" src="https://img.shields.io/badge/deno-%5E1.0.0-black?logo=deno&logoColor=white">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Status: Active" src="https://img.shields.io/badge/status-active-brightgreen">
  </p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Routing Logic](#routing-logic)
- [Configuration](#configuration)
- [Source Files](#source-files)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## 📝 Overview

This project is a minimalist Deno web server featuring:

- A custom router for clean HTTP GET route handling
- Static file serving from nested directories
- Basic user data API endpoints
- An HTML landing page

It is designed for clarity, modularity, and easy extension, following a single-file, clean interface philosophy[8][11].

---

## ✨ Features

- 🚦 **Custom lightweight router** for HTTP GET routes  
- 🗂️ **Static file serving** (including images) from nested directories  
- 👤 **User API endpoints** (`/users`, `/user/:id`)  
- 🏠 **HTML landing page** (`index.html`)  
- 🛠️ **Easy local development** and extension

---

## 🗂️ Project Structure

| File/Folder       | Purpose                                                |
|-------------------|--------------------------------------------------------|
| `main.ts`         | Main server entrypoint, registers all routes           |
| `Router.ts`       | Custom Router class for HTTP routes                    |
| `StaticFile.ts`   | Utility for serving static files (optional)            |
| `index.html`      | Landing page served at `/`                             |
| `deno.json`       | Deno configuration and task definitions                |
| `log.json`        | Example log output                                     |

---

## 🚀 Getting Started

### Prerequisites

- [Deno](https://deno.com/) v1.0+ installed

### Run the Development Server

`deno run --watch --allow-net --allow-read --allow-write main.ts`

`Server runs on **port 8000**.`

---

## 📡 API Endpoints

| Method | Path                        | Description                              |
|--------|-----------------------------|------------------------------------------|
| GET    | `/`                         | Serves the landing page                  |
| GET    | `/users`                    | Returns all users as JSON                |
| GET    | `/user/:id`                 | Returns a single user by ID as JSON      |
| GET    | `/:main/:sub?/:filename`    | Serves static PNG files from folders     |

---

## 🛣️ Routing Logic

- All routing is managed by a custom `Router` class, supporting parameterized paths and method matching.
- Static files (PNG images) can be served from nested directories via dynamic routes.
- Example: `/images/avatar.png` or `/images/profile/avatar.png` will serve the corresponding PNG file.

---

## ⚙️ Configuration

**deno.json** defines tasks and imports:
```json
{
  "tasks": {
      "dev": "deno run --watch --allow-net --allow-read --allow-write main.ts"
  },
  "imports": {
      "@std/assert": "jsr:@std/assert@1"
  }
}
```

[deno.json][1]

---

## 📂 Source Files

### `main.ts`
```ts
// Import the custom Router class for handling HTTP routes
import {Router} from "./Router.ts";

// Import the User model for interacting with user data
import {User} from "./Models/Users.ts";

// Create an instance of the Router to register routes
const router = new Router()


// Register a GET route for the root path ('/')
// This serves the 'index.html' file as a readable stream
router.get('/',   async function () {
    const index = Deno.open('index.html');
    const readFile = (await index).readable
    return new Response(readFile);
})

// Register a GET route for '/users'
// This response with a JSON array of all users
router.get('/users',    async function () {
    const users = JSON.stringify(await User.all());
    return new Response(users, {
        headers : {
            'content-type' : 'application/json'
        }
    });
});

// Register a GET route for '/user/:id'
// This responds with a JSON object for a specific user by ID
router.get('/user/:id',async function (req) {
    const user = await User.findById(Number(req.params?.id))
    return  new Response( JSON.stringify(user) , {
        headers : {
            'content-type' : 'application/json'
        }
    });
})

// Register a GET route for serving static files from nested directories
// Supports optional subfolder and returns the file as a PNG image
router.get('/:main/:sub?/:filename', async function (req){
    const mainFolder = req.params?.main
    const subFolder = req.params?.sub;
    const filename = req.params?.filename
    let readFile;

    if (subFolder == null)
        readFile = await Deno.readFile(`${mainFolder}/${filename}`);
    else
        readFile = await Deno.readFile(`${mainFolder}/${subFolder}/${filename}`);

    return new Response(readFile, {
        headers: {
            'content-type': 'image/png',
        }
    })
})

// Example of how to serve static files using the StaticFile utility (currently commented out)
/*StaticFile.serve('/:main/:sub?/:filename')*/

// The main request handler that delegates all requests to the router
function handler(req : Request): Promise<Response> | Response {
    return router.route(req)
}

// Start the Deno HTTP server on port 8000 using the handler function
Deno.serve({port: 8000}, handler)
```
[main.ts][4]

---

### `Router.ts`

```ts
// Import the Routes type, which describes the structure of route definitions
import type {Routes} from "./types/Routes.ts";

// Import the Req type, representing the shape of the request object used by the router
import type { Req } from "./types/Req.ts";

// Define the Router class to handle route registration and request routing
export class Router {

    // Private array to store all registered routes
    private routes: Routes[] = []

    // Register a GET route with a path and its callback handler
    get(path: string, callback: (req: Req) => Promise<Response> | Response) {
        this.routes.push({method: "GET", path: path, callback:  callback});
    }

    // Main method to match incoming requests to registered routes and execute the appropriate callback
    route(req: Req): Response | Promise<Response> {
        // Parse the request URL for matching
        const requestUrl  = new URL(req.url);

        // Iterate through all registered routes
        for (const route of this.routes) {
            // Check if HTTP method matches (e.g., GET)
            if(req.method === route.method) {
                // Create a URLPattern for the route's path
                const url =  new URLPattern({pathname: route.path})

                // Test if the request URL matches the route pattern
                if(url.test(requestUrl)) {
                    // Extract URL parameters if there are any
                    const matches = url.exec(requestUrl);

                    if(matches !== null){
                        req.params = matches.pathname.groups;
                    }

                    // If the route pattern includes a search (query) part, assign search params
                    if(url.search !== '') {
                        req.searchParams = requestUrl.searchParams;
                    }

                    // Call the registered route handler with the request object
                    return route.callback(req)
                }
            }
            // If the method does not match, return a 405 Method Not Allowed response
            else {
                return new Response('Method Not Allowed', {status: 405})
            }
        }

        // If no route matches, return a 404 Not Found response
        return new Response('Not found', {status : 404})
    }

}
```
[Router.ts][5]

---
### `log.json` (sample)
```ts
"logs":{
  [
    {
      "pathname": "/",
      "timestamp": "2025-06-26T00:04:29.685Z"
    },
    {
      "pathname": "/",
      "timestamp": "2025-06-26T00:06:01.874Z"
    }
  ]
}
```
[log.json][3]

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.  
For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

---

## 🙏 Credits

Built with [Deno](https://deno.com/).  
Landing page:  
> Welcome To Deno App

<sub>_This README is styled for clarity and visual appeal, following best practices for GitHub READMEs._</sub>

<!--
[1]: deno.json
[2]: index.html
[3]: log.json
[4]: main.ts
[5]: Router.ts
[6]: StaticFile.ts
-->

