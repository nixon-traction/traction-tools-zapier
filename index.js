//const getmilestoneparticularrock = require('./triggers/getmilestoneparticularrock');
const newtodotrigger = require('./triggers/newtodotrigger');
const newissuetrigger = require('./triggers/newissuetrigger');
const newrocktrigger = require('./triggers/newrocktrigger');
const newscorecardtrigger = require('./triggers/newscorecardtrigger');
const newleveltentrigger = require('./triggers/newleveltentrigger');
//const getparticulartodo = require('./triggers/getparticulartodo');
//const getlistrockforuser = require('./triggers/getlistrockforuser');

const createissue = require('./creates/createissue');
const createrocks = require('./creates/createrocks');
const createtodo = require('./creates/createtodo');
const createmeeting = require('./creates/createmeeting');
//const getmilestone = require('./creates/getmilestone');
//const getlisttodo = require('./creates/getlisttodo');
//const marktodo = require('./creates/marktodo');

//const createtodotrigger = require('./triggers/createtodo');
//const createrocktrigger = require('./triggers/createrocktrigger');

const getlisttodos = require('./searches/getlisttodos');
const getlistrock = require('./searches/getlistrock');
const authentication = require('./authentication');

// To include the API key/secret/appId headers on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeAuthHeaders = (request, z, bundle) => {
  // if (bundle.authData.userName) {
  //  request.headers = request.headers || {};
  //  //request.headers['Application-Id'] = bundle.authData.grant_type
  //   request.headers['Accept'] = 'application/json'
  //  const basicHash = Buffer(`${bundle.authData.userName}:${bundle.authData.password}`).toString('base64');
  //  request.headers['Authorization'] = `Bearer ${basicHash}`;
  // }
  // return request;
  if (bundle.authData && bundle.authData.access_token) {
      request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }
  return request;
};

const sessionRefreshIf401 = (response, z, bundle) => {
    if (bundle.authData.access_token) {
        if (response.status !== 200) {
            throw new z.errors.RefreshAuthError(); // ask for a refresh & retry
        }
    }
    return response;
};

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  
  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
   includeAuthHeaders
  ],

  afterResponse: [
    //sessionRefreshIf401
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [newtodotrigger.key]: newtodotrigger,
    [newrocktrigger.key]: newrocktrigger,
    [newissuetrigger.key]: newissuetrigger,
    [newscorecardtrigger.key]: newscorecardtrigger,
    [newleveltentrigger.key]: newleveltentrigger,
    // [getlistrockforuser.key]: getlistrockforuser,
    // [getparticulartodo.key]: getparticulartodo,
    // [getmilestoneparticularrock.key]: getmilestoneparticularrock,
    // [createtodo.key]: createtodo,
    // [createrocktrigger.key]: createrocktrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    [getlisttodos.key]: getlisttodos,
    [getlistrock.key]: getlistrock,
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [createtodo.key]: createtodo,
    [createrocks.key]: createrocks,
    [createissue.key]: createissue,
    [createmeeting.key]: createmeeting,
    //[marktodo.key]: marktodo
  }
};

// Finally, export the app.
module.exports = App;
