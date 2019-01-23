import request from "superagent";

import api from "./api";

export default async id => {
  let response;

  await request
    .delete(`${api.url}/item`)
    .send({
      id: id
    })
    .then(res => {
      response = res;
    });

  return response;
};

export function transform(image) {
  return {
    id: image.id,

    url: image.url,

    name: image.name
  };
}
