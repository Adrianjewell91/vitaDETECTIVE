const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');
const path = require('path')
const vitamin_list = require('./vitamin_qualities.js');
let reports = [];
// const GENOMELINK_CLIENT_ID='t0pRdHSsViMvhmFKGejrph0jvtyQFx760cz32qKB';
// const GENOMELINK_CLIENT_SECRET='gi27X7FmYpqv0dkb5VJTsuBoNpOG7uBjDFxvdLg1uE3Aqj2UE9vKtWZI24bcJIdfrjFYRRu6AM5qV6OuWZ3HYSg33l08ONAPD6TnH2IxMoiA3IEm35Q2DdyMoxdsDlos';
// const GENOMELINK_CALLBACK_URL='https://vitadetective-api.herokuapp.com/callback';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Use the session middleware
app.use(express.static('frontend'));

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
  const GENOMELINK_CLIENT_ID='t0pRdHSsViMvhmFKGejrph0jvtyQFx760cz32qKB';
  const GENOMELINK_CLIENT_SECRET='gi27X7FmYpqv0dkb5VJTsuBoNpOG7uBjDFxvdLg1uE3Aqj2UE9vKtWZI24bcJIdfrjFYRRu6AM5qV6OuWZ3HYSg33l08ONAPD6TnH2IxMoiA3IEm35Q2DdyMoxdsDlos';
  const GENOMELINK_CALLBACK_URL='http://127.0.0.1:3000/callback';

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
  console.log(req.session);
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

// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
