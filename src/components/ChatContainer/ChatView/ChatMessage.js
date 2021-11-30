import React from 'react'

function ChatMessage({ userId, message }) {
    const isSender = userId === message.uid;
    return (
        <div className="container">
            <div className={`row ${isSender ? 'd-flex justify-content-end' : ''}`}>
                <div className={`col-auto  message ${isSender ? 'message-right' : 'message-left'}`}>
                    {message.text}
                </div>
                <div className={`col-12 small text-muted ${isSender ? 'text-end' : ''}`}>
                    Sent at {message?.createdAt?.toDate()?.toDateString()}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
