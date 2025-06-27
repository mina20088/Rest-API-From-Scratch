// Import the IUser interface to ensure user objects have the correct structure
import {IUser} from "../types/IUser.ts";

// User class provides static methods for accessing user data
export class User {

    // Retrieve all users from the JSON data file
    public static async all(): Promise<IUser[]> {
        // Read the users.json file and parse its content as an array of IUser objects
        return JSON.parse(await Deno.readTextFile('data/users.json'));
    }

    // Find a single user by their numeric ID
    public static async findById(id: number) {
        // Get the full list of users
        const users = await User.all();

        // Search for a user whose id matches the provided id
        // Return the found user object, or undefined if not found
        return users.find((user: IUser) => user.id === Number(id));
    }

}