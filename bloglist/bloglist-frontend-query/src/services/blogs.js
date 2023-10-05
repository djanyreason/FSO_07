import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  if (newToken) token = `Bearer ${newToken}`;
  else token = null;
};

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const addBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };

  return axios.post(baseUrl, newBlog, config).then((response) => response.data);
};

const updateBlog = (updatedBlog) =>
  axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    .then((response) => response.data);

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  };

  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((response) => response.data);
};

export default { getAll, setToken, addBlog, updateBlog, deleteBlog };
