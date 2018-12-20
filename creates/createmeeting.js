const createmeeting = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://traction.tools/api/v1/L10/create',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body:  {
      title: bundle.inputData.title,
      addSelf: true
    }
  });

  return responsePromise.then((response) => {
    if (response.status === 401) {
      throw new Error('The meeting data is not valid');
    }
    return z.JSON.parse(response.content);
  });
};

module.exports = {
  key: 'create_meeting',
  noun: 'Create Meeting',

  display: {
    label: 'Create Meeting',
    description: 'Add a new Meeting'
  },

  operation: {
    inputFields: [
      {key: 'title', label:'Title', required: true},
    ],
    perform: createmeeting,
    // outputFields: [
    //   {key: 'Id', label:'Todo ID', required: false, dynamic: 'create_todo.Id'},
    // ],
  }
};