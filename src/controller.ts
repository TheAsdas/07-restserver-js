import {
  users_delete,
  users_get,
  users_put,
  users_post,
} from "./controller/users";

namespace controller {
  export namespace user {
    export const get = users_get;
    export const put = users_put;
    export const del = users_delete;
    export const post = users_post;
  }
}

export default controller;
