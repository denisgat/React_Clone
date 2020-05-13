import React from 'react';


// function Postss(props){
//     props.posts.map((item,index) => {
//             return(
//                 <div key={index} className='container bg-dark text-white'>
//                     <h1>{item.subreddit.subredditname}</h1>
//                     <br></br>
//                     <h1>{item.user.name}</h1>
//                     <h1>{item.title}</h1>
//                     <br></br>
//                     <h1>{item.body}</h1>
//                 </div>
//             )
//         })
// }

function Posts(props) {
    console.log(props.posts)

    const postss = props.posts.map((item, index) => {
        return (
            <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
                <div className='row'>
                    <div className="bg-light col-1 pt-3">
                        <p>up</p>
                        <br></br>
                        <p>down</p>
                    </div>
                    <div className='col-10'>
                        <div className='row mt-1'>
                            <h6 className='ml-2'>{item.subreddit.subredditname}</h6>
                            <h6 className='ml-5 text-muted'>posted by {item.user.name}</h6>
                        </div>
                        <div className='row'>
                            <h6>{item.title}</h6>
                        </div>
                        <div className='row text-muted'>
                            <span>Comments</span>
                            <span>Share</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    })

    if (props.isLoggedIn) {
        if (props.showposts === 'allposts') {
            return (
                <div>
                    {postss}
                </div>
            )

        }
        else {
            return (
                <h1>Sub Posts</h1>
            )
        }
    }
    else {
        return (
            <div>
                {postss}
            </div>
        )
    }

}

export default Posts
