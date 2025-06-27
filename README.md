<div align="center"> <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_dark.svg"> <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_light.svg"> <img alt="Deno App Logo" src="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_light.svg" width="120"> </picture> <h1>Deno App</h1> <p><b>A simple, extensible Deno-powered web server with custom routing and static file support.</b></p> <p> <a href="https://deno.com/"><img alt="Deno" src="https://img.shields.io/badge/deno-%5E1.0.0-black?logo=deno&logoColor=white"></a> <a href="#"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a> <a href="#"><img alt="Status: Active" src="https://img.shields.io/badge/status-active-brightgreen"></a> </p> </div><div align="center"> <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_dark.svg"> <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_light.svg"> <img alt="Deno App Logo" src="https://raw.githubusercontent.com/denoland/deno_logo2/main/deno_light.svg" width="120"> </picture> <h1>Deno App</h1> <p><b>A simple, extensible Deno-powered web server with custom routing and static file support.</b></p> <p> <a href="https://deno.com/"><img alt="Deno" src="https://img.shields.io/badge/deno-%5E1.0.0-black?logo=deno&logoColor=white"></a> <a href="#"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a> <a href="#"><img alt="Status: Active" src="https://img.shields.io/badge/status-active-brightgreen"></a> </p> </div>

📋 Table of Contents
Features

Project Structure

Getting Started

API Endpoints

Routing Logic

Configuration

Screenshots

Contributing

License

Credits

✨ Features
🚦 Custom lightweight router for HTTP GET routes

🗂️ Static file serving (including images) from nested directories

👤 User API endpoints (/users, /user/:id)

🏠 HTML landing page (index.html)

🛠️ Easy local development and extension

🗂️ Project Structure
File/Folder	Purpose
main.ts	Main server entrypoint, route registration
Router.ts	Custom Router class for HTTP routes
StaticFile.ts	Utility for serving static files (optional)
index.html	Landing page served at /
Models/Users.ts	User model (referenced in code)
deno.json	Deno configuration and task definitions
log.json	Example log output
🚀 Getting Started
Prerequisites
Deno v1.0+ installed

Run the Development Server
text
deno task dev
or directly:

text
deno run --watch --allow-net --allow-read --allow-write main.ts
Server runs on port 8000.

📡 API Endpoints
Method	Path	Description
GET	/	Serves the landing page
GET	/users	Returns all users as JSON
GET	/user/:id	Returns a single user by ID as JSON
GET	/:main/:sub?/:filename	Serves static PNG files from folders
🛣️ Routing Logic
All routing is managed by a custom Router class, supporting parameterized paths and method matching.

Static files (PNG images) can be served from nested directories via dynamic routes.

Example: /images/avatar.png or /images/profile/avatar.png will serve the corresponding PNG file.

⚙️ Configuration
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
View deno.json for details

🖼️ Screenshots
Landing page preview:

![Landing Page](https://raw.githubusercontent.com/denoland/deno_logo2/main 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.
For major changes, open an issue first to discuss what you would like to change.

📄 License
MIT

🙏 Credits
Built with Deno.
Landing page:

Welcome To Deno App2

<sub>This README is styled for clarity and visual appeal, following [best practices for GitHub READMEs].</sub>

Tips for further styling:

Replace the logo URL and screenshot with your own assets if available.

Add more badges (e.g., build status, code coverage) as needed.

For advanced styling, use HTML blocks sparingly for centering or responsive images, as shown above.

GitHub Flavored Markdown supports only limited inline CSS and HTML, but the above layout ensures compatibility and readability across devices.
