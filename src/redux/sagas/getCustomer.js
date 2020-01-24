import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getAllCustomers(){
    try{
        const response = yield axios.get('/customer');
        console.log(response.data); 
        yield put({ type:'SET_ALL_CUSTOMER', payload: response.data})
    }catch(error){
        console.log('error in get customer', error);  
    }
  }

  function* addCustomer(action){
    try{
      yield axios.post(`/customer`,  action.payload);
      yield put({type: `GET_ALL_CUSTOMER`});
    }
    catch(error){
        console.log('error in POST customer', error);
    }
  }

  function* getCustomer(action){
    console.log('in saga getcutomer ************', action.payload);
    try{
      const response = yield axios.get(`/customer/${action.payload.id}`);
      console.log(response.data); 
      yield put({ type:'SET_CUSTOMER', payload: response.data})
  }
  catch (err) {
      console.log('error from get customer', err);  
  }
  }

  //get order saga
  function* getOrder(action){
    console.log('Ordersssssss********', action);
    
    try{
      const response = yield axios.get(`/order/customer/${action.payload.id}`);
      console.log(response.data); 
      yield put({ type:'SET_ORDER', payload: response.data})
  }
  catch (err) {
      console.log('error from get customer', err);  
  }
  }

  //Edit put saga for cusmtomer
  function* editCustomer(action){
    try{
      console.log(action.payload)
        yield axios.put(`/customer/Edit/${action.payload.id}`, action.payload);
        yield put({type: `GET_CUSTOMER`, payload: action.payload});
    }
    catch(error){
        console.log('error in PUT edit Customer:', error);
    }
  }

  //check out saga for customer
  // function* getCheckOut(action){
  //   console.log('CheckOut Orderss&&&&&&&&&&&&&&&&&&&&', action);
  //   try{
  //     const response = yield axios.get(`/order/customer/${action.payload.id}`);
  //     console.log(response.data); 
  //     yield put({ type:'GET_CUSTOMER_ORDER', payload: response.data})
  //   }
  //   catch (err) {
  //       console.log('error from get customer', err);  
  //   }
  //   }
  
    //checkout saga for put items 
    function* checkOutSaga(action){
      try{
        console.log(action.payload)
          yield axios.put(`/customer/checkout/${action.payload.id}`, action.payload);
          yield put({type: `GET_CUSTOMER`, payload: action.payload});
      }
      catch(error){
          console.log('error in PUT edit items:', error);
      }
    }

    //delete purchases
    function* deleteSagaPurchase(action){
      console.log('saga delete purchase################', action.payload);
      try{
          console.log(action.payload)
          yield axios.delete(`/order/purchase/${action.payload.id}`);
          yield put({type: `GET_CUSTOMER_ORDER`, payload: action.payload.order_id.id});
      }
      catch(error){
          console.log('error in delete purchase', error);
      }
      }

  function* customerSaga() {
    yield takeEvery('GET_ALL_CUSTOMER', getAllCustomers);
    yield takeEvery('POST_CUSTOMER', addCustomer);
    yield takeEvery('GET_CUSTOMER', getCustomer);
    yield takeEvery('GET_CUSTOMER_ORDER', getOrder);
    yield takeEvery('EDIT_CUSTOMER', editCustomer);
    // yield takeEvery('POST_CHECKOUT', getCheckOut);
    yield takeEvery('EDIT_CHECKOUT', checkOutSaga);
    yield takeEvery('DELETE_PURCHASE', deleteSagaPurchase);

  }

  export default customerSaga;