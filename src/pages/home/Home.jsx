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
import { useSelector } from 'react-redux';


const Home = () => {
    let userData = useSelector((state) => state.loginUser.loginUser)
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
                        <img src={userData.photoURL} alt="" />
                    </div>
                    <div className="info">
                        <div className="nameloc">
                            <h2>{userData.displayName}<BiLogoLinkedinSquare className='nameicon' /></h2>
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
            <div className="experiance">
                <h4>Experiance</h4>
                <div className="expfield">
                    <div className="explogo">
                        <img src="/ext.png" alt="" />
                    </div>
                    <div className="expinfo">
                        <div className="exptitle">
                            Freelance UX/UI designer
                        </div>
                        <div className="expbox">
                            <div className="left">Self Employed</div>
                            <div className="right">Around the world</div>
                        </div>
                        <div className="expbox">
                            <div className="left">Jun 2016 — Present</div>
                            <div className="right rightcolor">3 yrs 3 mos</div>
                        </div>
                        <div className="expdetails">
                            Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.
                        </div>
                    </div>
                </div>
                <div className="expfield">
                    <div className="explogo">
                        <img src="/ext.png" alt="" />
                    </div>
                    <div className="expinfo">
                        <div className="exptitle">
                            UX/UI designer
                        </div>
                        <div className="expbox">
                            <div className="left">Upwork</div>
                            <div className="right">International</div>
                        </div>
                        <div className="expbox">
                            <div className="left">Jun 2019 — Present</div>
                            <div className="right rightcolor">3 mos</div>
                        </div>
                        <div className="expdetails">
                            New experience with Upwork system. Work in next areas: UX/UI design, graphic design, interaction design, UX research.
                        </div>
                    </div>
                </div>
            </div>

            <div className="education">
                <div className="h4">Education</div>
                <div className="edufield">
                    <div className="edulogo">
                        <img src="/ext.png" alt="" />
                    </div>
                    <div className="eduinfo">
                        <div className="title">Moscow State Linguistic University</div>
                        <div className="degree">
                            Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance
                        </div>
                        <div className="year">2013 — 2017</div>
                        <div className="courses">Additional English classes and UX profile courses​.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home