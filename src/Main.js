import React from 'react';
import Login from './Login';
import Register from './Register';
import Posts from './Posts';




function Main(props) {
    if (props.route === '/home') {
        if (props.isLoggedIn) {
            return (
                <div className='' style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                    <h1>Welcome {props.user.name}</h1>
                    <br></br>
                    <div className='row'>
                        <div className='col-6'>
                            <button onClick={props.handleAllPosts} className='btn btn-primary btn-lg'>All Posts</button>
                        </div>
                        <div className='col-6'>
                            <button onClick={props.handleSubscribedPosts} className='btn btn-primary btn-lg'>Subscribed Posts</button>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='container'>
                            <Posts posts={props.posts} showposts={props.showposts} route={props.route} isLoggedIn={props.isLoggedIn} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='' style={{ height: '100vh', backgroundColor: ' #f0f0f5' }}>
                    <br></br>
                    <div className='container'>
                        <Posts posts={props.posts} showposts={props.showposts} route={props.route} isLoggedIn={props.isLoggedIn} />
                    </div>
                </div>
            )
        }
    }

    else if (props.route === '/login') {
        return (
            <div className='bg-light' style={{ height: '100vh' }}>
                <Login handleLogging={props.handleLogging} setBearToken={props.setBearToken} />
            </div>
        )
    }

    else if (props.route === '/register') {
        return (
            <div className='bg-light' style={{ height: '100vh' }}>
                <Register handleLogging={props.handleLogging} setBearToken={props.setBearToken} />
            </div>
        )
    }

}

export default Main