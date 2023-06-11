const createServer = require('./createServer');

async function main() {
    try {
        const server = await createServer();
        await server.start();

        async function onClose() {
            await server.stop();
            process.exit(0);
        }

        process.on('SIGTERM', onClose);
        process.on('SIGQUIT', onClose);
    } catch (error) {
        process.exit(-1);
    }
}
main();




// // Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Start server
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Handle a socket connection request from web client



