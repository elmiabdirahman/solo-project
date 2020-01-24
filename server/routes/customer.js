const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//Get all customer
router.get('/', rejectUnauthenticated, (req, res)=>{
    console.log('customer route for get');
    const queryCustomer = 'SELECT "id", "first_name", "last_name", "phone_number" FROM "customer"';
    
    pool.query(queryCustomer).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT customer quert ', error);
        res.sendStatus(500);
    })
});

// Post sql customer info
router.post( '/', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body);
    //insert data
    const queryText = `INSERT INTO customer ("first_name", "last_name", "phone_number")
        VALUES ($1, $2, $3)`;
        pool.query(queryText, [req.body.first_Name, req.body.last_name, req.body.phone_number])
        .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error POST /All Customers**************', error)
        res.sendStatus(500);
    });
 })

 //post each customer by id 
 router.get('/:id', rejectUnauthenticated, (req, res)=>{
     let id = [req.params.id]
    console.log('from customer id route', id);
    const queryCustomer = 'SELECT "id", "first_name", "last_name", "phone_number" FROM "customer" where id = $1';
    
    pool.query(queryCustomer, id).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT customer quert ', error);
        res.sendStatus(500);
    })
});

router.put(`/Edit/:id`, rejectUnauthenticated, (req, res)=>{
    // let id = [req.params.id, req.body.first_name, req.body.last_name, req.body.phone_number];
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let phoneNumber = req.body.phone_number;
    let id = req.body.id
    console.log(req.body);
    let SQLquery = `UPDATE "customer" SET "first_name" = $1, "last_name" = $2, "phone_number" = $3 WHERE id = $4;`;
    pool.query(SQLquery, [firstName, lastName, phoneNumber, id])
    .then(result=>{
      res.sendStatus(200);
    })
    .catch(error=>{
      console.log('ERROR IN /id PUT customer -------------------------------->', error);
      res.sendStatus(500);
    });
  });

  //checkout put button 
  router.put(`/checkout/:id`, rejectUnauthenticated, (req, res)=>{
    console.log('in item update route *********************');
    let total = req.body.total;
    let paid = req.body.paid;
    let id = req.params.id
    console.log(req.body, id);
    let SQLquery = `UPDATE "order" SET "total" = $1, "paid" = $2 WHERE id = $3;`;
    pool.query(SQLquery, [ total, paid, id])
    .then(result=>{
      res.sendStatus(200);
    })
    .catch(error=>{
      console.log('ERROR IN /id PUT item update -------------------------------->', error);
      res.sendStatus(500);
    });
  });


module.exports = router;