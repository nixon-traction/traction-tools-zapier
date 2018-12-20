const createissue = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://traction.tools/api/v1/issues/create',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body:  {
      meetingId: bundle.inputData.meetingId,
      title: bundle.inputData.title,
      ownerId: bundle.inputData.ownerId,
      notes: bundle.inputData.notes,
    }
  });

  return responsePromise.then((response) => {
    if (response.status === 401) {
      throw new Error('The issue data is not valid');
    }
    return z.JSON.parse(response.content);
  });
};




module.exports = {
  key: 'create_issue',
  noun: 'Create Issue',

  display: {
    label: 'Create Issue',
    description: 'Add a new Issue'
  },

  operation: {
    sample: {
      meetingId: 2131231,
      name: 'L10 Meeting test'
    },
    inputFields: [
      {key: 'meetingId', label:'Meeting ID', required: false},
      {key: 'title', label:'Title', required: true},
      {key: 'ownerId', label:'Owner ID', required: false},
      {key: 'notes', label:'Notes', required: false},
    ],
    perform: createissue
  }
};