const TodoData = (props) => {
    const {name,age,data} = props;
    const {todoList} = props;
    return (
        <div className='todo-data'>
            <div>Name : {name}</div>
            <div>Learning English</div>
            <div>Watching Youtube</div>
            <div>
                {JSON.stringify(todoList)}
            </div>
        </div>
    );

}

export default TodoData;