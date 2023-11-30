import { React, useState, useContext, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Dropdown } from "react-bootstrap";
import { HandThumbsUpFill, HandThumbsDownFill, ThreeDotsVertical, PencilFill, HandThumbsUp, HandThumbsDown, } from 'react-bootstrap-icons';
import AuthContext from '../../auth'
import GlobalStoreContext from '../../store'
import './MapCard.scss'

export default function MapCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { map, functions, selected } = props
  const [toEdit, setToEdit] = useState(false);
  const email = auth.getEmail();


  function handleEditMap(event) {
    event.preventDefault();
    event.stopPropagation();
    setToEdit(true)
  }

  function handleInteraction(arr, otherArr, event) {
    event.stopPropagation();
    const index = arr.indexOf(auth.user.email);

    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      if (otherArr.length > 0) {
        const otherIndex = otherArr.indexOf(auth.user.email);
        if (otherIndex !== -1) {
          otherArr.splice(otherIndex, 1);
        }
      }
      arr.push(auth.user.email);
    }

    store.updateLikeDislike(map._id, map);
  }

  function handleLike(event) {
    handleInteraction(map.likes, map.dislikes, event);
  }

  function handleDislike(event) {
    handleInteraction(map.dislikes, map.likes, event);
  }

  const mapbox = useRef(null);
  function handleToggleEdit(event) {
    event.stopPropagation();
    store.setCurrentList(map._id, mapbox);
    // event.stopPropagation();
    // if (event.detail === 2) {
    //     store.setCurrentList(idNamePair._id);
    //     toggleEdit();
    // }
  }


  if (toEdit) {
    return <Navigate to="/edit" />
  }
  // async function handleDelete(event) {
  //   document.getElementById("map-create-modal").classList.add("is-visible")
  // }D
  let dropdown = <div className='options-button'>
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic" disabled={!auth.loggedIn}>
        <ThreeDotsVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-menu'>
        <Dropdown.Item onClick={functions.handleFork} className='options-button-options'>Fork</Dropdown.Item>
        <Dropdown.Item onClick={functions.handleDeleteMap} className='options-button-options'>Delete</Dropdown.Item>
        <Dropdown.Item className='options-button-options'>Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>

  let mapCardButtons = <div className='d-flex flex-row-reverse'>
    <Button className='btn btn-light dislike-button' disabled={!auth.loggedIn}><PencilFill onClick={handleEditMap} /></Button>
  </div>
  if (map.published) {
    dropdown = <div className='options-button'>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" disabled={!auth.loggedIn}>
          <ThreeDotsVertical />
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          <Dropdown.Item onClick={functions.handleFork} className='options-button-options'>Fork</Dropdown.Item>
          <Dropdown.Item onClick={functions.handleDeleteMap} className='options-button-options'>Delete</Dropdown.Item>
          <Dropdown.Item onClick={functions.handleExport} className='options-button-options'>Export</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>

    mapCardButtons = <div className='d-flex flex-row-reverse'>
      <Button className='btn btn-light dislike-button' onClick={handleDislike} disabled={!auth.loggedIn}>{map.dislikes.includes(email) ? <HandThumbsDownFill /> : <HandThumbsDown />} {map.dislikes.length}</Button>
      <Button className='btn btn-light like-button' onClick={handleLike} disabled={!auth.loggedIn}>{map.likes.includes(email) ? <HandThumbsUpFill /> : <HandThumbsUp />} {map.likes.length}</Button>
    </div>
  }

  return (
    <div>
      <div className={`card map-card ${(store.currentList != null) && (store.currentList._id === map._id) ? { selected } : ''}`} onClick={handleToggleEdit}>
        <div className="card-header">
          <p className="map-title">{map.name}</p>
          {dropdown}

        </div>

        <div className="card-body" >
          <p className="card-text comment-text">By: {map.ownerName}</p>
          {mapCardButtons}
        </div>
      </div>
    </div>


  )

}