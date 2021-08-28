import React,{useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

import shortId from 'short-id'

const Work = () => {
    //{id: string, title: string, description: string}

        const [task, setTask] = useState([]);
        const [showForm, setShowForm] = useState(true);

        const createTask = (e) => {
            //e → referencia del formulario que disparó el evento
            e.preventDefault();
            // console.log(e.target.elements[0].value)
            let [title, description] = e.target.elements;
            title = title.value.trim();
            description =  description.value.trim();
            setTask(
                [...task,
                {id: shortId.generate(), title, description}])

            //Para limpiar los imputs luego de ccargar las tareas:
            e.target.reset()
            console.log(task);

        }

        const handleToggleForm = () => {
            setShowForm(!showForm);
        }
    return (
        <Container>
            <Row className="justify-content-center">
                <Button onClick={handleToggleForm}>{showForm? "Ocultar formulario": "Ver Formulario"}</Button>
                {showForm && (
                <Col md={6} xs={12}>
                    <h3>Tasks</h3>
                    <Form onSubmit={createTask}>
                        <Form.Group>
                            <Form.Label>Titulo de la tarea</Form.Label>
                            <Form.Control 
                            placeholder="Tarea"
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripcion de la ta</Form.Label>
                            <Form.Control
                            rows={4}
                            as="textarea" placeholder="Descripcion de la tarea"></Form.Control>
                        </Form.Group>
                        <Button className="m-4" type="submit" variant="success"> Crear tarea</Button>
                    </Form>
                </Col>)}
            </Row>
        </Container>
    )
}

export default Work;
