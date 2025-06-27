import { exists } from "jsr:@std/fs/exists";

/**
 * Represents a collection of log entries
 */
interface Logs {
    logs: object[];
}

/**
 * Represents a single log entry
 */
interface Log {
    /** URL path being logged */
    pathname: string;
    /** ISO timestamp of the event */
    timestamp: string;
}

/**
 * Handles log file creation, reading, and writing operations
 *
 * Maintains an in-memory collection of logs and synchronizes
 * with persistent storage in JSON format
 */
export class Logger {
    /** In-memory store for log entries */
    private static readonly logs: Logs = {
        logs: [],
    }

    /**
     * Creates a new log file if it doesn't exist
     * @param fileName Path to the log file
     * @returns Promise resolving when file is created/initialized
     * @throws If file creation fails
     */
    async CreatLogFile(fileName: string) {
        if(!await exists(fileName)) {
            await Deno.create(fileName);
            return await Deno.writeTextFile(fileName, JSON.stringify(Logger.logs, null, 2));
        }
    }

    /**
     * Reads and parses log file contents
     * @param fileName Path to the log file
     * @returns Parsed JSON content of the log file
     * @throws If file doesn't exist
     */
    async ReadLogFile(fileName: string) {
        if(await exists(fileName)) {
            const readFile = await Deno.readTextFile(fileName);
            return JSON.parse(readFile);
        } else {
            throw new Error(`${fileName} not found`);
        }
    }

    /**
     * Appends a new log entry and updates the log file
     * @param fileName Path to the log file
     * @param content Log entry to add
     * @returns Promise resolving when file is updated
     */
    async writeLogFile(fileName: string, content: Log): Promise<void> {

        if(await exists(fileName)) {

            Logger.logs.logs.push(content);

            return await Deno.writeTextFile(fileName, JSON.stringify(Logger.logs, null, 2));

        }

    }
}