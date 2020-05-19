import React from 'react';
import {Link} from 'react-router-dom';
/* <Link  to={'/subreddit' + '/' + item.subredditname}>{item.subredditname}</Link> */

function SubDropDown(props) {
    // console.log(props.subreddits)
    const subreddits = props.subreddits.map((item, index) => {
        return (
            <li className='ml-2' key={index}><a href={'/subreddit/' + item.subredditname}>{item.subredditname}</a></li>
            )
    })

    return (
        <div className="dropdown">
            <button className="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">Subreddits
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
                <li className='ml-2'><Link to={'/subreddit/create'}>Create a Subreddit</Link></li>
                {subreddits}
            </ul>
        </div>
    )
}

export default SubDropDown