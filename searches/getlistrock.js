  const getlistofrocks = (z, bundle) => {
    // For the test poll, you should get some real data, to aid the setup process.
    const options = {
      url: 'https://traction.tools/api/v1/rocks/users/mine',
      method: 'GET',
      // params: {
      //   style: bundle.inputData.style
      // }
    };

    return z.request(options)
        .then((response) => {
            var dataoutput = z.JSON.parse(response.content);
            var string = "";
            dataoutput.map((data)=>{
              string = string + "\n\u2022 " + data.Name;
            });

            // "[{ title : "hello"}, { title : "hello 2"}]"
            // hello-hello2-hello3 

            return [{"data": string}];
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
  key: 'get_listrocks',
  noun: 'Get List of Rock',
  display: {
    label: 'Get List of Rock',
    description: 'Get current users rock list.'
  },
  operation: {
    perform: getlistofrocks,
    inputFields: [
      {key: 'Id', label: 'Id', required: false},
    ],
    outputFields: [
      {key: 'Name', label: 'Data Name', required: false, dynamic: 'get_listrocks.Name'},
    ]
  },
};