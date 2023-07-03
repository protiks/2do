import app_v2 from './app_v2';
import process from 'process';

const PORT = process.env.PORT || 5004;

app_v2.listen(PORT, () => {
	console.log('\x1b[33m%s\x1b[0m', `[INFO] Server is running on port ${PORT}`); // Yellow color for console log
});