// Define the structure for a User object
export interface IUser {
    // Unique numeric identifier for the user
    id: number;

    // User's first name
    first_name: string;

    // User's last name
    last_name: string;

    // User's email address
    email: string;

    // Country where the user resides
    country: string;

    // City where the user resides
    city: string;
}