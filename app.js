const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');

const vitamin_list = require('./vitamin_qualities.js');

const GENOMELINK_CLIENT_ID='t0pRdHSsViMvhmFKGejrph0jvtyQFx760cz32qKB';
const GENOMELINK_CLIENT_SECRET='gi27X7FmYpqv0dkb5VJTsuBoNpOG7uBjDFxvdLg1uE3Aqj2UE9vKtWZI24bcJIdfrjFYRRu6AM5qV6OuWZ3HYSg33l08ONAPD6TnH2IxMoiA3IEm35Q2DdyMoxdsDlos';
const GENOMELINK_CALLBACK_URL='https://vitadetective-api.herokuapp.com/callback';

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Use the session middleware

app.use(session({
  secret: 'YOURSECRET',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.get('/', async (req, res) => {

  let reports = [];

  const authorizeUrl = genomeLink.OAuth.authorizeUrl({ scope: vitamin_list.join(' '),
                                                       clientId: GENOMELINK_CLIENT_ID,
                                                        callbackUrl: GENOMELINK_CALLBACK_URL });
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


  // Fetching a protected resource using an OAuth2 token if exists.
  // let reports = [];
  // res.render('index', {
  //   authorize_url: authorizeUrl,
    // });
  res.json(reports);
});

app.get('/callback', async (req, res) => {
  // The user has been redirected back from the provider to your registered
  // callback URL. With this redirection comes an authorization code included
  // in the request URL. We will use that to obtain an access token.


  req.session.oauthToken = await genomeLink.OAuth.token({ requestUrl: req.url });


  //

  // At this point you can fetch protected resources but lets save
  // the token and show how this is done from a persisted token in index page.
  res.redirect('/');
  // const present_report = reports.map((el) => ({text: el.data.summary.text,
  //                                             score: `${el.data.summary.score}/4`}));

  // res.json(reports);
});

// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
