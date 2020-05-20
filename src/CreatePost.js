import React from 'react';
import Login from './Login';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class CreatePost extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subreddit: {subredditname: ''},
            user_id: '',
            title: '',
            body: '',
            img: '',
            token: '',

        }

        this.handleTitle = this.handleTitle.bind(this);
        this.handleBody = this.handleBody.bind(this);
        // this.handleImg = this.handleImg.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSub = this.handleSub.bind(this);
        // this.handleSubuser = this.handleSubUser.bind(this);
    }

    handleSub(event) {
        // var subid = parseInt(event.target.value)
    
        var subname = event.target.options[event.target.selectedIndex].text
        const subreddit = this.props.subreddits.find(item => item.subredditname===subname)
        // console.log(subname, subreddit)
        // console.log(this.props.subreddits, subreddit, subid)
   
        this.setState({
            subreddit: subreddit,
        })
    }


    handleTitle(event) {
        this.setState({
            title: event.target.value,
        })
    }

    handleBody(event) {
        this.setState({
            body: event.target.value,
        })
    }

    // handleImg(event) {
    //     this.setState({
    //         img: event.target.value,
    //     })
    // }

    async handleSubmit(event) {
        event.preventDefault();
        // console.log(this.props.subreddits.filter(item => item.subredditname === this.state.subreddit_name)[0].id)

    

        // console.log(sub_id)


        // console.log(this.state)


        const data = {
            title: this.state.title,
            body: this.state.body,
            user_id: this.props.user.id,
            subreddit_id: this.state.subreddit.id
            // img: this.state.img
        }
        // console.log(data)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.props.token
            }
        }


        await axios.post('http://127.0.0.1:8000/api/post/create', data, config)
            .then(response => {
                // console.log(response.data.data);
                // return response.data
                this.props.setPosts(response.data.data);
                this.props.history.push('/subreddit/' + this.state.subreddit.subredditname)
            })
            .catch(function (error) {
                console.log(error);
            })

        // console.log(result)

        // console.log(this.state)

    }



    render() {
        // console.log(this.props)
        const subreddits = this.props.subreddits.map((item, index) => {
            return (
                <option key={index} value={item.subredditname}>{item.subredditname}</option>
            )
        })

        if (this.props.isLoggedIn) {
            return (
                <div className='' style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                    <div className='container px-5' >
                        <h1 className='p-3'>Creating Post</h1>
                        <form onSubmit={this.handleSubmit} className='mt-5'>
                            <label>SubReddit</label>
                            <select onChange={this.handleSub} value={this.state.subreddit.subredditname} className="form-control" id="exampleFormControlSelect1">
                                <option style={{display: 'none'}}>Select a subreddit </option> 
                                {subreddits}
                            </select>
                            <div className="form-group">
                                <label>Post Title</label>
                                <input onChange={this.handleTitle} value={this.state.title} type="text" className="form-control" id="exampleInputSubname" aria-describedby="emailHelp1" placeholder="Post Title" />
                            </div>
                            <div className="form-group">
                                <label>Post Body</label>
                                <textarea rows='5' onChange={this.handleBody} value={this.state.body} type="text" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp2" placeholder="Post Body" />
                            </div>
                            <div action="upload.php" method="post">
                                <label>Choose an image(can be left empty)</label>
                                <br></br>
                                <input type="file" name="fileToUpload" id="fileToUpload"></input>
                            </div>
                            <br></br>
                            <input className='btn btn-lg btn-primary' type="submit" value="Create" />
                        </form>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                    <h1>Must be logged in to create a subreddit </h1>
                    <Login
                        handleLogging={this.props.handleLogging}
                        setBearToken={this.props.setBearToken}
                    />
                </div>

            )
        }




    }
}


export default withRouter(CreatePost);