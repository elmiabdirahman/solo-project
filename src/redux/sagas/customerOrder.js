import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//get order for customer
function* getOrder(action){
    console.log('Get Order *********', action.payload);
    
    try{
        const response = yield axios.get(`/order/${action.payload.id}`);
        yield put({type: `SET_NEW_ORDER`, payload: response.data[0]});
      }
      catch(error){
          console.log('error in POST customer', error);
      }
  }

  //post order for customer
  function* postOrder(action){
      console.log('post Order ************************', action.payload);
      
    try{
       const response = yield axios.post(`/order`,  action.payload);
       console.log('Post response*&&&&&&&&&&&&&', response);
       
        yield put({type: `GET_ORDER`, payload: response.data[0]});
      }
      catch(error){
          console.log('error in POST customer', error);
      }
  }

  //get items for order
  function* getAllItems(action){
    console.log('in saga get items ************', action);
    console.log(action.payload)
    try{
        const response = yield axios.get(`/item/${action.payload}`);
        console.log(response.data); 
        yield put({ type:'SET_ALL_ITEMS', payload: response.data})
    }catch(error){
        console.log('error in get customer', error);  
    }
  }

  //post item for order
  function* postItems(action){
      console.log('saga order item post################', action.payload);
  try{
      console.log(action.payload)
      yield axios.post(`/order/item`,  action.payload);
      yield put({type: `GET_ALL_ITEMS`, payload: action.payload.order_id.id});
  }
    catch(error){
        console.log('error in POST item', error);
    }
  }

  //Delete item
  function* deleteItems(action){
    console.log('saga order item post################', action.payload);
    try{
        console.log(action.payload)
        yield axios.delete(`/item/${action.payload.id}`);
        yield put({type: `GET_ALL_ITEMS`, payload: action.payload.order_id.id});
    }
    catch(error){
        console.log('error in POST item', error);
    }
    }

function* orderSaga() {
    yield takeEvery('GET_ORDER', getOrder);
    yield takeEvery('ADD_ORDER', postOrder);
    yield takeEvery('ADD_ITEMS', postItems);
    yield takeEvery('GET_ALL_ITEMS', getAllItems);
    yield takeEvery('DELETE_ITEM', deleteItems);

}

export default orderSaga;