const newOrder = (state={}, action) => {
    if(action.type === `SET_NEW_ORDER`){
      return action.payload;
    }
    return state;
  }
  
  export default newOrder;