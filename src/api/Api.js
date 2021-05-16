import axios from "axios";

const BASE_URL = "http://localhost:8083/api";

export function getAllUsers() {
  const url = BASE_URL + "/users/all";
  return axios.get(url).then((response) => response.data);
}

export function getAllImages() {
  const url = BASE_URL + "/images/state=1";
  return axios.get(url).then((response) => response.data);
}

export function getAllCategories() {
  const url = BASE_URL + "/categories";
  return axios.get(url).then((response) => response.data);
}

export const uploadImage = (formData) => {
  const url = BASE_URL + "/images/upload";
  return axios.post(url, formData).then((response) => response.data);
};

export const analyseImage = (idImage) => {
  const url = BASE_URL + "/images/analyse/" + idImage;
  return axios.get(url).then((response) => response.data);
};

export const deleteImage = (id) => {
  const url = BASE_URL + "/images/delete/" + id;
  return axios.delete(url).then((response) => response.status);
};

export const setKeywords = (formData) => {
  const url = BASE_URL + "/images/setkeywords";
  return axios.post(url, formData).then((response) => response.data);
};

export function getImageById(id) {
  const url = BASE_URL + "/images/users/" + id;
  return axios.get(url).then((response) => response.data);
}

export function getUserByIdentifierAndPassword(identifier, password) {
  const url = BASE_URL + "/users/login";
  return axios
    .get(url, { params: { identifier: identifier, password: password } })
    .then((response) => response.data);
}
