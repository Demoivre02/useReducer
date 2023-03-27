# Everything You Should Know about useReducer as a React Developer

## What is useReducer?
useReducer is a hook - **a function that is used only inside a react component** - that assists in the management of complex states. As the application expands to require more states, state updates become more challenging and less clear.  useReducer is used to keep state logics in a centralized location making the code easier to read, test and debug. 

In the course of this article, we will build a simple Todo List App. This will help you have a practical experience on the use of useReducer. The app will have the following functions
* adds todo,
* delete todo

To manage the state of a component, you can call the useReducer hook at the top level of the component. It takes an initial state and the reducer function as an argument.

```bash 
import { useReducer } from 'react';

function Demo(){
  const [currentState, dispatch] = useReducer (reducerFunction, initialState)
}
```

## Arguments of a useReducer
The useReducer hook requires three Argument. Two are required and last one optional.
1. The reducer function. This updates the state based on the action dispatched by a component.
2. Initial state
3. init function (optional)

## The reducer function:

As your application deals with an increasing number of events, it becomes increasingly challenging to quickly grasp all that is happening. Reducers enable you to gather all your events and their handlers in a single function which returns a single value. This implies that, for instance, when working on a to-do application, you do not have to generate separate functions for each events in our case being adding and deleting todo. They can all be done in a single reducer function.

The reducer function takes two arguments:
a. State 
b. Action

The state is the initial state that would be updated by the call of an event. See the code below for an example.


```bash
function reducer(state,  action){
  if(action.type === 'added'){
    //...  
  } else if (action.type === 'deleted') {
    //...
  } else {
    throw Error ('unknown': + action.type )
  }
}

```
The above code makes use of the traditional if/else statements, but it is conventional to use switch stattements(link) instead.

```bash
function reducer(state,  action){
  switch (action.type){
    case: 'added':{
      //...
    }
    case 'deleted': {
      //...
    }
    default:{
      throw Error ('unknown': + action.type )
    }
  }
}

```

### The initial state
The type of the initial state varies. It can be an array, object, or string. To modify/update the initial value, we do that inside the reducer function.

### Init function(optional)
It is also possible to defer creating the initial state until it's needed. One way to achieve this is by providing an Init function as the third argument. The value returned by Init function will be used as the initial state, `init(initialState)`.This approach allows you to separate the derivation of the initial state from the reducer logic.

## Return Value of a useReducer

The useReducer hook returns an array containing two elements.
a. The state, this serves as both the initial state and updated state after applying the dispatch function.
b. The dispatch function. This function takes two arguments: the action and an optional payload object.

The dispatch function specifies the type of event being handled. The name "dispatch" suggests that it is responsible for sending out something, which in this case is an action object. Hence, the dispatch function send out the type of action to be carried out. The process of managing state with useReducers differs from the use of useState. Instead of instructing React on **"what to do"** by changing the state, you specify **"what the user just did"** by dispatching actions from event handlers.


An action [link] is a plain JavaScript object that defines the type of event being executed. For example, if you are creating a to-do list that enables you to add and remove todo, the dispatch function and action object will appear like this:

```bash
function handleAdding(){
  dispatch({type: 'added'})
  }
  
functiom handleDeletion(){
  dispatch({
    type: 'deleted'
  })
}
```


## Building our sample app, The To-do

```bash

//Todo.js


  import { useState, useReducer } from 'react'
  import { todoReducer } from './todoReducer'; // we've not written this code yet

  function Todo() {
  const todoArray  = [
    {id : 1, name: "code"},
    {id : 2, name: "attend classes"},
    {id : 3, name: "eat"},
    {id : 4, name: "sleep"},
  ]

  const [todos , dispatchTodo] = useReducer( todoReducer, todoArray )
  const [value,  setValue] = useState("")
  const [lastId, setLastId] = useState (5)


  function addTodo (todoitem){
    dispatch ({
        type: 'added',
        payload: {
          id: lastId, 
          text : todoitem
        }
    })
  }
  
  handleAddTodo (todoItem) {
    addTodo(todoItem)
    setLastId(lastId + 1)
    setValue('')
  }

  function deleteTodo (todoId){
    dispatch({
        type : 'deleted',
        payload: {
          id: todoId
        }
    })
  }


  return (
    <div>
       <input  type="text" placeholder="enter todo" value={value} onChange={(event)=> setValue(event.target.value)}/>
       <button onClick={()=> {handleAddTodo(value)}>Add</button>

       {
        todos.map(todo=> (
            <div className='flex' key={todo.id}> 
              <p className='name'>{todo.name}</p> 
              <button className='del' onClick={()=> deleteTodo(todo.id)}>Delete</button> 
            </div>
          ))
        }
       
    </div>
  )
}


export default Todo

```


