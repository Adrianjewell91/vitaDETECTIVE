const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');

const vitamin_list = require('./vitamin_qualities.js');

//put these in the bash window. not sure how to work around this.
// export GENOMELINK_CLIENT_ID=t0pRdHSsViMvhmFKGejrph0jvtyQFx760cz32qKB
// export GENOMELINK_CLIENT_SECRET=gi27X7FmYpqv0dkb5VJTsuBoNpOG7uBjDFxvdLg1uE3Aqj2UE9vKtWZI24bcJIdfrjFYRRu6AM5qV6OuWZ3HYSg33l08ONAPD6TnH2IxMoiA3IEm35Q2DdyMoxdsDlos
// export GENOMELINK_CALLBACK_URL="http://127.0.0.1:3000/callback"

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
  const scope = 'report:folate report:iron report:calcium report:blood-glucose';
  const authorizeUrl = genomeLink.OAuth.authorizeUrl({ scope: vitamin_list.join(' ') });

  // Fetching a protected resource using an OAuth2 token if exists.
  let reports = [];

  // console.log(req.session.oauthToken);
  console.log(vitamin_list);
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

  res.render('index', {
    authorize_url: authorizeUrl,
    reports: reports,
  });
});

app.get('/callback', async (req, res) => {
  // The user has been redirected back from the provider to your registered
  // callback URL. With this redirection comes an authorization code included
  // in the request URL. We will use that to obtain an access token.
  req.session.oauthToken = await genomeLink.OAuth.token({ requestUrl: req.url });
  console.log(req.url);
  console.log(req.session.oauthToken);

  // At this point you can fetch protected resources but lets save
  // the token and show how this is done from a persisted token in index page.
  res.redirect('/');
});

// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
