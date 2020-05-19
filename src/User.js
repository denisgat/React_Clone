import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function User(props) {
    const userId = parseInt(window.location.pathname.split('/')[2])
    // console.log(userId)
    const username = props.posts.filter(item => item.user_id === userId)[0].user.name
    const userposts =props.posts.filter(item => item.user_id === userId).map((item, index) => {
        return (
            <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
                <div className='row ' style={{ minheight: '35vh' }} >
                    <div className="bg-light col-1 pt-3">
                        <FontAwesomeIcon icon={faArrowUp} />
                        <br></br>
                        <p className='mb-1'>49k</p>
                        <FontAwesomeIcon className='mb-3' icon={faArrowDown} />
                        <br></br>
                    </div>
                    <div className='col-10'>
                        <div className='row mt-1'>
                            <Link to={'/subreddit/' + item.subreddit.subredditname}><h6 className='ml-2'>r/{item.subreddit.subredditname}</h6></Link>
                            <h6 className='ml-5 text-muted'>posted by <Link to={'/user/' + item.user.id}>u/{item.user.name}</Link></h6>
                        </div>
                        <div className='row'>
                            <Link to={'/post/' + item.id}><h6>{item.title}</h6></Link>
                        </div>
                        <div className='row text-muted position-bottom'>
                            <Link to={'/post/' + item.id}><FontAwesomeIcon className='ml-1' icon={faCommentAlt} /><span className='ml-1'>Comments</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>
            <h1>Posts by {username}</h1>
            {userposts}
        </div>
    )

}

export default User