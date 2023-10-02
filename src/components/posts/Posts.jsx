import React, { useEffect, useState } from 'react'
import './posts.css'
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import { BsImage, BsFillSendFill } from 'react-icons/bs';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import moment from 'moment';


const styleEdit = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    p: 4,
};


const Posts = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginUser.loginUser)
    let [postChange, setPostChange] = useState('')
    let [allPost, setAllPost] = useState([])
    let [friends, setFriends] = useState([]);

    let [editPost, setEditPost] = useState("")

    let handlePost = () => {
        if (postChange != "") {
            set(push(ref(db, 'posts/')), {
                whopost: userData.uid,
                whopostname: userData.displayName,
                posts: postChange,
                date: "Posted on " + moment().format('lll'),
            }).then(() => {
                setPostChange("")
            });
        }

    }

    useEffect(() => {
        const usersRef = ref(db, 'friends/');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().senderid) {
                    arr.push(item.val().receiverid)
                }
                else if (userData.uid == item.val().receiverid) {
                    arr.push(item.val().senderid)
                }
            })
            setFriends(arr)
        });
    }, [])


    useEffect(() => {
        const postsRef = ref(db, 'posts/');
        onValue(postsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push({
                    ...item.val(),
                    id: item.key,
                })
            })
            setAllPost(arr.reverse())
        });
    }, [])


    const [openEdit, setopenEdit] = useState(false);
    const handleopenEdit = (item) => {
        setEditPost(item.posts);
        setopenEdit(true)
    };
    const handleCloseEdit = () => {
        setEditPost("");
        setopenEdit(false)
    };

    let handleEdit = (item) => {
        set(ref(db, 'posts/' + item.id), {
            whopost: userData.uid,
            whopostname: userData.displayName,
            posts: editPost,
            date: "Updated on " + moment().format('lll'),
        }).then(() => {
            setEditPost("");
            setopenEdit(false)
        });
    }



    let handlePostRemove = (item) => {
        remove(ref(db, 'posts/' + item.id));
    }
    return (
        <div className="container">
            <div className="newpost">
                <div className="title">NEW POST</div>
                <div className="textfield">
                    <TextField
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        sx={{ width: 640 }}
                        placeholder="What’s on your mind?"
                        onChange={(e) => setPostChange(e.target.value)}
                        value={postChange}
                    />
                    <BsImage className='icon' />
                    <BsFillSendFill className='icon' onClick={handlePost} />
                </div>
            </div>

            <section className='allpost'>
                {allPost.map((item) => (
                    (userData.uid == item.whopost) ?
                        <div className="post" key={item.id}>
                            <div className="profile">
                                <div className="left">
                                    <div className="proimg">
                                        <img src="/propic.jpeg" alt="" />
                                    </div>
                                    <div className="proinfo">
                                        <div className="name">{item.whopostname}</div>
                                        <div className="profession">Student</div>

                                    </div>
                                </div>
                                {
                                    userData.uid == item.whopost && <div className="right">
                                        <div className="date">{item.date}</div>
                                        <BiSolidEdit className='icon' onClick={() => handleopenEdit(item)} />
                                        <Modal
                                            open={openEdit}
                                            onClose={handleCloseEdit}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={styleEdit}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Edit Post
                                                </Typography>

                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <TextField
                                                        id="outlined-multiline-flexible"
                                                        label="What's on your mind?"
                                                        multiline
                                                        maxRows={4}
                                                        sx={{ width: 700 }}
                                                        onChange={(e) => setEditPost(e.target.value)}
                                                        value={editPost}
                                                    />
                                                </Typography>
                                                <Button variant="contained" href="#contained-buttons" size="small" sx={{ mt: 2 }} onClick={() => handleEdit(item)}>
                                                    Update
                                                </Button>
                                            </Box>
                                        </Modal>

                                        <MdDelete className='icon' onClick={() => handlePostRemove(item)} />
                                    </div>
                                }
                            </div>
                            <div className="text">{item.posts}</div>
                            {/* <div className="postimg">s</div> */}
                        </div>
                        :
                        friends.map((frnditem) => (
                            (frnditem == item.whopost) &&
                            <div className="post" key={frnditem.key}>
                                <div className="profile">
                                    <div className="left">
                                        <div className="proimg">
                                            <img src="/propic.jpeg" alt="" />
                                        </div>
                                        <div className="proinfo">
                                            <div className="name">{item.whopostname}</div>
                                            <div className="profession">Student</div>

                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="date">{item.date}</div>
                                    </div>

                                </div>
                                <div className="text">{item.posts}</div>
                                {/* <div className="postimg">s</div> */}
                            </div>

                        ))

                ))}
            </section>


        </div>
    )
}

export default Posts