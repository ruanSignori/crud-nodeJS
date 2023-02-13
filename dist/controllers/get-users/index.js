"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/get-users/index.ts
var get_users_exports = {};
__export(get_users_exports, {
  GetUsersController: () => GetUsersController
});
module.exports = __toCommonJS(get_users_exports);

// src/controllers/helpers.ts
var ok = (body) => ({
  statusCode: 200 /* OK */,
  body
});
var serverError = () => {
  return {
    statusCode: 500 /* SERVER_ERROR */,
    body: "Algo deu errado"
  };
};

// src/controllers/get-users/index.ts
var GetUsersController = class {
  constructor(getUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }
  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();
      return ok(users);
    } catch (error) {
      return serverError();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetUsersController
});
