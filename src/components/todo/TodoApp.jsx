import './todo.css';
import TodoData from './TodoData';
import TodoNew from './TodoNew';
import reactLogo from '../../assets/react.svg';
import { useState } from 'react';
const TodoApp = () => {
	const [todoList, setTodoList] = useState([]);


	const randomIntFromInterval = (min, max) => { // min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const addNewTodo = (name) => {
		const newTodo = {
			id: randomIntFromInterval(1, 100000000000000000000),
			name: name
		}

		setTodoList([...todoList, newTodo]);
	}

	const deleteToDo = (id) => {
		const data = todoList.filter((item) => item.id !== id)
		setTodoList(data);
	}
	return (
		<div className="todo-container">
			<div className="todo-title">Todo List</div>
			<TodoNew
				addNewTodo={addNewTodo}
			/>



			{todoList.length > 0 ?
				<TodoData
					todoList={todoList}
					deleteToDo={deleteToDo}
				/>
				:
				<div className="todo-image">
					<img className='logo' src={reactLogo} alt="" />
				</div>
			}
		</div>
	)
}

export default TodoApp;