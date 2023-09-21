import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './rootlayout.css'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { BsFillChatFill } from 'react-icons/bs';
import { CgMenuRound } from 'react-icons/cg';
import { MdPowerSettingsNew } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userdata } from '../../features/userSlice';
import { getAuth, signOut } from "firebase/auth";
import { useState } from 'react';


const Rootlayout = () => {
    const auth = getAuth();
    let dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate();
    let userData = useSelector((state) => state.loginUser.loginUser)
    let [menu, setMenu] = useState(false)

    useEffect(() => {
        if (userData == null) {
            navigate("/login")
        }
    }, [])

    if (userData == null) {
        return
    }

    let handleLogOut = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("LinkedInUser")
            dispatch(userdata(null))
            navigate("/login");
        });
    }
    return (
        <>
            <Grid container>
                <div className='navcontainer'>
                    <div className="navbarbox">
                        <div className="navleft">
                            <img src="/logo.png" alt="" />
                        </div>
                        <div className="navright">
                            <img onClick={() => setMenu(!menu)} src={userData.photoURL} alt="" />
                            {
                                menu && <div className='navbar'>
                                    <div className="user">
                                        <div className="left">
                                            <img src={userData.photoURL} alt="" />
                                            <div className="text">
                                                <h4>{userData.displayName}</h4>
                                                <p>Edit Profile</p>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <FiSettings className='settings' />
                                            <MdPowerSettingsNew onClick={handleLogOut} className='logout' />
                                        </div>
                                    </div>
                                    <ul>
                                        <li >
                                            <Link to='/LinkedIn/home' className={location.pathname == "/LinkedIn/home" ? 'active' : 'icon'} onClick={() => setMenu(!menu)}>
                                                <AiFillHome /> Home
                                            </Link>
                                        </li>
                                        <li >
                                            <Link to='/LinkedIn/chat' className={location.pathname == "/LinkedIn/chat" ? 'active' : 'icon'} onClick={() => setMenu(!menu)}>
                                                <BsFillChatFill /> Chat
                                            </Link>
                                        </li>
                                        <li >
                                            <Link to='/LinkedIn/chat' className={location.pathname == "/LinkedIn/group" ? 'active' : 'icon'} onClick={() => setMenu(!menu)}>
                                                <HiUserGroup /> Group
                                            </Link>
                                        </li>
                                        <li >
                                            <Link to='/LinkedIn/chat' className={location.pathname == "/LinkedIn/firends" ? 'active' : 'icon'}>
                                                <AiOutlineUser /> Friends
                                            </Link>
                                        </li>
                                        <li >
                                            <Link to='/LinkedIn/chat' className={location.pathname == "/LinkedIn/firends" ? 'active' : 'icon'}>
                                                <CgMenuRound /> People
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <Grid item xs={10.5}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default Rootlayout