const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');
const path = require('path')
const vitamin_list = require('./vitamin_qualities.js');
const aws = require('aws-lib');
<<<<<<< HEAD
=======
const bodyParser = require('body-parser');

>>>>>>> 4739eada5aa911d92fa8545d123de354f49ccfd6
let reports = [];

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Use the session middleware
app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'YOURSECRET',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.get('/', async (req, res) => {
  // res.sendFile(path.join(__dirname, '/frontend/index.html'));


  const authorizeUrl = await genomeLink.OAuth.authorizeUrl({scope: vitamin_list.join(' '), clientId: GENOMELINK_CLIENT_ID, callbackUrl: GENOMELINK_CALLBACK_URL});

  res.render('index', {
    authorize_url: authorizeUrl,
  });

});

app.get('/callback', async (req, res) => {
  // The user has been redirected back from the provider to your registered
  // callback URL. With this redirection comes an authorization code included
  // in the request URL. We will use that to obtain an access token.

  req.session.oauthToken = await genomeLink.OAuth.token({ requestUrl: req.url });
  // genomeLink.OAuth.token({ requestUrl: req.url }).then((res) => console.log(res));
  // console.log(req.session.oauthToken);

  res.redirect('/single_page');
});

app.get('/single_page', async (req,res) => {

  if (req.session.oauthToken) {
    const scopes = vitamin_list;
    reports = await Promise.all(scopes.map( async (name) => {
      return await genomeLink.Report.fetch({
        name: name.replace(/report:/g, ''),
        population: 'european',
        token: req.session.oauthToken
      })
    }));
  }

  res.sendFile(path.join(__dirname, '/frontend/react_index.html'));

});

app.get('/report', (req,res) => {
  const present_reports = reports.map((el) => { return {phenotype: el.phenotype.display_name,
                                                        summary: el.summary.text,
                                                        score: el.summary.score}; });
  res.json(present_reports);
})

<<<<<<< HEAD
app.get('/aws', async (req,res) => {
  
  let prodAdv = aws.createProdAdvClient('AKIAIV5LBVLYWEEHDY6Q', 'AHU68vB//Ask3AgqyWWbPoagus5oBvFFTciRopnz', 'vitadetective-20');
  
  let options = { SearchIndex: "Books", Keywords: "Javascript" }
          
=======

app.get('/aws', async (req,res) => {

  let prodAdv = aws.createProdAdvClient(

  let options = { SearchIndex: "HealthPersonalCare", Keywords: req.query.query }

>>>>>>> 4739eada5aa911d92fa8545d123de354f49ccfd6
  prodAdv.call("ItemSearch", options, function(err, result) {
      res.json(result);
  });
});

<<<<<<< HEAD

=======
>>>>>>> 4739eada5aa911d92fa8545d123de354f49ccfd6
// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
