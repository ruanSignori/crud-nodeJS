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

// src/repositories/update-user/mongo-update-user.ts
var mongo_update_user_exports = {};
__export(mongo_update_user_exports, {
  MongoUpdateUserRepository: () => MongoUpdateUserRepository
});
module.exports = __toCommonJS(mongo_update_user_exports);
var import_mongodb2 = require("mongodb");

// src/database/mongo.ts
var import_mongodb = require("mongodb");
var MongoClient = {
  client: void 0,
  db: void 0,
  async connect() {
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const client = new import_mongodb.MongoClient(url, { auth: { username, password } });
    const db = client.db("users-db");
    this.client = client;
    this.db = db;
    console.log("Connect to mongodb");
  }
};

// src/repositories/update-user/mongo-update-user.ts
var MongoUpdateUserRepository = class {
  async updateUser(id, params) {
    await MongoClient.db.collection("users").updateOne(
      { _id: new import_mongodb2.ObjectId(id) },
      {
        $set: {
          ...params
        }
      }
    );
    const user = await MongoClient.db.collection("users").findOne({ _id: new import_mongodb2.ObjectId(id) });
    if (!user) {
      throw new Error("N\xE3o foi poss\xEDvel atualizar o usu\xE1rio");
    }
    const { _id, ...rest } = user;
    return {
      id: _id.toHexString(),
      ...rest
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MongoUpdateUserRepository
});
