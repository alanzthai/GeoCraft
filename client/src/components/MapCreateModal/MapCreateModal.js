import React from "react";
import { useState, useContext } from "react";
import "./MapCreateModal.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GlobalStoreContext from "../../store";
export default function MapCreateModal(props) {
  const { show, handleClose } = props
  const { store } = useContext(GlobalStoreContext);
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else {
      event.preventDefault();
      event.stopPropagation();
      const formData = new FormData(event.currentTarget);
      // store.createNewMap(
      //   formData.get("mapName"),
      //   formData.get("mapType")
      // )
    }

    
  };
  const handleClosing = (event) => {
    setValidated(false);
    handleClose(event)
  }

  return (
    <div>
      <Modal centered show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Your Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Enter the Name of Your Map</Form.Label>
              <Form.Control className="map-name" name="mapName" required type="text" placeholder="Map Name" />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Select Your Map Type</Form.Label>
              <Form.Select name="mapType" required >
                <option value="">Select your map type</option>
                <option value="1">Heat Map</option>
                <option value="2">Point Map</option>
                <option value="3">Proportional Symbols Map</option>
                <option value="2">Choropleth Map</option>
                <option value="3">Arrow Map</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosing}>
              Close
            </Button>
            <Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Create
              </Button>
            </Form.Group>

          </Modal.Footer>
        </Form>

      </Modal>
    </div>
  )
}