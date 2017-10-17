/**
 * Created by sunmeng on 17/7/11.
 */
import axios from 'axios';

export function getAllHeader (params) {
  return new Promise((resolve, reject) => {
    axios.get('http://192.168.31.149:8080/greeting', params)
      .then(response => {
        resolve(response.data);
        console.log(response.data);
      }, err => {
        console.log(err);
        reject(err);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export function getAll (params) {
  console.log(params);
  return new Promise((resolve, reject) => {
    axios.post('http://192.168.31.149:8080/customer/update11', params)
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      }, err => {
        console.log(err);
        reject(err);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
