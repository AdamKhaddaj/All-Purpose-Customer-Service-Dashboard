// Configuration for the application
// Reads from environment variables with fallback defaults

const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    testMode: import.meta.env.VITE_TEST_MODE === 'true',
};

export default config;
