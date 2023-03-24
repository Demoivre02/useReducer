Table of content:

What is useReducer?
parameters
why should you use useReducer
when you should use useReducer
practical examples.



what is useReducer?
UseReducer is a React hook that assists in the management of intricate states. As the application expands, state updates become more challenging and less clear.  UseReducer is used to keep all logic in a centralized location making the code easier to read, test and debug. In the course of this article, we will build a simple todo list app that adds and deletes todos so that we can gan get a practical example on the application of useReducer.


```bash 
import { useReducer } from 'react';

function Demo(){
  const [currentState, dispatch] = useReducer (reducerFunction, initialState)

}
  
//...
```

parameters: 

The useReducer hook requires two parameters and one optional parameter viz:
1. The reducer function
2. Initial state
3. init function (optional)

1. The reducer function: 

As your application deals with an increasing number of events, it becomes increasingly challenging to quickly grasp all that is happening, which can be quite exasperating. Reducers enable you to gather all your state modification logic in a single location and return a single value. This implies that, for instance, when working on a to-do application, you do not have to generate separate functions for adding and deleting items, it can all be done in a single function, the reducer function.
The reducer function takes two arguments, viz:
a. State 
b. Action

The state is the initial state which you want to update, we shall talk more about the action as we proceed

2. The initial state:
The type of the initial state can vary and can be an array, object, or string. In the reducer function, you modify the initial value that you want to update.

3. Init function(optional):
This function specifies 

Returns:

The useReducer hook returns an array containing two elements:
a. The current state, which is the updated initial state after applying the dispatch function.
b. The dispatch function.

The dispatch function specifies the type of event being handled. The name "dispatch" suggests that it is responsible for sending out something, which in this case is an action object. Hence, the dispatch function send out the type of action to be carried out. The process of managing state with reducers differs from directly setting state in React. Instead of instructing React on "what to do" by changing the state, you specify "what the user just did" by dispatching actions from event handlers. The responsibility of updating the state resides outside of the component and is managed by the state update logic implemented elsewhere (in the reducer function).


An action object is a plain JavaScript object that defines the type of event being executed. For example, if you are creating a to-do list that enables you to add and remove tasks, the dispatch function and action object will appear like this:

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

Why you should use useReducer:






