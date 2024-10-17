import { useState } from "react";

const TodoNew = (props) => {


    const [valueInput, setValueInput] = useState()

    const { addNewTodo } = props;
    // addNewTodo('hungdz');
    const handleClick = () => {
        addNewTodo(valueInput);        
    }

    const handleOnChange= (name) =>{
        setValueInput(name)
        
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            
        </div>
    );
}

export default TodoNew;