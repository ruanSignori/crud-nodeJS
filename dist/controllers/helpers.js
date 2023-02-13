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

// src/controllers/helpers.ts
var helpers_exports = {};
__export(helpers_exports, {
  badRequest: () => badRequest,
  created: () => created,
  ok: () => ok,
  serverError: () => serverError
});
module.exports = __toCommonJS(helpers_exports);
var ok = (body) => ({
  statusCode: 200 /* OK */,
  body
});
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  badRequest,
  created,
  ok,
  serverError
});
