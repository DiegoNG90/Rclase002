import { Modal, Button, Form } from 'react-bootstrap'

const ModalSubirFotos = ({ handleClose , show, setModalInputValues }) => {

    const handlerSubirFotos = (e) => {
      e.preventDefault(e);
      console.log('Event elements:', e.target.form[0].value, e.target.form[1].value);
      setModalInputValues([e.target.form[0].value, e.target.form[1].value])
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Subir fotos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="foto1">
            <Form.Label>Foto1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba la URL de la foto 1"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="foto2">
            <Form.Label>Foto2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba la URL de la foto 2"
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={(e) => handlerSubirFotos(e)}>
            Subir Fotos
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSubirFotos;