import React,{useEffect, useState} from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideos } from '../services/allApi'

function View({serverRes}) {
  const [deleteStatus,setDeleteStatus] = useState(false)
  const handleDeleteStatus = (res)=>{
    setDeleteStatus(res)
  }
  const [allVideos,setallvideos] = useState([])
  const getallVideos = async ()=>{
   const response = await getVideos()
   setallvideos(response.data);
  }
  // console.log(allVideos);
  
  useEffect(() => {
    getallVideos()
  },[serverRes,deleteStatus])
  

  return (
    <div className='border p-3 rounded'>
        <Row>
            {
              allVideos?.map(video=>(
                <Col className=' mb-3' sm={12} md={6} lg={4} >
                <Videocard card={video} handleDeleteStatus={handleDeleteStatus} />
                </Col>
              ))
             
            }
        </Row>
    </div>
  )
}

export default View