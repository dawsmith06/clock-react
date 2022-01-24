import React from 'react';
import { TodoItem } from './TodoItem';

export  function TodoList({todos,toggleTodo}) {
  return <ul>
      {todos.map((todo)=>(
            <li key={todo.id}>
                {todo.task}
                <input type="checkbox" checked={todo.completed} onChange={(e)=>toggleTodo(todo.id)}/>
            </li>
        //   <TodoItem todo={todo} key={todo.id}/>
      ))}
  </ul>;
}
