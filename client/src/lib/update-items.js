import request from "superagent";

import api from "./api";

const updateItem = async item => {
  let response;

  await request
    .post(`${api.url}/item`)
    .send({
      item: item
    })
    .then(res => {
      response = res;
    });

  return response;
};

export { updateItem };
