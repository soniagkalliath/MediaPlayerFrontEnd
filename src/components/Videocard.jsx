import React,{useState} from 'react';
import { Card,Modal } from 'react-bootstrap';
import { Trash2 } from 'react-feather';
import { deletevideo } from '../services/allApi';

function Videocard({card,handleDeleteStatus}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //video remove
  const removeItem = async (id)=>{
    console.log("delete video clicked",id);
    //make call to allapi 
    const response = await deletevideo(id)
    // console.log(response);
    if(response.status>=200 && response.status<300){
      handleDeleteStatus(true)
    }

  }

  return (
    <>
      <Card style={{height:'300px'}} className='shadow'>
      <Card.Img  onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
            <span>{card?.caption.slice(0,15)}...</span>
            <span className='btn' onClick={()=>removeItem(card?.id)} style={{float:'right'}}><Trash2 color='red'/></span>
        </Card.Title>
      </Card.Body>
    </Card>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width={"100%"} height={"400px"} src={`${card?.url}?autoplay=1`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
       
      </Modal>

    </>
  )
}



export default Videocard