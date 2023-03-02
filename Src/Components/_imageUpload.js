import RNFetchBlob from 'rn-fetch-blob';
import { BaseUrl } from '../Constants/BaseUrl'

export default _imageUpload = (url, userDataArr) => {
  return new Promise(async function (resolve, reject) {

    let my_url = BaseUrl + url;

    await RNFetchBlob.fetch(
      'POST',
      my_url,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      userDataArr,
    )
      .then(resp => {
        resolve(resp.data);
        return resp.data;
      })
      .catch(err => {
        reject(err);
        return err;
      });
  });
};
