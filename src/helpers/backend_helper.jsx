import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

export const fetchProduct = (query) =>
  api.get(`${url.API_URL.GET_PRODUCT}`, query);

export const fetchCategory = (query) =>
  api.get(`${url.API_URL.GET_CATEOGRY}`, query);

export const postLogin = (query) =>
  api.create(`${url.API_URL.GET_USER}/login`, query);

export const postRegister = (query) =>
  api.create(`${url.API_URL.GET_USER}/register`, query);

// =================================================================
// Cart
// =================================================================
export const createCart = (data) =>
  api.create(`${url.API_URL.GET_CART}/${data}`);

export const fetchCart = (query) => api.get(`${url.API_URL.GET_CART}`, query);

export const patchCartDetail = (data) => {
  const { id, type } = data;
  return api.update(`${url.API_URL.GET_CART}/${type}/${id}`);
};
export const destroyCart = (data) => {
  return api.delete(`${url.API_URL.GET_CART}/${data}`);
};
