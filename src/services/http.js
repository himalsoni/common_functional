import { AppConfig } from "@common";
import { log } from "@common/Tools";
import AsyncStorage from '@react-native-async-storage/async-storage';

let userId;

class HTTP {
  constructor() {}

  async GET(url) {
    userId = await AsyncStorage.getItem('@userId');
    let headerObj = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (userId !== null) {
      headerObj['usertoken'] = userId;
    }

    // log('get headerObj')
    // log(headerObj)
    // log(`GET Data URL = ${AppConfig.url + url}`);
    return new Promise((resolve, reject) => {
      fetch(AppConfig.url + url, {
        method: "GET",
        credentials: 'same-origin',
        headers: headerObj,
      })
        .then(response => {
          // log(`first ever ever ever = ${JSON.stringify(response)}`);
          return response.json()
        })
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async POST(url, data) {
    userId = await AsyncStorage.getItem('@userId');
    let headerObj = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (userId !== null) {
      headerObj['usertoken'] = userId;
    }

    // log(`POST Data URL = ${AppConfig.url + url}`);
    // log(`POST headerObj = ${JSON.stringify(headerObj)}`);

    // if (!url.includes('post_register_user') && !url.includes('post_biodata_image')
    //   && !url.includes('post_before_transaction') && !url.includes('post_transaction')) {
      // log(`POST Data = ${JSON.stringify(data)}`);
    // }

    return new Promise((resolve, reject) => {
      fetch(AppConfig.url + url, {
        method: "POST",
        // credentials: 'same-origin',
        headers: headerObj,
        body: JSON.stringify(data)
      })
        .then(response => {
          // log(`first ever ever ever = ${JSON.stringify(response)}`);
          return response.json()
        })
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
export default new HTTP();
