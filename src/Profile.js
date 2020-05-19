import React from 'react';

function Profile(props) {
    return (
        <div className='container'>
            <h1>This is you profile {props.user.name}</h1>
            <ul>
                <li>Settings</li>
                <li>Change Password</li>
                <li>Change User Name</li>
                <li>Background Pic</li>
            </ul>
        </div>
    )
}

export default Profile