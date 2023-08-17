import React,{useState} from 'react';
import { Card,Modal } from 'react-bootstrap';
import { Trash2 } from 'react-feather';
import { addhistory, deletevideo } from '../services/allApi';
import { v4 as uuidv4 } from 'uuid';

function Videocard({card,handleDeleteStatus,insideCategory}) {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true);
    const uid = uuidv4()
    const {caption,url} = card
    let cardDateTime = new Date()
    if(uid!=="" && caption!=="" && url!=="" && cardDateTime!==""){
      const body = {
        id:uid,cardname:caption,url,date:cardDateTime
      }
    const response = await addhistory(body)
    // console.log(response);
    }
  }

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

  //dragStarted
  const dragStarted = (e,id)=>{
    console.log("Drag started and source card id:"+id);
    e.dataTransfer.setData("cardId",id)
  }
  return (
    <>
      <Card style={{height:'300px'}} className='shadow'
      draggable
      onDragStart={e=>dragStarted(e,card?.id)}
      >
      <Card.Img  onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
            <span>{card?.caption.slice(0,15)}...</span>
            { 
            insideCategory?"":
            <span className='btn' onClick={()=>removeItem(card?.id)} style={{float:'right'}}><Trash2 color='red'/></span>
            }
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