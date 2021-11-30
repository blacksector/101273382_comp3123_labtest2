import React from 'react'
import UserItem from './UserItem'

function UserChatList({ users, setSelectedChat }) {
    return (
        <div 
            className={`container bg-white`} 
            style={{
                minHeight: '90vh',
                paddingTop: '3vh',
                borderRadius: '25px'
            }}>
            <div className={`row`}>
                <div className={`col-12`}>
                    <p className={`lead text-center`}>Users List</p>
                    <hr style={{color: '#757779'}}/>
                    {users && users.map((user, index) => {
                        return (<div key={index} >
                            <UserItem user={user} setSelectedChat={setSelectedChat}/>
                            {index === users.length ? '' : <hr style={{color: '#B4B3BA'}} />}
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserChatList
