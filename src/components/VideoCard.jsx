import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { addHistoryAPI, deleteVideoAPI } from '../services/allApi';

function VideoCard({video,insideCategory,setDeleteVideoResponse}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async() => {setShow(true);

  const{caption,link}=video

  let today= new Date()
 //console.log( console.log(new Intl.DateTimeFormat('en-US',{year:"numeric",month:"numeric",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(today)));
  let timeStamp = new Intl.DateTimeFormat('en-US',{year:"numeric",month:"numeric",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(today)
  
  let videoHistory = {caption,link,timeStamp}
  //api call
  await addHistoryAPI(videoHistory)
}

  const dragStarted=(e,id)=>{
    console.log('video drag started:',id)
    e.dataTransfer.setData('videoId',id)
  }

  // const removeVideo=async(id)=>{
  //   await deleteVideoAPI(id)
  //   setDeleteVideoResponse(true)
  // }
  const removeVideo = async (id) => {
    console.log('Removing video with id:', id);
    const response = await deleteVideoAPI(id);
    if (response?.status === 200 || response?.status === 204) {
      setDeleteVideoResponse(true); // Trigger state change
    } else {
      console.error('Failed to delete video:', response);
    }
  };
  
  return (
    <>
    
    <Card className='mb-5 ' style={{ width: '16rem'}} draggable onDragStart={e=>dragStarted(e,video?.id)}>
      <Card.Img variant="top" style={{width:'100%',height:"300px"}} onClick={handleShow} src={video.url} />
      <Card.Body>
        <div className="d-flex justify-content-between">
        <Card.Title>{video.caption}</Card.Title>
           {insideCategory?null:<button className="text-danger btn" onClick={()=>removeVideo(video?.id)}>
            <i className="fa-solid fa-trash"></i></button>}
        </div>
      </Card.Body>
    </Card>

   

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{video.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe
  width="100%"
  height="315"
  src={`${video.link}?autoplay=1`}  // Use template literal correctly
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>


        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default VideoCard