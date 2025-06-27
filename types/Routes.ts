// Import the Req type, representing the custom request object used in route handlers
import type {Req} from "./Req.ts";

// Define the structure for a single route in the router
export interface Routes {
    // The URL path pattern for the route (e.g., "/users/:id")
    path: string;

    // The HTTP method for the route (e.g., "GET", "POST")
    method: string;

    // The callback function to handle requests matching this route
    // Receives a Req object and returns a Response or a Promise of Response
    callback: (req: Req) => Promise<Response> | Response;
}
