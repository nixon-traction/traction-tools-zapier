const getmilestoneparticularrock = (z, bundle) => {
	const options = {
		url: `https://traction.tools/api/v1/milestones/${bundle.inputData.Id}`,
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
    // .then(data => {
    //     const events = data; // array of events
    //     return events.map(function(e){ // returns array of objects with `id` defined
    //         e.id = e.Id
    //         return e
    //     }) 
    // })
};

module.exports = {
  key: 'get_milestone',
  noun: 'Get Milestone',

  display: {
    label: 'Get Milestone',
    description: 'Get Milestone'
  },

  operation: {
    inputFields: [
      {key: 'Id', label: 'Milestone ID', required: false},
    ],
    // inputFields: [
    //   {key: 'Id', label: 'ID', required: false},
    //   // {key: 'title', label: 'Title', required: false},
    //   // {key: 'dueDate', label: 'Due Date', required: false},
    // ],
    perform: getmilestoneparticularrock,
    outputFields: [
      {key: 'Id', label: 'Milestone ID', required: false, dynamic: 'get_milestoneparticularrock.Id'},
    ],
  }
};