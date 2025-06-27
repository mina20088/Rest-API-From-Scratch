
// Define a custom request interface that extends the standard Fetch API Request
export interface Req extends Request {
    // Optional: An object containing route parameters extracted from the URL (e.g., { id: "123" })
    params?: Record<string, string | undefined>;

    // Optional: The URLSearchParams object representing query parameters from the URL (e.g., ?page=2)
    searchParams?: URLSearchParams;
}