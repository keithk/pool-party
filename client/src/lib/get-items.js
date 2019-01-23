import request from "superagent";

import api from "./api";

export default async () => {
  let images = [];

  await request.get(`${api.url}/items`).then(res => {
    images = res.body;
  });

  return images;
};

export function transform(image) {
  return {
    id: image.id,

    url: image.url,

    name: image.name
  };
}
