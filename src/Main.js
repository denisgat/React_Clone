import React from 'react';
import Login from './Login';
import Register from './Register'


function Main(props) {
    if (props.route === '/home') {
        return (
            <div className='bg-light' style={{ height: '100vh' }}>
                <h1>Main</h1>
            </div>
        )
    }

    else if (props.route === '/login') {
        return (
            <div className='bg-light' style={{ height: '100vh' }}>
                <Login/>
            </div>
        )
    }

    else if (props.route === '/register') {
        return (
            <div className='bg-light' style={{ height: '100vh' }}>
                <Register/>
            </div>
        )
    }
    
}

export default Main