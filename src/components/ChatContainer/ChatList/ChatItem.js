import React from 'react'
import { Image } from 'react-bootstrap'

function ChatItem({ user, setSelectedChat }) {
    return (
        <div 
            className={`container-fluid`} 
            onClick={() => {
                setSelectedChat(user)
            }}
            style={{
                cursor: 'pointer',
                // margin: 5
            }}
        >
            <div className={`row d-flex justify-content-center align-items-center`}>
                <div className={`col-4 text-end`}>
                    <Image 
                        style={{width: 50, height: 50}}
                        src={user.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} 
                        roundedCircle />
                </div>
                <div className={`col-8 g-0`}>
                    {user.displayName}
                </div>
            </div>
        </div>
    )
}

export default ChatItem
