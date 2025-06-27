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