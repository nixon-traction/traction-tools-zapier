  const getlistofL10 = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
      url: 'https://traction.tools/api/v1/L10/list',
      method: 'GET',
      // params: {
      //   style: bundle.inputData.style
      // }
    };

    return z.request(options)
        .then((response) => {
            var dataoutput = z.JSON.parse(response.content);
            return [{"data": dataoutput}];
        })
      //   .then(data => {
      //     const data_list = data;        
      //     const data_arr = data_list.split(" ","<br>"); 
      //     return data_list.map(function(e){
      //         return e
      //     }) 
      // })
};
module.exports = {
  key: 'get_listofL10',
  noun: 'Get List of L10',
  display: {
    label: 'Get List of L10',
    description: 'Get current L10 list.'
  },
  operation: {
    perform: getlistofL10,
    inputFields: [
      {key: 'Id', label: 'Id', required: false},
    ],
    outputFields: [
      {key: 'Id', label: 'Data Id', required: false, dynamic: 'get_listofl10.Id'},
      {key: 'Name', label: 'Data Name', required: false, dynamic: 'get_listofl10.Name'}
    ]
  },
};