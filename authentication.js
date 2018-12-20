const testAuth = (z , bundle) => {
    var httpOptions = {
      //url: 'https://traction.tools/Token',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body:  {
        grant_type: "password",
        userName: bundle.authData.userName,
        password: bundle.authData.password,
      }
    };

    // This method can return any truthy value to indicate the credentials are valid.
    // Raise an error to show
    // return promise.then((response) => {
    //   if (response.status !== 200) {
    //     throw new Error('Unable to fetch access token: ' + response.content);
    //   }

    //   const result = JSON.parse(response.content);
    //   return {
    //     access_token: result.access_token,
    //     refresh_token: result.refresh_token
    //   };
    // });
    const promise = z.request('https://traction.tools/Token', httpOptions);

    return promise.then((response) => {
        if (response.status !== 200) {
            throw new Error(response.content);
        }
        const token = JSON.parse(response.content);
        return {
            access_token: token.access_token
        };
    });
};

module.exports = {
  type: 'session',
  connectionLabel: (z, bundle) => {
    return 'API credentials: ' + bundle.authData.userName;
  },
  fields: [
    {key: 'userName', label: 'Username', required: true, type: 'string'},
    {key: 'password', label: 'Password', required: true, type: 'password'},
    //{key: 'grant_type', label: 'Grant Type', required: true, type: 'string'}
  ],
  //test: function() {return true;}
  test: testAuth,
  sessionConfig: {
      perform: testAuth
  }
};
