const TodoData = (props) => {
    const {name,age,data} = props;
    return (
        <div className='todo-data'>
            <div>Name : {name}</div>
            <div>Learning English</div>
            <div>Watching Youtube</div>
        </div>
    );

}

export default TodoData;