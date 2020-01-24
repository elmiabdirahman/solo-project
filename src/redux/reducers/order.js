const orders = (state=[], action) => {
    if(action.type === `SET_ORDER`){
      return action.payload;
    }
    return state;
  }
  
  export default orders;