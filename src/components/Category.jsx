import React, { useState,useEffect } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deletecategory, getallcategory, getavideo, updateCategory } from "../services/allApi";
import { Trash2 } from "react-feather";

function Category() {

  const [allCategory,setallCategory] = useState([])

  const [categoryItem,setCategoryItem] = useState({
    id:"",
    categoryName:"",
    allvideos:[]
  })
  const addCategoryForm = (e)=>{
    const {name,value} = e.target
    setCategoryItem({...categoryItem,[name]:value})
  }

  // console.log(categoryItem);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCategory = async (e)=>{
    e.preventDefault()
    const {id,categoryName} = categoryItem
    if(!id || !categoryName){
        toast.warning("Please fill the form completely!!!")
    }else{
      const response = await addCategory(categoryItem)
      console.log(response);
      if(response.status>=200 && response.status<300){
        setShow(false);
        toast.success("New category added successfully...")
        getCategoryList()
      } else{
        toast.error("Provide a unique id!!!")
      }
    }
  }

   //getCategoryList
   const getCategoryList = async ()=>{
    //all category - after making api call
    const response = await getallcategory()
    setallCategory(response.data);
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  const handleDeleteCategory = async (e,id)=>{
    e.preventDefault()
    //remove category having given id
     await deletecategory(id)
     getCategoryList()
  }

  //dragOver
  const dragOver = (e)=>{
    e.preventDefault()
    console.log("Dragging over the category board!!!!");
  }

  //dropped
  const dropped = async (e,categoryId) =>{
    console.log("Target Category id:",categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("Source card id:",sourceCardId);
    //logic to implement adding card in the given category
    let {data} = await getavideo(sourceCardId)
    console.log("Source video data:",data);

    let selectedCategory = allCategory.find(item=>item.id===categoryId)
    selectedCategory.allvideos.push(data)
    console.log("Updated Target category details:",selectedCategory);
    await updateCategory(categoryId,selectedCategory)
    getCategoryList()
  }
  
  return (
    <>
      <div className="d-grid">
        <button onClick={handleShow} className="btn btn-dark ">
          Add Categories
        </button>
      </div>
    {
      allCategory?.map(item=>(
        <div className="d-flex justify-content-between border rounded mt-2 p-3"
        droppable
        onDragOver={e=>dragOver(e)}
        onDrop={e=>dropped(e,item?.id)}
        >
          <h4> {item?.categoryName} </h4>
          <span onClick={e=>handleDeleteCategory(e,item?.id)}> <Trash2 color="red"></Trash2> </span>
        </div>
      ))
    }


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId="floatingid" label=" Id">
            <Form.Control type="text" placeholder="Id" name="id" onChange={addCategoryForm} />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingcategory"
            label="Category"
          >
            <Form.Control type="text" placeholder="Category Name" name="categoryName" onChange={addCategoryForm} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
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

export default Category;
