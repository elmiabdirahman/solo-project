const getCustomer = (state=[], action) => {
    if(action.type === `SET_CUSTOMER`){
      return action.payload;
    }
    return state;
  }
  
  export default getCustomer;