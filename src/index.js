const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const ejs = require('ejs')

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//home
app.get('/', (req, res) => {
  res.render('home')
})

//display all users
app.get('/users', (req, res) => {
  fs.readFile('../public/users.json', function(err, data) {
    if (err) {
      console.log("error");
      throw err;
    } else {
      let obj = JSON.parse(data)
      let sorted = obj.sort(function(a, b){
    if(a.lastname < b.lastname) return -1;
    if(a.lastname > b.lastname) return 1;
    return 0;
})
      res.render('users', {
        sorted:sorted
      })
    };
  });
});

//search for user
app.get('/search', (req, res) => {
  let notFound = ""
  res.render('search', {
    notFound:notFound
  })
});

//display result of user search
app.post('/result', (req, res) => {
  fs.readFile('../public/users.json', function(err, data) {
    if (err) {
      throw err;
    };
    let obj = JSON.parse(data);
    for (var i = 0; i < obj.length; i++) {
      if ((req.body.FirstName.toLowerCase() === obj[i].firstname.toLowerCase()) || (req.body.LastName.toLowerCase() === obj[i].lastname.toLowerCase())) {
        let print = obj[i];

        res.render('result', {
          print: print
        });
      }
    }
    let notFound = "The user " + req.body.FirstName + " " + req.body.LastName + " was not found."
    res.render('search', {
        notFound: notFound
      })
  })
})

//form to add user
app.get('/addUser', (req, res) => {
  let error = ""
  res.render('addUser',{
    error:error
  })
});

//add new user to file and display all users including new one
app.post('/userAdded', (req, res) => {
  let error = "Please complete all fields before submitting."
  if ((req.body.firstname == "")||(req.body.lastname == "")||(req.body.email == ""))
  res.render('addUser', {
    error:error
  })
  else{
  fs.readFile('../public/users.json', function(err, data) {
    if (err) {
      throw err
    };
    var obj = JSON.parse(data);
    let newUser = req.body;
    let pushed = obj.push(newUser);

    fs.writeFile('../public/users.json', JSON.stringify(obj))
    let added = JSON.parse(data);
    let sorted = added.sort(function(a, b){
  if(a.lastname < b.lastname) return -1;
  if(a.lastname > b.lastname) return 1;
  return 0;
})
    res.render('users', {
      sorted:sorted
    })
  })
}
})







const server = app.listen(3030, function() {
  console.log("port: " + server.address().port);
});
