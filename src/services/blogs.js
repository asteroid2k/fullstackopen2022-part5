import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = (payload) => {
  const config = { headers: { Authorization: token } };
  const request = axios.post(baseUrl, payload, config);
  return request.then((response) => response.data);
};
const edit = (payload) => {
  const config = { headers: { Authorization: token } };
  const request = axios.put(`${baseUrl}/${payload.id}`, payload, config);
  return request.then((response) => response.data);
};
const remove = (payload) => {
  const config = { headers: { Authorization: token } };
  const request = axios.delete(`${baseUrl}/${payload.id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, setToken, create, edit, remove };
