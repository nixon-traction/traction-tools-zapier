require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('App.authentication.test', () => {
  it('should test something', (done) => {
    const x = 1;
    x.should.eql(1);
    done();
  
  appTester(App.authentication.test, bundle)
      .then((response) => {
        //console.log(response);
        //json_response.should.have.property('username')
        done();
      })
      .catch(done);
  });
});
