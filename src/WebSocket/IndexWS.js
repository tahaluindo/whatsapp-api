import React, { useState, useEffect } from "react";

// const URL = 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';
const URL = 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';

const IndexWS = () => {
    const [user, setUser] = useState('Dipu');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(new WebSocket(URL));

    const submitMessage = (usr, msg) => {
        const message = { user: usr, message: msg };
        ws.send(JSON.stringify(message));
        setMessages([message, ...messages]);
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected');
        }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            setMessages([message, ...messages]);
        }

        return () => {
            ws.onclose = () => {
                console.log('WebSocket Disconnected');
                setWs(new WebSocket(URL));
            }
        }
    }, [ws.onmessage, ws.onopen, ws.onclose, messages]);

    return (
        <div>
            <div>

                <label htmlFor="user">
                    Enter Your Name :
                    <input
                        className="border border-black"
                        type="text"
                        id="user"
                        placeholder="User"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                </label>
            </div>

            <ul>
                {messages.map((message, index) =>
                    <li key={index}>
                        <b>{message.user}</b>: <em>{message.message}</em>
                    </li>
                )}
            </ul>

            <div className="mt-10">

                <form
                    action=""
                    onSubmit={e => {
                        e.preventDefault();
                        submitMessage(user, message);
                        setMessage([]);
                    }}
                >
                    <input
                        type="text"
                        className="border border-black"
                        placeholder={'Type a message ...'}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <input className="border bg-green-500 rounded-md px-3 py-1" type="submit" value={'Send'} />
                </form>
            </div>

        </div>
    )
}

export default IndexWS;