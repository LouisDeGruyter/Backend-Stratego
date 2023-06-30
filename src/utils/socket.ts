import { Server,Socket } from "socket.io";
import { getLogger } from "../core/logging";


const EVENTS = {
    connection: 'connection',
    disconnect: 'disconnect',
    message: 'message',
    error: 'error',
    receive_message: 'receive_message',
};


function socket({io}: {io: Server}) {
    const logger = getLogger();
    io.on(EVENTS.connection, (socket:Socket) => {
        logger.info(`User connected: ${socket.id}`);

        socket.on(EVENTS.message, (data) => {
            logger.info(`${socket.id} sent message: ${data.message}`);
            data.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            data.sender=socket.id;

            socket.broadcast.emit(EVENTS.receive_message, data);
        }
        );

        socket.on(EVENTS.disconnect, () => {
            logger.info(`User disconnected: ${socket.id}`);
        }
        );

        socket.on(EVENTS.error, (err) => {
            logger.error(err);
        }
        );


    });

}

export default socket;