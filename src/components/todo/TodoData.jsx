const TodoData = (props) => {
    const { todoList, deleteToDo} = props;

    const handleOnClick = (id) => {
        deleteToDo(id);
    }

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={index}>
                        <div>{item.name}</div>
                        <button 
                        onClick={() => handleOnClick(item.id)}>Delete</button>
                    </div>)
            })}


        </div>
    );

}

export default TodoData;