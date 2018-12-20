const getonelevel10 = (z, bundle) => {
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

            var id = '';
            dataoutput.map((data)=>{
                if (data.Name == bundle.inputData.Name) {
                    id = data.Id; 
                }
            })
            return [{ id : id }];
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
  key: 'get_onelevel10',
  noun: 'Find One of L10',
  display: {
    label: 'Find L10',
    description: 'Get matching L10 Name'
  },
  operation: {
    perform: getonelevel10,
    inputFields: [
      {key: 'Name', label: 'Name', required: true},
    ],
    outputFields: [
      {key: 'Id', label: 'Data Id', required: false, dynamic: 'get_onelevel10.id'},
    ]
  },
};