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

// src/controllers/update-user/index.ts
var update_user_exports = {};
__export(update_user_exports, {
  UpdateUserController: () => UpdateUserController
});
module.exports = __toCommonJS(update_user_exports);

// src/controllers/helpers.ts
var ok = (body) => ({
  statusCode: 200 /* OK */,
  body
});
var badRequest = (message) => {
  return {
    statusCode: 400 /* BAD_REQUEST */,
    body: message
  };
};
var serverError = () => {
  return {
    statusCode: 500 /* SERVER_ERROR */,
    body: "Algo deu errado"
  };
};

// src/controllers/update-user/index.ts
var UpdateUserController = class {
  constructor(updateUserRepository) {
    this.updateUserRepository = updateUserRepository;
  }
  async handle(httpRequest) {
    try {
      const { id } = httpRequest?.params;
      const { body } = httpRequest;
      if (!body) {
        return badRequest("Faltando informa\xE7\xF5es");
      }
      if (!id) {
        return badRequest("Faltando ID do usu\xE1rio");
      }
      const allowedFieldsToUpdate = [
        "firstName",
        "lastName",
        "password"
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key)
      );
      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Campo recebido n\xE3o \xE9 permitido para altera\xE7\xE3o");
      }
      const user = await this.updateUserRepository.updateUser(id, body);
      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserController
});
