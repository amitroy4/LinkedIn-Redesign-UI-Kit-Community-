import React, { useEffect, useState } from 'react'
import './posts.css'
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import { BsImage, BsFillSendFill } from 'react-icons/bs';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const Posts = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginUser.loginUser)
    let [postChange, setPostChange] = useState('')
    let [allPost, setAllPost] = useState([])
    let [friends, setFriends] = useState([]);

    let handlePost = () => {
        set(push(ref(db, 'posts/')), {
            whopost: userData.uid,
            whopostname: userData.displayName,
            posts: postChange,
        });
    }



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
            setAllPost(arr)
        });
    }, [])


    console.log('Froiends', friends);

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
                    />
                    <BsImage className='icon' />
                    <BsFillSendFill className='icon' onClick={handlePost} />
                </div>
            </div>


            {allPost.map((item) => (
                <div className="post">
                    <div className="profile">
                        <div className="left">
                            <div className="proimg">
                                <img src="/propic.jpeg" alt="" />
                            </div>
                            <div className="proinfo">
                                <div className="name">{item.whopostname}</div>
                                <div className="desig">Student</div>
                            </div>
                        </div>
                        <div className="right">bar</div>
                    </div>
                    <div className="text">{item.posts}</div>
                    {/* <div className="postimg">s</div> */}
                </div>
            ))}


        </div>
    )
}

export default Posts