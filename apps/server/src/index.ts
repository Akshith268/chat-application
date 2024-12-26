import http from 'http';
import SocketService from './services/socket';

async function init() {
    const socketService = new SocketService();
    const httpServer = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    }
    );
    socketService.io.attach(httpServer);
    const PORT = process.env.PORT? process.env.PORT:8000;
    socketService.initListeners();
    httpServer.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

}


init();