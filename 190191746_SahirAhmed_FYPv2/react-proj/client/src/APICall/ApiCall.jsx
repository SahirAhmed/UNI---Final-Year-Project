
import axios from 'axios'

const baseUrl = "http://localhost:4000";
 axios.defaults.withCredentials = true;

const ApiCallGet = (path, redirect = true) => {

  return axios.get(baseUrl + path, { withCredentials: true })
    .then((response) => {
      if (response.status === 202 && redirect)
        window.location.replace(response.data);
      else
        return response;
    })
    .catch((err) => {
      throw err;
    });

}

const ApiCallPost = (path, data, redirect = true) => {

  return axios.post(baseUrl + path, data)
    .then((response) => {
      if (response.status === 202 && redirect)
        window.location.replace(response.data);
      else
        return response;
    })
    .catch((err) => {
      throw err;
    });

}

const ApiCallPatch = (path, data, redirect = true) => {

  return axios.patch(baseUrl + path, data)
    .then((response) => {
      if (response.status === 202 && redirect)
        window.location.replace(response.data);
      else
        return response;
    })
    .catch((err) => {
      throw err;
    });

}

const ApiCallDelete = (path, redirect = true) => {

  return axios.delete(baseUrl + path, { withCredentials: true })
    .then((response) => {
      if (response.status === 202 && redirect)
        window.location.replace(response.data);
      else
        return response;
    })
    .catch((err) => {
      throw err;
    });

}


const ApiCall = (path, type, data, redirect) => {

  if (type === 'get')
    ApiCallGet(path, redirect);
  else if (type === 'delete')
    ApiCallDelete(path, redirect);
  else if (type === 'patch')
    ApiCallPatch(path, data, redirect);
  else
    ApiCallPost(path, data, redirect);

}

export default ApiCall;
export { ApiCallGet, ApiCallPost, ApiCallPatch, ApiCallDelete };
