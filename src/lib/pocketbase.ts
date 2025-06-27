import PocketBase from 'pocketbase';

// Create a PocketBase client instance
export const pb = new PocketBase(import.meta.env.POCKETBASE_URL);

// Export the client for use in other files
export default pb; 