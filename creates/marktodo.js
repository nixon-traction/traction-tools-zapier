const marktodo = (z, bundle) => {
	const options = {
		url: `https://traction.tools/api/v1/todo/${bundle.inputData.Id}/complete`,
		method: 'POST',
    params: {
      status: bundle.inputData.status
    }
	};

  return z.request(options)
    .then((response) => {
        return z.JSON.parse(response.content);
    })
};

module.exports = {
  key: 'mark_todo',
  noun: 'Mark To-Do',

  display: {
    label: 'Mark To-Do',
    description: 'Mark To-Do as Completed'
  },

  operation: {
    inputFields: [
      {key: 'Id', label: 'To-Do ID', required: false},
      {key: 'status', label: 'Status', required: false},
    ],
    perform: marktodo,
    outputFields: [
      {key: 'Id', label: 'To-Do ID', required: false, dynamic: 'mark_todo.Id'},
    ],
  }
};