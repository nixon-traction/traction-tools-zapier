const createtodo = (z, bundle) => {

    const uuidv4 = require('uuid/v4');

    const options = {
        method: 'POST',
        url: 'https://traction.tools/api/v1/todo/create',
        headers: {
        'content-type': 'application/x-www-form-urlencoded'
        },
        body:  {
          notes: bundle.inputData.notes,
          dueDate: bundle.inputData.dueDate,
          title: bundle.inputData.rocktitle
        }
    };

    return z.request(options)
    .then((response) => {
        // var dataoutput = z.JSON.parse(response.content);
        // var string = "";
        // dataoutput.map((data)=>{
        //   string = string + "/n/r" + data.Name;
        // });
        return [{"id" : uuidv4(), "data": z.JSON.parse(response.content)}];
    })
};

module.exports = {
    key: 'add_todo',
    noun: 'Todo entry',
    display: {
        label: 'New Todo',
        description: 'New Todo entry trigger'
    },

    operation: {
        inputFields: [
            {key: 'notes', label:'Todo Notes', required: false},
            {key: 'dueDate', label:'Todo DueDate', required: false},
            {key: 'rocktitle', label:'Todo Title', required: false}
        ],
        perform: createtodo,
    }
};