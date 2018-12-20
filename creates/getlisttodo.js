  const getFallbackRealListTodo = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
      url: 'https://traction.tools/api/v1/todo/users/mine',
      method: 'GET',
      // params: {
      //   style: bundle.inputData.style
      // }
    };

    return z.request(options)
        .then((response) => {
            return z.JSON.parse(response.content);
        })
        .then(data => {
        const events = data; // array of events
        return events.map(function(e){ // returns array of objects with `id` defined
            return e
        })
      })
};
module.exports = {
  key: 'get_listtodo',
  noun: 'Get List of Todo',
  display: {
    label: 'Get List of Todo',
    description: 'Get current users to-do list.'
  },
  operation: {
    perform: getFallbackRealListTodo,
    inputFields: [
      {key: 'Id', label: 'ID', required: false},
    ],
    outputFields: [
      {key: 'Id', label: 'ID', required: false, dynamic: 'get_listtodo.Id'},
    ]
  },
};