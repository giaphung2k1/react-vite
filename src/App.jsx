import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import reactLogo from './assets/react.svg';
import { useState } from 'react';
const App = () => {

	const [todoList, setTodoList] = useState([
		{ id: 1, name: 'Learning English' },
		{ id: 2, name: 'Watching Youtube' },
	])
	const name = "Miracle";
	const age = 25;
	const data = {
		address: 'HN',
		country: 'VietNam'
	}

	const addNewTodo = (name) => {
		alert(`Hello ${name}`);
	}

	return (
		<div className="todo-container">
			<div className="todo-title">Todo List</div>
			<TodoNew
				addNewTodo={addNewTodo}
			/>
			<TodoData
				name={name}
				age={age}
				data={data}
				todoList={todoList}
			/>
			<div className="todo-image">
				<img className='logo' src={reactLogo} alt="" />
			</div>
		</div>

	)
}

export default App
