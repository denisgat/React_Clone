import React from 'react'
import Posts from './Posts';
import SubDropDown from './SubDropDown'

function Home(props) {
    if (props.isLoggedIn) {
        return (
            <div className='' style={{minHeight: '100vh', height: '100vh', backgroundColor: ' #e1e1ea' }}>
                <h1>Welcome {props.user.name}</h1>
                <br></br>
                <div className='container'>
                    <div className='mx-auto row'>
                        {props.showposts === 'allposts' ?
                            <div className='col-12'>
                                <button onClick={props.handleSubscribedPosts} className='btn btn-primary'> See Subscribed Posts</button>
                            </div>
                            :
                            <div className='col-12'>
                                <button onClick={props.handleAllPosts} className='btn btn-primary'>See All Posts</button>
                            </div>
                        }
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div className='container'>
                    <Posts posts={props.posts} showposts={props.showposts} route={props.route} isLoggedIn={props.isLoggedIn} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='' style={{ minHeight: '100vh', height: '100%', backgroundColor: ' #e1e1ea' }}>
                <br></br>
                <div className='container'>
                    <SubDropDown subreddits={props.subreddits} posts={props.posts} />
                    <Posts posts={props.posts} showposts={props.showposts} route={props.route} isLoggedIn={props.isLoggedIn} />
                </div>
            </div>
        )
    }
}


export default Home