```bash

  //reducer.js

  export function todoReducer(todos , action ){
    
    switch (action.type) {
        case 'added': 
          [...todos , {id: action.payload.id , name : action.payload.text}];
          break;
        case 'deleted':
          todos.filter((todo)=> todo.id != action.payload.id);
          break;
        default:
          throw Error ('unidentified action : ' + action.type)   
    }
    
  }

```

The code above implements a simple todo list using React's useState and useReducer hooks.

The Todo component initializes a state for todoArray, an array of objects representing the todo items. It also defines three additional pieces of state:
* value: a string that stores the current input value of the add todo input field.
* todos: the state object returned by the useReducer hook, which manages the todo items in the array.
* lastId: an integer that keeps track of the last todo item's ID.

The addTodo function dispatches an action object with a type of added, a unique id based on lastId, and the text of the todo item to be added. The todoReducer function then handles the action and updates the todos state array by adding a new object representing the todo item.

The deleteTodo function dispatches an action object with a type of deleted and the ID of the todo item to be deleted. The todoReducer function then handles the action and updates the todos state array by removing the object with the specified ID.

The Todo component returns a form that allows the user to input new todo items and a list of existing todo items. When the user enters a new todo item and clicks the "Add" button, the addTodo function is called to dispatch the added action and update the myTodos state. The stateSetters function is also called to reset the input field and increment the ID counter. When the user clicks the "Delete" button next to an existing todo item, the deleteTodo function is called to dispatch the deleted action and update the todos state by removing the specified todo item.

The todoReducer function takes in two arguments: the current state array of todo items and an action object that describes the desired state change. It uses a switch statement to determine the appropriate update to the state based on the type property of the action object. If the type is added, the function returns a new array with the previous state and a new object representing the added todo item. If the type is deleted, the function returns a new array with all of the todo items except for the one with the specified id. If the action type is not recognized, an error is thrown.




## Why you should use useReducer

1. Code Reduction
While using useReducer, it may appear that you're writing more code due to creating dispatch and reducer functions. However, this is not always the case. In certain scenarios, when you have to handle numerous events and states, handling different events and complex interactions with multiple states can get messier. But, by utilizing the useReducer hook, you can opt to define your dispatch functions as inline functions, which means you only need to have a separate reducer function outside your component. This approach results in a cleaner and more concise component, with fewer lines of code.


2. Scalability: 
A scalable codebase must have key characteristics such as maintainability, coupling, customizability, and readability. One way to achieve this is by utilizing the useReducer hook in React. By encapsulating all of your logic in a single function, you can avoid the need to create multiple functions that handle different events, which ultimately makes your codebase easier to scale.

3. Testing:
A reducer function is a pure function that does not rely on any component-specific logic or state. As a result, you can export and test it separately from your component, in isolation. This approach provides several benefits, such as better modularity, improved testability, and easier maintenance. By keeping your reducer function independent of your component, you can ensure that it remains reusable and adaptable, making it simpler to manage and extend over time.


## When you should not useReducer:
1. Simple state management: If your applicatin is handling simple state that requires very simple logic, you may not need to use useReducer. You should consider using the useState hook which is simpler and more easier to implement.

2. Small application:If you're developing a basic application eg Counter Application that only needs to increase or decrease a count. It would be more appropriate to use the useState hook to manage state locally within the component.

3. Shared state Management: 
When multiple children components in a parent component need to share props, using useReducer may not be the optimal choice. Instead, you should consider utilizing other state management tools such as Redux or MobX.








