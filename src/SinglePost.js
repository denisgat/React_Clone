import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function SinglePost(props) {
    const postId = parseInt(window.location.pathname.split('/')[2])
    // console.log(postId)
    const thepost = props.posts.filter(item => item.id === postId).map((item, index) => {
        return (
            <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
                <div className='row' style={{ minHeight: '50vh' }} >
                    <div className="bg-light col-1 pt-3">
                        <FontAwesomeIcon icon={faArrowUp} />
                        <br></br>
                        <p className='mb-1'>49k</p>
                        <FontAwesomeIcon className='mb-3' icon={faArrowDown} />
                        <br></br>
                    </div>
                    <div className='pl-5 col-10'>
                        <div className='row mt-1'>
                            <Link to={'/subreddit/' + item.subreddit.subredditname}><h6 className='ml-2'>r/{item.subreddit.subredditname}</h6></Link>
                            <h6 className='ml-5 text-muted'>posted by <Link to={'/user/' + item.user.id}>u/{item.user.name}</Link></h6>
                        </div>
                        <div className='p-3  row'>
                            <h6>{item.title}</h6>
                        </div>
                        <div className='pl-3 text-left row'>
                            <h6>{item.body} </h6>
                        </div>
                        <hr></hr>
                        <div className='pl-3 row text-muted position-bottom'>
                            <FontAwesomeIcon className='ml-1' icon={faCommentAlt} /><span className='ml-1'>Comments</span>
                        </div>
                        <hr></hr>
                        <h1> Comments section </h1>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className='pt-4' style={{ height: '100vh', backgroundColor: ' #e1e1ea' }}>
            <span className=''>
                {thepost}
            </span>
        </div>
    )

}

export default SinglePost