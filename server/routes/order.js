const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//Custer order for get
//ALL SALES
router.get('/', rejectUnauthenticated, (req, res)=>{
    console.log('customer Order route for get');
    const queryOrder= 'SELECT "id", "customer_id", "date", "total", "paid" FROM "order"';
    
    pool.query(queryOrder).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT Order for Customer route quert ', error);
        res.sendStatus(500);
    })
});

//get view order table
router.get('/:id', rejectUnauthenticated, (req, res)=>{
    let id = [req.params.id]
   console.log('from order id route', id);
   const queryCustomer = 'SELECT "id", "customer_id", "date", "total", "paid" FROM "order" where id = $1';
   
   pool.query(queryCustomer, id).then(( results ) =>{
       res.send(results.rows);
   }).catch( (error) =>{
       console.log('Error from SELECT order quert ', error);
       res.sendStatus(500);
   })
});

//
router.get('/customer/:id', rejectUnauthenticated, (req, res)=>{
    let id = [req.params.id]
   console.log('from order id route', id);
   const queryCustomer = 'SELECT "id", "customer_id", "date", "total", "paid" FROM "order" where "customer_id" = $1';
   
   pool.query(queryCustomer, id).then(( results ) =>{
       res.send(results.rows);
   }).catch( (error) =>{
       console.log('Error from SELECT order quert ', error);
       res.sendStatus(500);
   })
});
//
router.post( '/', rejectUnauthenticated, (req, res) => {
    console.log('req.body orde post #########', req.body);
    //insert queryText for order 
    const queryText = `INSERT INTO "order" ("customer_id", "date")
    VALUES ($1, CURRENT_DATE) returning id`;
        pool.query(queryText, [req.body.customer_id])
        .then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error POST /All Customers**************', error)
        res.sendStatus(500);
    });
 })

//post route for item
 router.post( '/item', rejectUnauthenticated, (req, res) => {
    console.log('req.body Item POST Server &&&&&&&&&', req.body);
    //insert queryText for item
    // console.log(req.body.order_id.id)
    // console.log(req.body.order_id)
    const queryText = `INSERT INTO "item" ("order_id", "description", "price")
    VALUES ($1, $2, $3)`;
        pool.query(queryText, [req.body.order_id.id, req.body.item, req.body.price])
        .then((results) => {
        res.sendStatus(200);;
    }).catch((error) => {
        console.log('Error POST /Items POST Server**************', error)
        res.sendStatus(500);
    });
 })

 router.delete('/purchase/:id', rejectUnauthenticated, (req, res)=>{
    console.log('==============',req.params.id)
    pool.query(`DELETE FROM "order" where id = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch((error) => {
        console.log('Error /delete Server**************', error)
        res.sendStatus(500);
    });
});

module.exports = router;