import React, { useState } from "react";
import { Modal, Button,Form,FloatingLabel } from "react-bootstrap";
import { PlusCircle } from "react-feather";
import { addVideo } from "../services/allApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleRes}) {

  const [uploadData,setUploadData] = useState({
    id:"",caption:"",thumbnail:"",url:""
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e)=>{
    const {name,value} = e.target
    setUploadData({...uploadData,[name]:value})
  }

  const extractUrl = (e)=>{
    let YoutubeUrl = e.target.value
    if(YoutubeUrl.includes("v=")){
      let index = YoutubeUrl.indexOf("v=")
      let videourl = YoutubeUrl.substring(index+2,index+13)
      let videoData = uploadData
      videoData.url =`https://www.youtube.com/embed/${videourl}`
     setUploadData(videoData)
    }
  }

  const handleAdd = async ()=>{
    const {id,caption,thumbnail,url} = uploadData
    if(!id || !caption || !thumbnail || !url){
      toast.warning("please fill the form completely")
    }else{
      //make call allapi
      const response = await addVideo(uploadData)
      if(response.status>=200 && response.status<300){
        handleRes(response.data);
        setShow(false);
        toast.success("New video uploaded successfully...")
      } else{
        toast.error("Provide a unique id!!!")
      }
    }
  }

  return (
    <>
      <div className="btn" onClick={handleShow}>
        <PlusCircle color="grey" size={60} />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Uploading Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <FloatingLabel className="mb-3" controlId="floatingid" label=" Video Id">
        <Form.Control type="text" placeholder="Uploading Video Id" name="id" onChange={setInput} />
      </FloatingLabel>
      <FloatingLabel className="mb-3" controlId="floatingcaption" label=" Video Caption">
        <Form.Control type="text" placeholder="Uploading Video Caption" name="caption" onChange={setInput}/>
      </FloatingLabel>
      <FloatingLabel className="mb-3" controlId="floatingimage" label=" Video Cover Image URL">
        <Form.Control type="text" placeholder="Uploading Video Cover Image URL" name="thumbnail" onChange={setInput}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatinglink" label="Youtube Video Link">
        <Form.Control type="text" placeholder="Uploading Video Link" name="url" onChange={extractUrl}/>
      </FloatingLabel>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>

        </Modal.Footer>
      </Modal>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </>
  );
}

export default Add;
