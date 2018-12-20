const createtodo = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://traction.tools/api/v1/todo/create',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body:  {
      title: bundle.inputData.rocktitle,
      dueDate: bundle.inputData.dueDate,
      notes: bundle.inputData.notes,
    }
  });

  return responsePromise.then((response) => {
    if (response.status === 401) {
      throw new Error('The todo data is not valid');
    }
    return z.JSON.parse(response.content);
  });
};

module.exports = {
  key: 'create_todo',
  noun: 'Create To-Do',

  display: {
    label: 'Create To-Do',
    description: 'Add a new To-Do'
  },

  operation: {
    inputFields: [
      {key: 'rocktitle', label:'Title', required: true},
      {key: 'dueDate', label:'Due Date', required: false },
      {key: 'notes', label:'Notes', type: 'text', required: true,},
    ],
    perform: createtodo,
    // outputFields: [
    //   {key: 'Id', label:'Todo ID', required: false, dynamic: 'create_todo.Id'},
    // ],
  }
};