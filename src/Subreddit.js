import React from 'react';
import SubDropDown from './SubDropDown';
import Posts from './Posts';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');


class Subreddit extends React.Component {
    constructor(props) {
        super(props)

        // const history = useHistory()

        this.state = {
            posts: [],
            subposts: this.props.subreddits,
            subname: window.location.pathname.split('/')[2]
        }



    }

    async componentDidMount() {
        const sub_id = this.props.subreddits.filter(item => (item.subredditname == this.state.subname))

        let subredditIdCall = await axios.get('http://127.0.0.1:8000/api/subreddits/' + sub_id[0].id)
            .then(response => {
                
                return response.data.data.posts
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

            this.setState ({
                posts: subredditIdCall
            })
            const subposts = this.props.posts.filter(item => (item.subreddit.subredditname == this.state.subname))

            
        console.log(subposts)

    }

    render() {
        if (this.state.posts.length > 0) {
            console.log(this.state.posts)
            const posts = this.state.posts.map((item, index) => {
                return (
                    <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
                        <div className='row ' style={{ minheight: '35vh' }}>
                            <div className="bg-light col-1 pt-3">
                                <FontAwesomeIcon icon={faArrowUp} />
                                <br></br>
                                <p className='mb-1'>49k</p>
                                <FontAwesomeIcon className='mb-3' icon={faArrowDown} />
                                <br></br>
                            </div>
                            <div className='col-10'>
                                <div className='row mt-1'>
                                    <Link to={'/subreddit' + '/' + item.subreddit_id}><h6 className='ml-2'>r/{item.subreddit_id}</h6></Link>
                                    <h6 className='ml-5 text-muted'>posted by <Link to={'/user' + '/' + item.user_id}>u/{item.user_id}</Link></h6>
                                </div>
                                <div className='row'>
                                    <Link to={'/post' + '/' + item.id}><h6>{item.title}</h6></Link>
                                </div>
                                <div className='row text-muted position-bottom'>
                                    <Link to={'/post' + '/' + item.id}><FontAwesomeIcon className='ml-1' icon={faCommentAlt} /><span className='ml-1'>Comments</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })

            return (
                <div className='' style={{ height: '100vh', backgroundColor: ' #e1e1ea'}}>
                    <SubDropDown subreddits={this.props.subreddits} posts={this.props.posts} />
                    <h1>{this.state.subname} Subreddit</h1>
                    {posts}
                </div>
            )
        }

        else {
            console.log(this.state.posts)
            return (
                <h6>In progress</h6>
            )
        }

    }
}


// function Postsss(props){
//     const posts = props.posts.map((item, index) => {
//         return (
//             <div key={index} className='mt-3 border-dark rounded container bg-white text-dark'>
//                 <div className='row ' style={{minheight: '35vh'}}>
//                     <div className="bg-light col-1 pt-3">
//                         <FontAwesomeIcon icon={faArrowUp}/>
//                         <br></br>
//                         <p className='mb-1'>49k</p>
//                         <FontAwesomeIcon className='mb-3' icon={faArrowDown}/>
//                         <br></br>
//                     </div>
//                     <div className='col-10'>
//                         <div className='row mt-1'>
//                             <Link to={'/subreddit' + '/' + item.subreddit.subredditname}><h6 className='ml-2'>r/{item.subreddit.subredditname}</h6></Link>
//                             <h6 className='ml-5 text-muted'>posted by <Link to={'/user' + '/' + item.user.id}>u/{item.user.name}</Link></h6>
//                         </div>
//                         <div className='row'>
//                             <Link to={'/post' + '/' + item.id}><h6>{item.title}</h6></Link>
//                         </div>
//                         <div className='row text-muted position-bottom'>
//                             <Link to={'/post' + '/' + item.id}><FontAwesomeIcon className='ml-1' icon={faCommentAlt}/><span className='ml-1'>Comments</span></Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         )
//     })
// }


export default Subreddit

