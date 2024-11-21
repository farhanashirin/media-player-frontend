import React, { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { addCategoryAPI, deleteCategoryAPI, getAvideoAPI, getCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import VideoCard from './VideoCard';

function Category() {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState(""); // to get inputs 
  const [allCategories, setAllCategories] = useState([]);

  // Open and close modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add new category
  const handleAdd = async () => {
    if (categoryName) {
      const result = await addCategoryAPI({ categoryName, allVideos: [] });
      if (result.status >= 200 && result.status < 300) {
        handleClose();
        setCategoryName("");
        getCategories();
      } else {
        console.log(result.message);
      }
    } else {
      alert("Please fill the missing fields");
    }
  };

  // Get all categories
  const getCategories = async () => {
    const { data } = await getCategoryAPI();
    setAllCategories(data);
  };

  // Remove category
  const removeCategory = async (id) => {
    await deleteCategoryAPI(id);
    getCategories();
  };

  // Handle drag over
  const dragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  // Handle video drop into category
  const videoDrop = async (e, categoryId) => {
    e.preventDefault(); // Prevent default behavior to allow drop

    const videoId = e.dataTransfer.getData('videoId'); // Get videoId from drag data
    const { data } = await getAvideoAPI(videoId); // Fetch the video data

    const selectedCategory = allCategories.find(item => item.id === categoryId); // Find selected category
    selectedCategory.allVideos.push(data); // Add video to category's allVideos array

    await updateCategoryAPI(categoryId, selectedCategory); // Update category
    getCategories(); // Refresh categories after update
  };

  // Set up the effect to fetch categories on load
  useEffect(() => {
    getCategories();
  }, []);

  const videoDragStarted = (e, videoId, categoryId) => {
    let dataShare = { videoId, categoryId };
    e.dataTransfer.setData("Data", JSON.stringify(dataShare));
  };

  return (
    <>
      {/* Button to add category */}
      <div className="d-grid">
        <Button onClick={handleShow} className='btn btn-primary'>Add Category</Button>
      </div>

      {/* Modal to add category */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-info'>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Category Name"
              className="mb-3"
            >
              <Form.Control 
                type="text" 
                placeholder="Enter the Category Name" 
                onChange={e => setCategoryName(e.target.value)} 
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render categories */}
      {allCategories?.length > 0 ? allCategories.map(({ id: categoryId, categoryName, allVideos }) => (
        <div
          key={categoryId} // Use categoryId as the key
          className="border border-3 m-3 p-3"
          onDragOver={dragOver} // Allow drag over
          onDrop={(e) => videoDrop(e, categoryId)} // Use categoryId here
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3>{categoryName}</h3>
            <button 
              className="text-danger btn" 
              onClick={() => removeCategory(categoryId)} // Use categoryId here
            >
            
              <i className="fa-solid fa-trash"></i>
            </button>  
          </div>

          {/* Display videos in the category */}
          <Row>
            {allVideos?.length > 0 ? allVideos.map(card => (
              <Col key={card._id} sm={12} md={12} lg={12}>
                <VideoCard video={card} insideCategory={true} />
              </Col>
            )) : null}
          </Row>
        </div>
      )) : <p className='text-danger'>No categories created</p>}
    </>
  );
}

export default Category;
