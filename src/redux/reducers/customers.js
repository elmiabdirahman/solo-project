const customersInfo = (state=[], action) => {
    if(action.type === `SET_ALL_CUSTOMER`){
      return action.payload;
    }
    return state;
  }
  
  export default customersInfo;