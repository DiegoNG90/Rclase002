import { useState } from 'react'
import {
  useQuery,
  useMutation,
//   queryCache,
} from 'react-query';
import {queryClient} from '../../App'
import axios from 'axios';

import ModalSubirFotos from './ModalSubirFotos/ModalSubirFotos'
import {Container, Form, Card, Button, Row, Col} from 'react-bootstrap'

const URL = 'http://localhost:8000/api'


const MutationTry = () => {
  // GET ---------------------------
  // Service para fetchear
  const fetchProducts = async () => {
    const res = await axios.get(`${URL}/products`);
    const products = res.data ? res.data : [];
    return products;
  };
  // Fetchear data con useQuery (REACT QUERY)
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery('allProducts', fetchProducts);

  // POST(2) → 1) Producto y 2) Fotos --------------------------
  // Service para postear
  const postProduct = async (body) => {
    const res = await axios.post(`${URL}/products`, body);
    const createdProduct = res.data ? res.data : {};
    console.log('Respuesta del createdProduct:', createdProduct);
    return createdProduct;
  };

  // Modal Post Fotos state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalInputValues, setModalInputValues] = useState([]);

  console.log('ModalInputsValue Array:', modalInputValues);

  // Service para postear fotos
  const postPhotos = async ({product_id, body}) => {
    console.log("Params :>", product_id, body)
    const res = await axios.post(`${URL}/products/photos/${product_id}`, body);
    const addedPhotos = res.data ? res.data : {};
    console.log('Respuesta del postPhotos:', addedPhotos);
    return addedPhotos;
  };
  //  postear fotos con useMutation (REACT QUERY)
  const addPhotosMutation = useMutation(postPhotos, {
    onSuccess: async () => {
      await queryClient.fetchQuery('allProducts');
    },
  });

  // postear data con useMutation (REACT QUERY)
  const createProductMutation = useMutation(postProduct, {
    onSuccess: async () => {
      await queryClient.fetchQuery('allProducts');
    },
  });

  const handlerCrearProducto = async (e) => {
    e.preventDefault();
    //   console.log(":>", e.target.elements)
    // console.log(e.target.elements[0].value)
    let [
      nombre,
      descripcion,
      categoria,
      precio,
      decimales,
      moneda,
      estado,
      es_nuevo,
      fecha_de_alta,
    ] = e.target.elements;
    const bodyData = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      categoria: categoria.value,
      precio: Number(precio.value),
      decimales: decimales.value,
      moneda: moneda.value,
      estado: estado.value,
      es_nuevo: es_nuevo.value === 'on' ? true : false,
      fecha_de_alta: fecha_de_alta.value,
    };
    let idMutation;
    //1) Post de los datos de PRODUCTO
    try {
      createProductMutation.mutate(bodyData);
      const mutationResponse = await createProductMutation.data;
      const {newProduct} = mutationResponse
      const {id} = newProduct
      console.log(`mutationResponse check for new ID :>`, mutationResponse)
      idMutation = id + 1
      console.log(`idMutation definition :>`, idMutation)

    } catch (error) {
      console.log('Error en crear Producto', error);
    }
    try{
      //2) Post de las FOTOS
      const bodyPhotos = {photos: modalInputValues}
      console.log("bodyPhotos", bodyPhotos)
      console.log(`idMutation after first try :>`, idMutation)
      if (modalInputValues.length === 2){

          addPhotosMutation.mutate({
            product_id: idMutation,
            body: bodyPhotos,
          });

        console.log('???addPhotosMutation', await addPhotosMutation.data);
      }

    }catch(error){
      console.log('Error en subir fotos a producto', error);
    }


    //Para limpiar los imputs luego de ccargar las tareas:
    // e.target.reset();
  };
  // DELETE ---------------------------
  const deleteProduct = async (product_id) => {
    const res = await axios.delete(`${URL}/products/${product_id}`);
    const deletedProduct = res.data ? res.data : {};
    console.log('Respuesta del deletedProduct:', deletedProduct);
    return deletedProduct;
  };

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: async () => {
      await queryClient.fetchQuery('allProducts');
    },
  });

  const handlerEliminarProducto = (product_id) => {
    deleteProductMutation.mutate(Number(product_id));
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error en servidor!</h2>;
  console.log("fetched products", products)
  return (
    <Container>
      <Row>
        <h1>Crear producto con useMutation</h1>
        <Form onSubmit={handlerCrearProducto}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre producto</Form.Label>
            <Form.Control placeholder="Producto"></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripcion del producto</Form.Label>
            <Form.Control type="text" placeholder="Descripcion" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoria">
            <Form.Label>Categoria del producto</Form.Label>
            <Form.Control type="text" placeholder="Categoria" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio del producto</Form.Label>
            <Form.Control type="text" placeholder="Precio" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="decimales">
            <Form.Label>Decimales del producto</Form.Label>
            <Form.Control type="text" placeholder="Decimales" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="moneda">
            <Form.Label>Moneda del producto</Form.Label>
            <Form.Control type="text" placeholder="Moneda" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Publicado/Eliminado/Borrador"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="es_nuevo">
            <Form.Check type="checkbox" label="Es nuevo" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fecha_de_alta">
            <Form.Label>Fecha de alta del producto</Form.Label>
            <Form.Control type="text" placeholder="DD-MM-YYYY" />
          </Form.Group>

          <Button variant="primary" onClick={handleShow}>
            Subir fotos
          </Button>
          <ModalSubirFotos
            handleClose={handleClose}
            show={show}
            setModalInputValues={setModalInputValues}
          />
          <br />
          <Button size="lg" className="m-4" type="submit" variant="success">
            {' '}
            Crear Producto
          </Button>
        </Form>
      </Row>

      <Row>
        {products?.map(({ id, nombre, descripcion, categoria, precio }) => (
          <Col xs={12} md={6} key={id}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>
                  {descripcion}
                  Precio: $ {precio} .- Categoria {categoria}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handlerEliminarProducto(id)}
                >
                  🗑
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MutationTry;