import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import reactLogo from './assets/react.svg';
import { useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';


const App = () => {

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
		<>
			<Header/>
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
			<Outlet/>
			<Footer/>
		</>


	)
}

export default App
