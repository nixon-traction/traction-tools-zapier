const createrock = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://traction.tools/api/v1/rocks/create',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body:  {
      title: bundle.inputData.title,
    }
  });

  return responsePromise.then((response) => {
    if (response.status === 401) {
      throw new Error('The rock data is not valid');
    }
    return z.JSON.parse(response.content);
  });
};

module.exports = {
  key: 'create_rock',
  noun: 'Create Rock',

  display: {
    label: 'Create Rock',
    description: 'Add a new Rock'
  },

  operation: {
    inputFields: [
      {key: 'title', label:'Title', required: true},
    ],
    perform: createrock
  }
};