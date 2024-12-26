'use client'

import React, { createContext, useCallback, useEffect, useState } from 'react'
import {io,Socket} from 'socket.io-client';
   

interface ContextProps {
    children?: React.ReactNode; 
}

interface Isocketcontext{
    sendMessage: (message: string) => any;
    messages: string[];
}
 const SocketContext = React.createContext<Isocketcontext|null>(null);
  
  
 
 export const useSocket = () => {
    const state= React.useContext(SocketContext);
    if(!state){
        throw new Error('useSocket must be used within SocketProvider');
    }
    return state;
}


 export const  SocketProvider :React.FC<ContextProps> = ({children}) => {
    const [socket, setSocket] = useState<Socket|null>(null);

    const [messages, setMessages] = useState<string[]>([]);


    const sendMessage: Isocketcontext['sendMessage'] = useCallback((msg)=> { 
        console.log('message from front-end',msg);
        if(socket){
           socket.emit('event:message',{message:msg});
        }
    },[socket]);


    const onMessagereceived = useCallback((msg: { message: string }) => {
        console.log('Message received from server:', msg);
        setMessages((prev) => [...prev, msg.message]); // Safely access msg.message
    }, []);

    useEffect(() => {
        const socket = io('http://localhost:8000');  
        socket.on('message',onMessagereceived);
        setSocket(socket);
         
        return () => {
            socket.disconnect();
            socket.off('message',onMessagereceived);
            setSocket(null);
        }
    },[]);
     
   console.log('messages',messages);
    return (
        <SocketContext.Provider value={{sendMessage,messages}}>
            {children}
        </SocketContext.Provider>
    )
}

