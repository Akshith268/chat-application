import {Server} from 'socket.io';

import Redis from 'ioredis';

const pub=new Redis({
    host: 'caching-366cbf6b-akshith268-7e10.d.aivencloud.com',
    port: 26296,
    username:'default',
    password:'AVNS_TvtCOXrtSiOf_F99LFR'
});
const sub=new Redis({
    host: 'caching-366cbf6b-akshith268-7e10.d.aivencloud.com',
    port: 26296,
    username:'default',
    password:'AVNS_TvtCOXrtSiOf_F99LFR'
});

class SocketService{
    private _io: Server;
    
    constructor(){
        console.log('Init socket service');
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            }
        });
        sub.subscribe('MESSAGE');
    }

    public initListeners(){
        console.log('initListeners');
        this._io.on('connection',(socket) => {
            console.log('New connection of socket',socket.id);
            socket.on('event:message', async (data) => {
                console.log('message received on backend',data);
                this._io.emit('message', data);
                await pub.publish('MESSAGE', JSON.stringify(data));
            });   
        });
        sub.on('message', (channel, message) => {
            if(channel === 'MESSAGE'){
                console.log('message received on redis',message);
                this._io.emit('message', JSON.parse(message));
            }
        }
        );
    }

    get io(){
        return this._io;
    }
}

export default SocketService;