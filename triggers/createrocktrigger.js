const createrocktrigger = (z, bundle) => {
    const uuidv4 = require('uuid/v4');

    const options = {
        method: 'POST',
        url: 'https://traction.tools/api/v1/rocks/create',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body:  {
          title: bundle.inputData.title,
        }
    };

    return z.request(options)
    .then((response) => {
        return [{"id" : uuidv4(), "data": z.JSON.parse(response.content)}];
    })
};

module.exports = {
    key: 'add_rock',
    noun: 'Rock entry',
    display: {
        label: 'New Rock',
        description: 'New Rock entry'
    },
    operation: {
        inputFields: [
            {key: 'title', label:'Rock Title', required: false},
        ],
        perform: createrocktrigger
    }
};