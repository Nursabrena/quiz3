let dbUsers =[
  {
      username: "sab",
      password: "12346",
      name: "nursabrena",
      email: "nrsbrnaaaa11@utem.edu.my"
  },
  {
      username: "John",
      password: "password",
      name: "john",
      email: "john@utem.edu.my"
  },
  {
      username: "ali",
      password: "54321",
      name: "Ali",
      email: "ali@utem.edu.my"
  }
]


function login(reqUsername, reqPassword) {
 let matchUser = dbUsers.find(
  x => x.username == reqUsername)     //cari username tu sama x dengan yang sstem sedia ada


  if(!matchUser) return "User not found!"   //kalau dia tkde dia tulis ni,

  if(matchUser.password == reqPassword) {  //ni kalau sama
     return matchUser                     //kalau ada return balik kt matchuser

   } else {
  return "Invalid password"              //kalau takde dia tulis invalid password
 }
}

function register(reqUsername, reqPassword, reqName, reqEmail) {
    dbUsers.push({
        username: reqUsername,
        password: reqPassword,
        name: reqName,
        email: reqEmail
    })
  }

const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');


app.use(express.json())

app.post('/login', (req, res) => {
  console.log(req.body)

  let result = login(
    req.body.username,
    req.body.password
  )
  //res.send(result)

  let token = generateToken(result)
  res.send(token)
})


app.get('/', (req, res) => {
  res.send('Hi World!')
})

app.get('/bye', verifyToken, (req, res, next ) => {
  res.send('bye World!')

})

app.post('/register', (req, res) => {
  let result = register(
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.email
  )

  res.send('ACCOUNT CREATED!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function generateToken(userData){
  const token = jwt.sign(
    userData,
    'inipassword'
  );

  return token

}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token=header.split(' ')[1]

  jwt.verify(token,'inipassword',function(err,decoded){
  if(err){
    res.send("Invalid Token")
  }
  
  req.user=decoded
  next()
});
}

