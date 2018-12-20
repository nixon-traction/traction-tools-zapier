  const newIssueTriggers = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
      url: 'https://traction.tools/api/v1/issues/users/mine',
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
    key: 'new_issue',
    noun: 'New Issue',
    display: {
        label: 'New Issue',
        description: 'Trigger when a new Issue has been added.'
    },
    operation: {
        perform: newIssueTriggers,
        outputFields: [
            {key: 'Id', label: 'ID', required: false, dynamic: 'new_issue.Id'},
        ]
    },
};