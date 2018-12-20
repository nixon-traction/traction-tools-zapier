  const newTodoTrigger = (z, bundle) => {
    const uuidv4 = require('uuid/v4');
    const options = {
      method: 'GET',
      url: 'https://traction.tools/api/v1/todo/users/mine',
      params: {
        sort_by: 'id',
        sort_order: 'ASC'
      }
    };

    return z.request(options)
        .then((response) => {
            //return z.JSON.parse(response.content);
            const events = z.JSON.parse(response.content); // array of events
            return events.map(function(e){ // returns array of objects with `id` defined
                e.id = e.Id
                return e
            }) 
        })
        .then(data => {
            const datasort = data; // array of events
            return datasort.sort(function(a,b){ // returns array of objects with `id` defined
                return a.id - b.id;
            }) 
        })
  };


module.exports = {
  key: 'new_todo',
  noun: 'New To-Do',
  display: {
    label: 'New To-Do',
    description: 'Trigger when a new To-Do has been added.'
  },
  operation: {
    perform: newTodoTrigger,
    outputFields: [
      {key: 'Id', label: 'ID', required: false, dynamic: 'new_todo.id'},
    ]
  },
};