// PROXY 

var express = require('express');
var path = require('path');
let axios = require("axios");

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/API/:entity/:id?', async (req, res)=> {
    let base ="https://age-of-empires-2-api.herokuapp.com/api/v1/";
  
    let ent = req.params.entity;
    let id = req.params.id;
    let r;
    base = base+ent;
    if (!!id)
        base+='/'+id;
    console.log(base);
  
    r = {};
    try{
      r = await axios.get(base);
      r = r.data;
    }catch(e){
      console.log(e.message);
    }
    res.json(r);
  });
  
app.get('/', function(req, res, next) {
    res.sendFile('index.html');
});
app.listen(app.get('port'), () => {
    console.log('escuchando puerto '+app.get('port'));
})