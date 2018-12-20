const getmilestoneparticularrock = (z, bundle) => {
  const options = {
    url: 'https://traction.tools/api/v1/rocks/7227/milestones',
    method: 'GET',
    // body: JSON.stringify({
   //      fields: bundle.inputData
   //    }),
      // headers: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
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
  key: 'get_milestoneparticularrock',
  noun: 'Get Milestone Particular Rock entry',

  display: {
    label: 'Get Milestone for a Particular Rock',
    description: 'Get Milestone for a Particular Rock'
  },

  operation: {
    // inputFields: [
    //   {key: 'Id', label: 'ID', required: false},
    //   {key: 'title', label:'Title', required: false},
    //   {key: 'dueDate', label:'dueDate', required: false},
    // ],
    // inputFields: [
    //   {key: 'Id', label: 'ID', required: false},
    //   // {key: 'title', label: 'Title', required: false},
    //   // {key: 'dueDate', label: 'Due Date', required: false},
    // ],
    perform: getmilestoneparticularrock,
    outputFields: [
      {key: 'Id', label: 'Milestone Particular Rock ID', required: false, dynamic: 'get_milestoneparticularrock.Id'},
    ],
  }
};