import React, { useState } from 'react'
import './education.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { getDatabase, ref, set, push } from "firebase/database";
import { useSelector } from 'react-redux';



const styleAdd = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    p: 4,
};




const Education = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginUser.loginUser)
    const [openAdd, setopenAdd] = useState(false);
    const handleopenAdd = () => setopenAdd(true);
    const handleCloseAdd = () => {
        setopenAdd(false)
    };

    let [institution, setInstitution] = useState('');
    let [eduDegree, setEduDegree] = useState('');
    let [eduInstitutionJoinDate, setEduInstitutionJoinDate] = useState('');
    let [eduInstitutionEndDate, setEduInstitutionEndDate] = useState('');
    let [eduDetails, setEduDetails] = useState('');
    let [edu, setEdu] = useState([]);


    let handleinputeduInstutionJoinDate = (e) => {
        var newDate = new Date(e.toJSON());
        var day = newDate.getDate();
        var month = newDate.getUTCMonth() + 1;
        var year = newDate.getFullYear();
        setEduInstitutionJoinDate(year + "-" + ("0" + (month)) + "-" + newDate.getDate());
    }

    let handleinputeduInstutionEndDate = (e) => {
        var newDate = new Date(e.toJSON());
        var day = newDate.getDate();
        var month = newDate.getUTCMonth() + 1;
        var year = newDate.getFullYear();
        setEduInstitutionEndDate(year + "-" + ("0" + (month)) + "-" + newDate.getDate());
    }

    let handleEduSave = () => {
        console.log(institution);
        console.log(eduDegree);
        console.log(eduInstitutionJoinDate);
        console.log(eduInstitutionEndDate);
        console.log(eduDetails);

        set(push(ref(db, 'educations/')), {
            userid: userData.uid,
            institution: institution,
            eduDegree: eduDegree,
            eduInstitutionJoinDate: eduInstitutionJoinDate,
            eduInstitutionEndDate: eduInstitutionEndDate,
            eduDetails: eduDetails,
        });
    }

    return (
        <div className="education">
            <div className="barbox">
                <h4>Education</h4>
                <div className="edubtn" onClick={handleopenAdd}>Add Education</div>

                <Modal
                    open={openAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleAdd}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Education
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField id="outlined-controlled" label="Institution" sx={{ width: 500 }}
                                onChange={(e) => setInstitution(e.target.value)}
                                value={institution}
                            />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField id="outlined-controlled" label="Degree" sx={{ width: 350 }} onChange={(e) => setEduDegree(e.target.value)}
                                value={eduDegree} />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Joining date"
                                    sx={{ width: 250 }}
                                    onChange={handleinputeduInstutionJoinDate}
                                    value={dayjs(eduInstitutionJoinDate)}
                                />
                                <DatePicker
                                    label="Ending date"
                                    sx={{ ml: 5, width: 250 }}
                                    onChange={handleinputeduInstutionEndDate}
                                    value={dayjs(eduInstitutionEndDate)}
                                />
                            </LocalizationProvider>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Details"
                                multiline
                                maxRows={4}
                                sx={{ width: 640 }}
                                onChange={(e) => setEduDetails(e.target.value)}
                                value={eduDetails}
                            />
                        </Typography>
                        <Button variant="contained" href="#contained-buttons" size="small" sx={{ mt: 2 }} onClick={handleEduSave}>
                            Save
                        </Button>
                    </Box>
                </Modal>


            </div>
            <div className="edufield">
                <div className="edulogo">
                    <img src="/ext.png" alt="" />
                </div>
                <div className="eduinfo">
                    <div className="titlebox">
                        <div className="title">Moscow State Linguistic University</div>

                        <div className="edubtn"><BiSolidEdit className='eduicon' /> <MdDelete className='eduicon' /></div>
                    </div>
                    <div className="degree">
                        Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance
                    </div>
                    <div className="year">2013 — 2017</div>
                    <div className="courses">Additional English classes and UX profile courses​.</div>
                </div>
            </div>
        </div>
    )
}

export default Education