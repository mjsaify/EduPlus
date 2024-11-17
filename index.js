import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./constant.js";


; (async () => {

    try {
        // connect to database
        await connectDB();

        // server
        const server = app.listen(PORT, () => {
            console.log("Server is up and running on port", PORT);
        });

        // unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error("Unhandled Rejection Occured! Shutting down...");
            console.error(err.message);

            // shutdown server
            server.close(() => {
                process.exit(1);
            });
        });

        // server runtime error
        server.on('error', (err) => {
            console.log("Server encountered an error after starting:", err);
            process.exit(1);
        })

    } catch (error) {
        console.log("Server startup failed due to:", error);
        process.exit(1);
    }
})();