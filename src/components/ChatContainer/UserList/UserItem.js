import React from 'react'
import { Image } from 'react-bootstrap'

function UserItem({ user, setSelectedChat }) {
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
            <div className={`row`}>
                <div className={`col-4 text-end`}>
                    <Image 
                        style={{width: 50, height: 50}}
                        src={user.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} 
                        roundedCircle />
                </div>
                <div className={`col-8 g-0 d-flex justify-content-center align-items-center`}>
                    {user.displayName}
                </div>
            </div>
        </div>
    )
}

export default UserItem
