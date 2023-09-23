import React from 'react'
import Grid from '@mui/material/Grid';
import People from '../../components/people/People';
import Friendrequests from '../../components/friendrequests/Friendrequests';
import Friends from '../../components/friends/Friends';
import Blocklist from '../../components/blocklist/Blocklist';
import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import './home.css'
import { FiEdit } from 'react-icons/fi';
import { FaLocationArrow } from 'react-icons/fa';
import { BiLogoLinkedinSquare } from 'react-icons/bi';


const Home = () => {
    return (
        <div className="container">
            <div className="profile">
                <div className="coverphoto">
                    <img src="/cover.png" alt="" />
                    <Button className='editbtn' variant="outlined" size="small">
                        <FiEdit />
                        <span className='edittext'>Edit Profile</span>
                    </Button>
                </div>
                <div className="profileinfo">
                    <div className="propic">
                        <img src="/propic.jpeg" alt="" />
                    </div>
                    <div className="info">
                        <div className="nameloc">
                            <h2>Dmitry Kargaev <BiLogoLinkedinSquare className='nameicon' /></h2>
                            <div className="loc"> <FaLocationArrow className='locicon' /> <span className='locedit'>Saint Petersburg, Russian Federation</span></div>
                        </div>
                        <div className="details">
                            Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.
                        </div>
                        <Button size="small" variant="contained" href="#contained-buttons">
                            Contact info
                        </Button>
                    </div>
                </div>
            </div>
            <div className="section">
                <Link to='/LinkedIn/home' className={location.pathname == "/LinkedIn/home" ? "profile active" : "profile"}>Profile</Link>
                <Link to='/LinkedIn/friends' className={location.pathname == "/LinkedIn/friends" ? "friends active" : "friends"}>Friends</Link>
                <Link className="post" >Post</Link>
            </div>
            <div className="about">
                <h4>About</h4>
                <p>I'm more experienced in eCommerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites. </p>
                <Button size="small">
                    SEE MORE
                </Button>

            </div>
            <div className="projects">
                <h4>Projects <span className='projectcount'>3 of 12</span></h4>
                <div className="pic">
                    <img src="/ext.png" alt="" />
                    <img src="/ext.png" alt="" />
                    <img src="/ext.png" alt="" />
                </div>

            </div>
        </div>
    )
}

export default Home