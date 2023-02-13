"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/create-user/index.ts
var create_user_exports = {};
__export(create_user_exports, {
  CreateUserController: () => CreateUserController
});
module.exports = __toCommonJS(create_user_exports);
var import_validator = __toESM(require("validator"));

// src/controllers/helpers.ts
var created = (body) => ({
  statusCode: 201 /* CREATED */,
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

// src/controllers/create-user/index.ts
var CreateUserController = class {
  constructor(createUserRepository) {
    this.createUserRepository = createUserRepository;
  }
  async handle(httpRequest) {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field]?.length) {
          return badRequest(`O campo ${field} \xE9 obrigat\xF3rio`);
        }
      }
      const emailIsValid = import_validator.default.isEmail(httpRequest.body.email);
      if (!emailIsValid) {
        return badRequest("E-mail do tipo inv\xE1lido");
      }
      const user = await this.createUserRepository.createUser(
        httpRequest.body
      );
      return created(user);
    } catch (error) {
      return serverError();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserController
});
