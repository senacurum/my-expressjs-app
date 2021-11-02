import express from 'express';
import pgPromise from 'pg-promise';
const pgp=pgPromise({})
import * as dotenv from "dotenv";

dotenv.config();
const app = express()
const port = 3004
app.use(express.json());
//var pgp = require('pg-promise')(/* options */)
//var db = pgp('postgres://postgres:532014@localhost:5432/postgres')
// var db=pgp({
//   user:'pwzrbxfljgjtsc',
//   password:'bd30320e38a8cc8eb85d0160a732d612be434ed3834dcfd2b19cc0dd4cb78ae2',
//   host:'ec2-54-195-141-170.eu-west-1.compute.amazonaws.com',
//   database:'d7e0dng1ljmbor',
//   port:5432,
//   ssl:{
//     rejectUnauthorized:false
//   }

// })
var db=pgp({
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  host:process.env.DB_HOST,
  database:process.env.DB_DATABASE,
  port:5432,
  ssl:{
    rejectUnauthorized:false
  }

})
app.get('/', (req, res) => {
db.query('SELECT id,name,surname from "my_db"')
  .then(function (data) {
    res.send(data)
  })
  .catch(function (error) {
    res.send(error)
  })
});
app.post("/",(req,res)=>{
    db.one('INSERT INTO "my_db" (name,surname) VALUES($1,$2) RETURNING id',[req.body.name,req.body.surname],(event)=>event.id).then((data)=>{
        res.send(data)
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})