import React,{useState ,useReducer } from 'react'
import { todoArry } from '../array';
import { todoReducer } from './todoReducer';

function Form() {

  const [value,  setValue] = useState("")
  const [myTodos , dispatch] = useReducer( todoReducer, todoArry )
  const [lastId, setLastId] = useState (5)


  function stateSetters(){
    setLastId(lastId + 1)
    setValue('')
  }

  function addTodo (todoitem){
    dispatch ({
        type: 'added',
        id: lastId, 
        text : todoitem
    })
  }

  function deleteTodo (todoId){
    dispatch({
        type : 'deleted',
        id :  todoId
    })
  }


  return (
    <div>
       <input  type={"text"} placeholder="enter todo" value={value} onChange={(e)=> setValue(e.target.value)}/>
       <button className='button' onClick={()=> {addTodo(value); stateSetters() }}>Add</button>

       {myTodos.map((x)=> <div className='flex' key={x.id}> <p className='name'>{x.name}</p> <button className='del' onClick={()=> deleteTodo(x.id)}>Delete</button> </div>)}
       
    </div>
  )
}

export default Form