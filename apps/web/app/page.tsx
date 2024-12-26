'use client'

import React from 'react'
import classes from './page.module.css'
import {useSocket} from '../context/ContextProvider'

export default function Page() {
  const {sendMessage,messages} = useSocket();
  const[message,setMessage] = React.useState(''); 
   



    return (
        <div>
             

             <div>
                  <input
                  onChange={(e) => setMessage(e.target.value)}
                  type="text" className={classes['chat-input']} placeholder="Type a message"/>
                  <button
                  onClick={(e) => sendMessage(message)}
                   className={classes['button']}>Send</button>
             </div>
                <div>
                    {messages.map((msg,index) => (
                        <li key={index}>{msg}</li>
                    ))}
                
                </div>
        </div>
    )
}