Deno App
A simple Deno-powered web server that demonstrates custom routing, static file serving, and basic user data handling.

Features

Custom lightweight router for HTTP GET routes

Serves static files (including images) from nested directories

Basic user API endpoints (/users, /user/:id)

Serves an HTML landing page (index.html)

Designed for easy extension and local development

Project Structure
File/Folder	Purpose
main.ts	Main server entrypoint, route registration
Router.ts	Custom Router class for handling HTTP routes
StaticFile.ts	Utility for serving static files (currently not enabled)
index.html	Landing page served at /
Models/Users.ts	User model (not included here, but referenced in code)
deno.json	Deno configuration and task definitions
log.json	Example log output (not required for operation)
Getting Started
Prerequisites

Deno installed (v1.0+)

Run the Development Server

text
deno task dev
or directly:

text
deno run --watch --allow-net --allow-read --allow-write main.ts
This starts the server on port 8000.

API Endpoints
Method	Path	Description
GET	/	Serves the landing page
GET	/users	Returns all users as JSON
GET	/user/:id	Returns a single user by ID as JSON
GET	/:main/:sub?/:filename	Serves static PNG files from folders
Routing Logic
All routing is managed by a custom Router class, supporting parameterized paths and method matching.

Static files (PNG images) can be served from nested directories via dynamic routes.

Example: /images/avatar.png or /images/profile/avatar.png will serve the corresponding PNG file.

Configuration
deno.json defines tasks and imports:

json
{
  "tasks": {
    "dev": "deno run --watch --allow-net --allow-read --allow-write main.ts"
  },
  "imports": {
    "@std/assert": "jsr:@std/assert@1"
  }
}
Notes
The StaticFile utility is included but not enabled by default; static serving is handled directly in main.ts.

User data handling assumes a User model with all() and findById() methods.

All responses for static images are served with content-type: image/png.

Logs (see log.json) are for reference and not required for operation.

License
MIT (or specify your preferred license)

Credits
Built with Deno.

Feel free to copy this README.md file to your repository!
