"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config2(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config: config2,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// src/index.ts
var import_express = __toESM(require("express"));
var import_dotenv = __toESM(require_main());

// src/controllers/helpers.ts
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

// src/repositories/get-users/mongo-get-users.ts
var MongoGetUsersRepository = class {
  async getUsers() {
    const users = await MongoClient.db.collection("users").find({}).toArray();
    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
};

// src/repositories/create-user/mongo-create-user.ts
var MongoCreateUserRepository = class {
  async createUser(params) {
    const { insertedId } = await MongoClient.db.collection("users").insertOne(params);
    const user = await MongoClient.db.collection("users").findOne({ _id: insertedId });
    if (!user) {
      throw new Error("User not created");
    }
    const { _id, ...rest } = user;
    return {
      id: _id.toHexString(),
      ...rest
    };
  }
};

// src/controllers/create-user/index.ts
var import_validator = __toESM(require("validator"));
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

// src/repositories/update-user/mongo-update-user.ts
var import_mongodb2 = require("mongodb");
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

// src/repositories/delete-user/mongo-delete-user.ts
var import_mongodb3 = require("mongodb");
var MongoDeleteUserRepository = class {
  async deleteUser(id) {
    const user = await MongoClient.db.collection("users").findOne({ _id: new import_mongodb3.ObjectId(id) });
    if (!user) {
      throw new Error("Usu\xE1rio n\xE3o encontrado");
    }
    const { deletedCount } = await MongoClient.db.collection("users").deleteOne({ _id: new import_mongodb3.ObjectId(id) });
    if (!deletedCount) {
      throw new Error("Usu\xE1rio n\xE3o foi deletado");
    }
    const { _id, ...rest } = user;
    return {
      id: _id.toHexString(),
      ...rest
    };
  }
};

// src/controllers/delete-user/index.ts
var DeleteUserController = class {
  constructor(deleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }
  async handle(httpRequest) {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return badRequest("Faltando ID do usu\xE1rio");
      }
      const user = await this.deleteUserRepository.deleteUser(id);
      return ok(user);
    } catch (error) {
      return serverError();
    }
  }
};

// src/index.ts
(0, import_dotenv.config)();
var main = async () => {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  const port = process.env.PORT || 8080;
  await MongoClient.connect();
  app.listen(port, () => console.log(`Server is runing at localhost:${port}`));
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
  });
  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );
    const { body, statusCode } = await createUserController.handle({
      body: req.body
    });
    console.log(body);
    res.status(statusCode).send(body);
  });
  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUsersRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(
      mongoUpdateUsersRepository
    );
    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params
    });
    res.status(statusCode).send(body);
  });
  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUsersRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUsersRepository
    );
    const { body, statusCode } = await deleteUserController.handle({
      params: req.params
    });
    res.status(statusCode).send(body);
  });
};
main();
