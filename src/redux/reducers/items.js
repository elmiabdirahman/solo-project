const items = (state=[], action) => {
    if(action.type === `SET_ALL_ITEMS`){
      return action.payload;
    }
    return state;
  }
  
  export default items;