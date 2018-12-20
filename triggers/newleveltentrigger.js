  const newL10Trigger = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
      url: 'https://traction.tools/api/v1/L10/list',
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
  key: 'new_levelten',
  noun: 'New Meeting',
  display: {
    label: 'New Meeting',
    description: 'Trigger when a new Meeting has been added.'
  },
  operation: {
    perform: newL10Trigger,
    outputFields: [
      {key: 'Id', label: 'ID', required: false, dynamic: 'new_levelten.Id'},
    ]
  },
};