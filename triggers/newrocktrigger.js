  const newRockTriggers = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
        method: 'GET',
        url: 'https://traction.tools/api/v1/rocks/user/mine',
        params: {
            sort_by: 'id',
            sort_order: 'ASC'
        }
    };

    return z.request(options)
        .then((response) => {
            const events = z.JSON.parse(response.content); // array of events
            return events.map(function(e){ // returns array of objects with `id` defined
                e.id = e.Id
                return e
            }) 
        })
        .then(data => {
            const datasort = data; // array of events
            return datasort.sort(function(a,b){ // returns array of objects with `id` defined
                return a.id - b.id;
            }) 
        })
  };


module.exports = {
    key: 'new_rock',
    noun: 'New Rock',
    display: {
        label: 'New Rock',
        description: 'Trigger when a new Rock has been added.'
    },
    operation: {
        perform: newRockTriggers,
        outputFields: [
        {key: 'Id', label: 'ID', required: false, dynamic: 'new_rock.id'},
        ]
    },
};