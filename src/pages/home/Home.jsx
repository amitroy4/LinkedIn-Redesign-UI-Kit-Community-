import React, { useEffect, useState } from 'react'
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

import { MuiTelInput } from 'mui-tel-input'

import { getDatabase, ref, onValue, set } from "firebase/database";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    p: 4,
};

const Home = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginUser.loginUser)
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [currentUser, setCurrentUser] = useState([]);
    let [username, setusername] = useState('');
    let [address, setaddress] = useState('');
    let [dateofbirth, setdateofbirth] = useState('');
    let [info, setinfo] = useState('');
    let [phonenumber, setphonenumber] = useState('');
    let [email, setemail] = useState('');
    let [about, setabout] = useState('');

    const handleOpen = () => {
        setusername(currentUser.username);
        setaddress(currentUser.address);
        setdateofbirth(currentUser.dateofbirth);
        setinfo(currentUser.info);
        setphonenumber(currentUser.phonenumber);
        setemail(currentUser.email);
        setabout(currentUser.about);
        setOpen(true)
    };


    let handleeditbuttonsave = () => {
        set(ref(db, 'people/' + userData.uid), {
            ...currentUser,
            username: username,
            email: email,
            dateofbirth: dateofbirth,
            phonenumber: phonenumber,
            address: address,
            info: info,
            about: about,
        });
        setOpen(false)
    }

    useEffect(() => {
        onValue(ref(db, 'people/' + userData.uid), (snapshot) => {
            setCurrentUser(snapshot.val())
        });
    }, [])

    let handleinput = (e) => {
        var newDate = new Date(e.toJSON());
        var day = newDate.getDate();
        var month = newDate.getUTCMonth() + 1;
        var year = newDate.getFullYear();
        setdateofbirth(year + "-" + ("0" + (month)) + "-" + newDate.getDate());
    }


    return (
        <div className="container">
            <div className="profile">
                <div className="coverphoto">
                    <img src="/cover.png" alt="" />
                    <Button className='editbtn' variant="outlined" size="small">
                        <FiEdit />
                        <span className='edittext' onClick={handleOpen}>Edit Profile</span>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} component="form"

                                noValidate
                                autoComplete="off">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Edit Profile
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <TextField id="outlined-controlled" label="Name" sx={{ width: 250 }} value={username} onChange={(e) => { setusername(e.target.value); }} />
                                    <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ ml: 5, width: 350 }} value={address} onChange={(e) => { setaddress(e.target.value) }} />
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date of Birth"
                                            value={dayjs(dateofbirth)}
                                            onChange={handleinput}
                                            sx={{ width: 250 }}
                                        />
                                    </LocalizationProvider>

                                    <TextField id="outlined-basic" label="Info" variant="outlined" sx={{ ml: 5, width: 350 }} value={info} onChange={(e) => setinfo(e.target.value)} />
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <MuiTelInput label="Phone Number" variant="outlined" sx={{ width: 300 }} value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} />
                                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ ml: 5, width: 300 }} value={email} onChange={(e) => setemail(e.target.value)} />
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="About"
                                        multiline
                                        maxRows={6}
                                        sx={{ width: 640 }}
                                        onChange={(e) => setabout(e.target.value)}
                                        value={currentUser.about}
                                    />
                                </Typography>
                                <Button variant="contained" href="#contained-buttons" size="small" sx={{ mt: 2 }} onClick={handleeditbuttonsave}>
                                    Save
                                </Button>

                            </Box>
                        </Modal>
                    </Button>
                </div>
                <div className="profileinfo">
                    <div className="propic">
                        <img src={userData.photoURL} alt="" />
                    </div>
                    <div className="info">
                        <div className="nameloc">
                            <h2>{userData.displayName}<BiLogoLinkedinSquare className='nameicon' /></h2>
                            <div className="loc"> <FaLocationArrow className='locicon' /> <span className='locedit'>{currentUser.address}</span></div>
                        </div>
                        <div className="details">
                            {currentUser.info}
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
                <p>{currentUser.about}</p>
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