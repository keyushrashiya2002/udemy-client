import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

export const fetchProduct = (query) =>
  api.get(`${url.API_URL.GET_PRODUCT}`, query);
