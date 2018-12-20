const getparticulartodo = (z, bundle) => {
  const options = {
    url: `https://traction.tools/api/v1/todo/${bundle.inputData.Id}`,
  };

  return z.request(options)
      .then((response) => {
          return z.JSON.parse(response.content);
      })
  // const responsePromise = z.request({
  //   method: 'GET',
  //   url: `https://traction.tools/api/v1/todo/${bundle.inputData.todo_id}`,
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // });

  // return responsePromise.then((response) => {
  //   if (response.status === 401) {
  //     throw new Error('The rock data is not valid');
  //   }
  //   return z.JSON.parse(response.content);
  // });
};

module.exports = {
  key: 'get_particulartodo',
  noun: 'Get Particular To-do entry',

  display: {
    label: 'Get a Particular To-Do',
    description: 'Get a particular to-do'
  },

  operation: {
    // inputFields: [
    //   {key: 'Id', label: 'ID', required: false},
    //   {key: 'title', label:'Title', required: false},
    //   {key: 'dueDate', label:'dueDate', required: false},
    // ],
    inputFields: [
      {key: 'Id', label: 'To-do ID', required: false}
    ],
    perform: getparticulartodo,
    outputFields: [
      {key: 'Id', label: 'TODO Output ID', required: false},
    ]
  }
};