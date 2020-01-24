const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res)=>{
    console.log(req.params.id);
    let id = [req.params.id]
    console.log('order/items Order route for get', id);
    const queryItems= 'SELECT "id", "order_id", "description", "price" FROM "item" where order_id = $1';
    
    pool.query(queryItems, id).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT Order for items route quert ', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res)=>{
    // let id = req.params.id
    // console.log('order/items Order route for get', id);
    // const queryItems= 'DELETE FROM "item" where id = $1;';
    // console.log('============================', id)
    
    // pool.query(queryItems, id)
    // .then(() => res.sendStatus(200))
    // .catch( (error) =>{
    //     console.log('Error from SELECT Order for items route quert ', error);
    //     res.sendStatus(500);
    // })
    console.log('==============',req.params.id)
    pool.query(`DELETE FROM "item" where id = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(()=> res.sendStatus(500))
});

module.exports = router;