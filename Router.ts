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