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
	// const name = "Miracle";
	const age = 25;
	const data = {
		address: 'HN',
		country: 'VietNam'
	}

	const randomIntFromInterval = (min, max) => { // min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const addNewTodo = (name) => {
		const newTodo = {
			id: randomIntFromInterval(1,100000000000000000000),
			name: name
		}

		setTodoList([...todoList, newTodo]);
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
