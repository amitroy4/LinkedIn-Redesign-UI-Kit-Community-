import React from 'react'
import Grid from '@mui/material/Grid';
import People from '../../components/people/People';
import Friendrequests from '../../components/friendrequests/Friendrequests';
import Friends from '../../components/friends/Friends';
import Blocklist from '../../components/blocklist/Blocklist';
import Button from '@mui/material/Button';
import './home.css'


const Home = () => {
    return (
        <div className="container">
            <div className="profile">
                <div className="coverphoto">
                    <img src="/cover.png" alt="" />
                    <Button className='editbtn' variant="outlined" size="small">
                        Edit Profile
                    </Button>
                </div>
                <div className="profileinfo">
                    <div className="propic">zcz</div>
                    <div className="info">
                        <div className="nameloc">
                            <h2>Dmitry Kargaev</h2>
                            <div className="loc">Saint Petersburg, Russian Federation</div>
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
        </div>
    )
}

export default Home