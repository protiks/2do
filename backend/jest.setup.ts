import app from './app';
const PORT = 5005;

// Start the server on the specified port
const server = app.listen(PORT, () => {
	console.log(`Test server is running on port ${PORT}`);
});

// Export the server instance to be used in the tests
export default server;