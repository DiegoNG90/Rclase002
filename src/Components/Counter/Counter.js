import React, {useState} from 'react'

const Counter = () => {
    //Hooks (funciones que retornan y actualizan)
    //getters y setters
    //const [getter, setter] = useState(initialValue);
    const [counter, setCounter] = useState(0);
    
    const handleCounter = (operation) => { 
        if(operation === "+"){
            setCounter(counter +1)
            return;
        }
        setCounter(counter -1)
    }
    return (
        <>
            <h3> Contador: {counter} </h3>
            {/* Al pasar handleCounter como callback, evito que se ejecute una y otra vez; espera al evento para ejecutarse. */}
            <button onClick={() => handleCounter("+")}>+</button>
            <button onClick={() => handleCounter("-")}>-</button>
        </>
    )
}

export default Counter;