const getlistrockforuser = (z, bundle) => {
  const options = {
    url: `https://traction.tools/api/v1/rocks/user/${bundle.inputData.Id}`,
    //method: 'GET'
  };

  return z.request(options)
    .then((response) => {
        return z.JSON.parse(response.content);
    })
    .then(data => {
        const events = data; // array of events
        return events.map(function(e){ // returns array of objects with `id` defined
            e.id = e.Id
            return e
        }) 
    })
};

module.exports = {
  key: 'get_listrockforuser',
  noun: 'Get List of rocks for user entry',

  display: {
    label: 'Get List of Rock for User',
    description: 'Get a list of rock for user'
  },

  operation: {
    // inputFields: [
    //   {key: 'Id', label: 'ID', required: false},
    //   {key: 'title', label:'Title', required: false},
    //   {key: 'dueDate', label:'dueDate', required: false},
    // ],
    inputFields: [
      {key: 'Id', label: 'User ID', type: 'string', required: false}
    ],
    perform: getlistrockforuser,
    outputFields: [
      {key: 'Id', label: 'Rock ID', required: false},
    ]
  }
};