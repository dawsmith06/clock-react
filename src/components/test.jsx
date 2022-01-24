import React,{Fragment,useRef,useState, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import moment from "moment-timezone";

export function App(){
    var sd = moment();
    var time = sd.tz('America/Santo_Domingo').format('ha z'); 

    console.log(time);
    // var dec = moment("2014-12-01T12:00:00Z");


    const [todos,setTodos] = useState([]);
    const inputTask = React.createRef();

    useEffect(()=>{
        const todos = JSON.parse(localStorage.todos || '[]');
        setTodos(todos);
    },[]);

    useEffect(()=>{
        localStorage.todos = JSON.stringify(todos);
    },[todos]);


    const addNewTask= () =>{
        const task = inputTask.current.value;
        if(task !== ''){
            setTodos((prevTodos) => {
                return [...prevTodos, {id : Math.random(),task,completed:false}];
            });

            inputTask.current.value = null;
        }
    };

    const _handleKeyUp =  (e) => {
        if(e.keyCode == 13){
            addNewTask();
        }
    };

    const toggleTodo = (id)=>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    var completedTask = todos.filter(todo => !todo.completed).length;

    return (
        <Fragment>
            <div className="row m-0">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>

            {/* <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input type="text" placeholder="Nueva Tarea" ref={inputTask} onKeyUp={_handleKeyUp}/>
            <button onClick={addNewTask}>➕</button>
            <button onClick={() => setTodos([])}>🗑</button>
            <div>Te quedan {completedTask} tareas por terminar</div> */}
        </Fragment>
    )
}