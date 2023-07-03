import app from './app';
import process from 'process';

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
	console.log('\x1b[33m%s\x1b[0m', `[INFO] Server is running on port ${PORT}`); // Yellow color for console log
});