const axios = require('axios');

import { BaseUrl } from '../Constants/BaseUrl'

const Axios = async (url, params) => {
    return new Promise(async function(resolve, reject) {
    await fetch(BaseUrl + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ z :
         params
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          return responseJson;
        })
        .catch(error => {
          reject(error);
          return error;
        });

    });

    // const options = {
    //     method: 'POST',
    //     headers: { Accept: "application/json", 'content-type': 'application/json' },
    //     data:  params ,
    //     url: BaseUrl + url,
    // };
    // return await axios(options).then(response => response.data)
}

export default Axios;