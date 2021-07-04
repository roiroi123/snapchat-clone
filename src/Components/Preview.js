import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  resetCameraImage,
  selectCameraImage,
} from "../features/cameraSlice.js";
import "./Preview.css";
import { v4 as uuid } from 'uuid';

import { storage,db } from "../firebase";
import firebase from 'firebase'

import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { selectUser } from "../features/appSlice.js";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(user)
  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        //   err func
        console.log(err);
      },
      () => {
        //   complete func
        storage.ref('posts').child(id).getDownloadURL().then((url)=>{
            db.collection('posts').add({
                imageUrl:url,
                username:"Roy",
                read:false,
                profilePic:user.profilePic,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),

            })
            history.replace("/chats")
        })

      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
