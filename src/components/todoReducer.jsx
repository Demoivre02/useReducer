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