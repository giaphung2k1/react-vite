const TodoNew = (props) => {
    const { addNewTodo } = props;
    // addNewTodo('hungdz');
    const handleClick = () => {
        alert('click')
    }

    const handleOnChange= (name) =>{
        console.log("change",name);
        
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