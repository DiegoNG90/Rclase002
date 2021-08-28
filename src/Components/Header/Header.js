import {memo} from 'react';
//Cuando trabajamos con componentes con props estáticas, memo nos puede servir: el componente queda en "memoria" y no se vuelve a renderizar.
import PropTypes from "prop-types";


const Header = memo(({title}) => {
    return  <h3>{title} 🍺</h3>;
})

//Documentación de PropTypes
Header.propTypes={
    title: PropTypes.string.isRequired
}
//Si no se pasa, salta un warning en la consola y nada más.
export default Header;
