const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');
const path = require('path')
const vitamin_list = require('./vitamin_qualities.js');
const aws = require('aws-lib');
const bodyParser = require('body-parser');

const VARIABLES = require('./env_variables.js');

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
  // console.log(VARIABLES.GENOMELINK_CLIENT_ID);
  const authorizeUrl = await genomeLink.OAuth.authorizeUrl({scope: vitamin_list.join(' '), clientId: VARIABLES.GENOMELINK_CLIENT_ID, callbackUrl: VARIABLES.GENOMELINK_CALLBACK_URL});

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
  console.log(req.session.oauthToken);
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

   const dummyData = [ {"phenotype":"Protein intake","score": 1, "summary":"Tend not to be a protein seeker"},

   {"phenotype":"Vitamin A","score": 0,"summary":"Lower serum level"},

   {"phenotype":"Vitamin B12","score": 1,"summary":"Slightly lower serum level"},

   {"phenotype":"Vitamin E","score": 2,"summary":"Intermediate"},

   {"phenotype":"Vitamin D","score": 2,"summary":"Intermediate"},

   {"phenotype":"Response to vitamin E supplementation","score": 0,"summary":"Weak response"},

   {"phenotype":"Folate","score": 2,"summary":"Intermediate"},

   {"phenotype":"Calcium","score": 2,"summary":"Intermediate"},

   {"phenotype":"Iron","score": 2,"summary":"Intermediate"},

   {"phenotype":"Magnesium","score": 1,"summary":"Slightly lower serum level"},

   {"phenotype":"Phosphorus","score": 3,"summary":"Slightly higher serum level"} ];

  res.json(dummyData);
})


app.get('/aws', async (req,res) => {

  let prodAdv = aws.createProdAdvClient(VARIABLES.AWS_1, VARIABLES.AWS_2, VARIABLES.AWS_3);

  let options = { SearchIndex: "HealthPersonalCare", Keywords: req.query.query }

  prodAdv.call("ItemSearch", options, function(err, result) {
      res.json(result);
  });
});

// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
