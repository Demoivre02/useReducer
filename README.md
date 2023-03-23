# useReducer


Table of content:

What is useReducer?
parameters
what are the problems useReducer solves
why should you use useReducer
when you should use useReducer
practica examples.



what is useReducer?
UseReducer is a React hook that assists in the management of intricate states. As the application expands, state updates become more challenging and less clear.  UseReducer is used to keep all logic in a centralized location making the code easier to read, test and debug.

```bash 
import { useReducer } from 'react';

function Demo(){
  const [currentState, dispatch] = useReducer (reducerFunction, initialState)
  
//...
```

parameters: 


1. The reducer function:

As your application deals with an increasing number of events, it becomes increasingly challenging to quickly grasp all that is happening, which can be quite exasperating. Reducers enable you to gather all your state modification logic in a single location. This implies that, for instance, when working on a to-do application, you do not have to generate separate functions for adding and deleting items, it can all be done in a single function, the reducer function.
The reducer function takes two arguments, viz:
1. State 
2. Action

The state is the initial state which you want to update

2. The initial state:
The type of the initial state can vary and can be an array, object, or string. In the reducer function, you modify the initial value that you want to update.
