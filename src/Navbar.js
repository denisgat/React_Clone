import React from 'react';
import SubDropDown from './SubDropDown';
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <nav className="navbar navbar-light bg-white p-0 pb-1 inline sticky-top" style={{ height: '55px' }}>

            <Link to="/" className="navbar-brand inline ml-2">
                <img onClick={props.handleHome} className="rounded-circle" width="30" height="30" alt="top logo" src="data:image/png;base64,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" />
                <h5 onClick={props.handleHome} className="navbar-brand text-dark mx-2">Reddit</h5>
            </Link>
            <SubDropDown
                subreddits={props.subreddits}
                posts={props.posts}
            />
            <form className="form-inline text-center">
                <input className="form-control mr-sm-2" style={{ height: '40px', width: '50vw' }} type="search" placeholder="Search" aria-label="Search" />
                {/* <a className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</a> */}
            </form>
            <div className='navbar-right' id="navbarSupportedContent">
       
                    {props.isLoggedIn === true ?
                        <div>
                            <Link className='mx-2 btn btn-outline-primary' to='/' onClick={props.handleLogging}>Logout</Link>
                            <Link className='mx-2 btn btn-outline-secondary' to='/profile'>Profile</Link>
                        </div>
                        :
                        props.route === '/home' ?
                            <div>
                                <Link className='mx-2 btn btn-outline-primary' onClick={props.handleLogin} to='/login'>Login</Link>
                                <Link className='mx-2 btn btn-primary' onClick={props.handleRegister} to='/register'>Sign Up</Link>
                            </div>
                            :
                            props.route === '/login' ?
                                <Link className='mx-2 btn btn-primary' onClick={props.handleRegister} to='/register'>Sign Up</Link>
                                :
                                <Link className='mx-2 btn btn-outline-primary' onClick={props.handleLogin} to='/login'>Login</Link>
                    }
               
            </div>
        </nav>

    )
}

export default Nav