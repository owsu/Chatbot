import { useState, useEffect, useRef } from 'react'
import Message from './components/Message'
import './App.css'

function App() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = async() => {
        if (!input.item()) return // If the user just send nothing

        const userMessage = {role: "user", content: input}
        sendMessage(prev => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: input})
            })

            const data = await response.json()
            setMessages(prev => [...prev, {role: "assistant", content: data.reply}])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const onKeyPress = (e) => {
        if (e.key === "Enter") sendMessage()
    }

    return (
        <div className="chat-container">
            <div className="chat-header">Direct Supply Assistant</div>
            <div className="message-area">
                {messages.map((msg, index) => (
                    <Message key={index} role={msg.role} content={msg.content}/>
                ))}
                {loading && <div className="loading">Typing...</div>}
                <div ref={bottomRef}></div>
            </div>
            <div className="input-area">
                <input 
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyPress}
                    placeholder="Send a message..."
                />
                <button onClick={sendMessage}>Send</button>

            </div>

        </div>
    )
}

export default App