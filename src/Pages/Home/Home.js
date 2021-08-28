import {Container} from 'react-bootstrap'

import Header from '../../Components/Header/Header'
import Counter from '../../Components/Counter/Counter';
import Work from '../../Components/Work/Work';

const Home = () => {
    return (
      <Container>
        <Header title="Birra" />
        <Counter />
        <Work />
      </Container>
    );
}

export default Home;