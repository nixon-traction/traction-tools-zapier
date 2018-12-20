  const newScorecardTriggers = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
      url: 'https://traction.tools/api/v1/scorecard/user/mine',
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
    key: 'new_scorecard',
    noun: 'New Scorecard',
    display: {
        label: 'New Scorecard',
        description: 'Trigger when a new Scorecard has been added.'
    },
    operation: {
        perform: newScorecardTriggers,
        outputFields: [
            {key: 'Id', label: 'ID', required: false, dynamic: 'new_scorecard.Id'},
        ]
    },
};