Table of content:

What is useReducer?
parameters
practical example (Todo app).
why should you use useReducer
when you should not use useReducer




what is useReducer?
UseReducer is a React hook that assists in the management of intricate states. As the application expands, state updates become more challenging and less clear.  UseReducer is used to keep all logic in a centralized location making the code easier to read, test and debug. In the course of this article, we will build a simple todo list app that adds and deletes todos so that we can get a practical example on the application of useReducer.

To manage the state of a component using a reducer, you can call the useReducer hook at the top level of the component. This allows you to define the initial state and the reducer function that updates the state based on the action dispatched by the component.

```bash 
import { useReducer } from 'react';

function Demo(){
  const [currentState, dispatch] = useReducer (reducerFunction, initialState)

}
  
//...
```

Argument: 

The useReducer hook requires three Argument and one optional parameter viz:
1. The reducer function
2. Initial state
3. init function (optional)




The reducer function: 

As your application deals with an increasing number of events, it becomes increasingly challenging to quickly grasp all that is happening, which can be quite exasperating. Reducers enable you to gather all your state modification logic in a single location and return a single value. This implies that, for instance, when working on a to-do application, you do not have to generate separate functions for adding and deleting items, it can all be done in a single function, the reducer function.
The reducer function takes two arguments, viz:
a. State 
b. Action

The state is the initial state which you want to update, we shall talk more about the action as we proceed


<!-- make a reducer function here: -->

```bash
function reducer(state,  action){
  if(action.type === 'added'){
    //...  
  }
  else if (action.type === 'deleted') {
    //...
  } else {
    throw Error ('unknown': + action.type )
  }
}

```
The above code makes use of the traditional if/else statements, but it is conventional to use switch stattements(link) inside reducers. for example:

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

The initial state:
The type of the initial state can vary and can be an array, object, or string. In the reducer function, you modify the initial value that you want to update.

Init function(optional):
It is also possible to defer creating the initial state until it's needed. One way to achieve this is by providing an initialization function as the third argument. The value returned by init(initialArg) will be used as the initial state.This approach allows you to separate the calculation of the initial state from the reducer logic.

Returns:

The useReducer hook returns an array containing two elements:
a. The current state, which is the updated initial state after applying the dispatch function.
b. The dispatch function.

The dispatch function specifies the type of event being handled. The name "dispatch" suggests that it is responsible for sending out something, which in this case is an action object. Hence, the dispatch function send out the type of action to be carried out. The process of managing state with reducers differs from directly setting state in React. Instead of instructing React on "what to do" by changing the state, you specify "what the user just did" by dispatching actions from event handlers. The responsibility of updating the state resides outside of the component and is managed by the state update logic implemented elsewhere (in the reducer function).


An action [link] object is a plain JavaScript object that defines the type of event being executed. For example, if you are creating a to-do list that enables you to add and remove tasks, the dispatch function and action object will appear like this:

```bash
function handleAdding(){
  dispatch({
    type: 'added'
    //...
  })
  }
  
  functiom handleDeletion(){
      dispatch({
        type: 'deleted'
      })
  }
```


Building a simple todo app with useReducer:



```bash

//Todo.js


  import React,{useState ,useReducer } from 'react'
  import { todoReducer } from './todoReducer';

  function Todo() {

  const todoArry  = [
    {id : 1, name: "code "},
    {id : 2, name: "attend classes "},
    {id : 3, name: "eat "},
    {id : 4, name: "sleep "},
]

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


export default Todo

```


```bash

  //reducer.js

  export function todoReducer(todos , action ){
    
    switch (action.type) {
        case 'added':{
               return [
                ...todos , {id: action.id , name : action.text}
               ]
        }
            
        case 'deleted': {
            return todos.filter((x)=> x.id != action.id)
        }
    
        default:{
            throw Error ('unidentified action : ' + action.type)
        }
            
    }
  }

```

The code above implements a simple todo list using React's useState and useReducer hooks.

The Todo component initializes a state for todoArry, an array of objects representing the todo items. It also defines three additional pieces of state:

value: a string that stores the current input value of the add todo input field.
myTodos: the state object returned by the useReducer hook, which manages the todo items in the array.
lastId: an integer that keeps track of the last todo item's ID.
The stateSetters function sets the state for lastId to lastId + 1 and value to an empty string.

The addTodo function dispatches an action object with a type of added, a unique id based on lastId, and the text of the todo item to be added. The todoReducer function then handles the action and updates the myTodos state array by adding a new object representing the todo item.

The deleteTodo function dispatches an action object with a type of deleted and the ID of the todo item to be deleted. The todoReducer function then handles the action and updates the myTodos state array by removing the object with the specified ID.

The Todo component returns a form that allows the user to input new todo items and a list of existing todo items. When the user enters a new todo item and clicks the "Add" button, the addTodo function is called to dispatch the added action and update the myTodos state. The stateSetters function is also called to reset the input field and increment the ID counter. When the user clicks the "Delete" button next to an existing todo item, the deleteTodo function is called to dispatch the deleted action and update the myTodos state by removing the specified todo item.

The todoReducer function takes in two arguments: the current state array of todo items and an action object that describes the desired state change. It uses a switch statement to determine the appropriate update to the state based on the type property of the action object. If the type is added, the function returns a new array with the previous state and a new object representing the added todo item. If the type is deleted, the function returns a new array with all of the todo items except for the one with the specified id. If the action type is not recognized, an error is thrown.




Why you should use useReducer:

1. Code Reduction:
While using useReducer, it may appear that you're writing more code due to creating dispatch and reducer functions. However, this is not always the case. In certain scenarios, when you have to handle numerous events, you may end up adding more logic to your state-setting function, which ultimately makes it bulkier. But, by utilizing the useReducer hook, you can opt to define your dispatch functions as inline functions, which means you only need to have a separate reducer function outside your component. This approach results in a cleaner and more concise component, with fewer lines of code.


2. Scalability: 
A scalable codebase must have several key characteristics such as maintainability, independence, customizability, and readability. One way to achieve this is by utilizing the useReducer hook in React. By encapsulating all of your logic in a single function, you can avoid the need to create multiple functions that handle different events, which ultimately makes your codebase easier to scale. With useReducer, you can maintain a more organized and concise codebase, making it easier to read, customize, and maintain in the long term.

3. Continuous testing:
A reducer function is a pure function that does not rely on any component-specific logic or state. As a result, you can export and test it separately from your component, in isolation. This approach provides several benefits, such as better modularity, improved testability, and easier maintenance. By keeping your reducer function independent of your component, you can ensure that it remains reusable and adaptable, making it simpler to manage and extend over time.

When you should use useReducer:
The useReducer hook is generally considered more suitable than useState when dealing with complex state logic that involves multiple sub-values or when the next state depends on the previous one. This is because useReducer provides a more structured approach to state management, allowing you to encapsulate your state logic in a separate reducer function. With useReducer, you can manage your state more effectively, breaking it down into smaller, more manageable pieces, and updating it more efficiently. This approach is particularly useful when dealing with stateful logic that involves multiple interdependent variables or when you need to implement more complex state transitions or update logic.


when you should not useReducer:
1. Simple state management: If your applicatin is handling simple state that requires very simple logic, you may not need to use useReducer. You should consider using the useState hook which is simpler and more easier to implement

2. Small application:If you're developing a basic counter application that only needs to increase or decrease a count, it would be more appropriate to use the useState hook to manage state locally within the component.

3. Shared state Management: 
When multiple components in your application need to share state management, using useReducer may not be the optimal choice. Instead, you should consider utilizing other state management tools such as Redux or MobX.








