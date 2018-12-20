const _sharedBaseUrl = 'https://traction.tools/api/v1/rocks';

const getMilestone = (z, bundle) => {
  return z.request({
      url: `${_sharedBaseUrl}/${bundle.inputData.id}/milestones`
    })
    .then((response) => JSON.parse(response.content));
};

const listRocks = (z, bundle) => {
  return z.request({
      url: _sharedBaseUrl + '/user/mine',
      params: {
        style: bundle.inputData.style
      }
    })
    .then((response) => JSON.parse(response.content))
    .then(data => {
          const events = data; // array of events
          return events.map(function(e){ // returns array of objects with `id` defined
              e.id = e.Id
              return e
          }) 
      })
};

const createRock = (z, bundle) => {
  const requestOptions = {
    url: _sharedBaseUrl + '/create',
    method: 'POST',
    body: JSON.stringify({
      name: bundle.inputData.name,
      directions: bundle.inputData.directions,
      authorId: bundle.inputData.authorId,
    }),
    headers: {
      'content-type': 'application/json'
    }
  };

  return z.request(requestOptions)
    .then((response) => JSON.parse(response.content));
};

const searchRock = (z, bundle) => {
  return z.request({
      url: _sharedBaseUrl + '/user/mine',
      params: {
        nameSearch: bundle.inputData.name
      }
    })
    .then((response) => {
      const matchingRecipes = JSON.parse(response.content);

      // Only return the first matching recipe
      if (matchingRecipes && matchingRecipes.length) {
        return [matchingRecipes[0]];
      }

      return [];
    });
};

const sample = {
  id: 1,
};

// This file exports a Recipe resource. The definition below contains all of the keys available,
// and implements the list and create methods.
module.exports = {
  key: 'tt_rock',
  noun: 'Rocks',
  // The get method is used by Zapier to fetch a complete representation of a record. This is helpful when the HTTP
  // response from a create call only return an ID, or a search that only returns a minimuml representation of the
  // record. Zapier will follow these up with the get() to retrieve the entire object.
  get: {
    display: {
      label: 'Get Rock',
      description: 'Gets a rock.',
    },
    operation: {
      inputFields: [
        {key: 'Id', required: true},
      ],
      perform: getMilestone,
      sample: sample
    },
  },
  // The list method on this resource becomes a Trigger on the app. Zapier will use polling to watch for new records
  list: {
    display: {
      label: 'New Rock',
      description: 'Trigger when a new rock is added.',
    },
    operation: {
      outputFields: [
        {key: 'Id', label: 'ID', required: false, dynamic: 'tt_rock.Id'},
      ],
      perform: listRocks,
      sample: sample
    },
  },
  // If your app supports webhooks, you can define a hook method instead of a list method.
  // Zapier will turn this into a webhook Trigger on the app.
  // hook: {
  //
  // },

  // The create method on this resource becomes a Write on this app
  create: {
    display: {
      label: 'Create Rock',
      description: 'Creates a new rock.',
    },
    operation: {
      inputFields: [
        {key: 'title', label:'Rock Title', required: false},
        {key: 'accountableUserId', label:'Acct User ID', required: false}
      ],
      perform: createRock,
      sample: sample
    },
  },
  //The search method on this resource becomes a Search on this app
  search: {
    display: {
      label: 'Find Rock',
      description: 'Finds an existing rock by name.',
    },
    operation: {
      inputFields: [
        {key: 'Id', required: true, type: 'string'},
      ],
      perform: searchRock,
      sample: sample
    },
  },

  // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
  // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
  // returned records, and have obviously dummy values that we can show to any user.
  sample: sample,

  // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
  // field definitions. The result will be used to augment the sample.
  // outputFields: () => { return []; }
  // Alternatively, a static field definition should be provided, to specify labels for the fields
  outputFields: [
    {key: 'Id', label: 'ID'},
  ]
};