import React from 'react';
import Login from './Login';
const axios = require('axios');

class Create extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subname: '',
            subdesc: '',
            user_id: '',
            token: ''

        }

        this.handleSubName = this.handleSubName.bind(this);
        this.handleSubDesc = this.handleSubDesc.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubuser = this.handleSubUser.bind(this);
    }


    handleSubName(event) {
        this.setState({
            subname: event.target.value
        });
    }

    handleSubDesc(event) {
        this.setState({
            subdesc: event.target.value,
        });
    }


    async handleSubmit(event) {
        event.preventDefault();

       await this.setState({
            user_id: this.props.user.id,
            token: this.props.token
        })

        console.log(this.state)

        const data = {
            subname: this.state.subname,
            subdesc: this.state.subdesc,
            user_id: this.state.user_id
        }

        const config = {
            headers : {
                'content-type' : 'multipart/form-data',
                'Authorization' : 'Bearer '+ this.state.token
            }
        }


        let result = await axios.post('http://127.0.0.1:8000/api/subreddits/create', data, config)
            .then(response => {
                // console.log(response.data);
                return response.data
                // history.push('/')
            })
            .catch(function (error) {
                console.log(error);
            })

        console.log(result)

        // console.log(this.state)

    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div className='' style={{ height: '100vh', backgroundColor: '#f0f0f5' }}>
                    <div className='container px-5' >
                        <h1 className='p-3'>Creating SubReddit</h1>
                        <form onSubmit={this.handleSubmit} className='mt-5'>
                            <div className="form-group">
                                <label>Subreddit Name</label>
                                <input onChange={this.handleSubName} value={this.state.subname} type="text" className="form-control" id="exampleInputSubname" aria-describedby="emailHelp1" placeholder="Subreddit Name" />
                            </div>
                            <div className="form-group">
                                <label>Subreddit Description</label>
                                <input onChange={this.handleSubDesc} value={this.state.subdesc} type="text" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp2" placeholder="Subreddit Description" />
                            </div>
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

export default Create