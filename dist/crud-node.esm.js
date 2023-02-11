import express from 'express';
import { config } from 'dotenv';
import { MongoClient as MongoClient$1, ObjectId } from 'mongodb';
import validator from 'validator';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var HttpStatusCode;
(function (HttpStatusCode) {
  HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
  HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
  HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpStatusCode[HttpStatusCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(HttpStatusCode || (HttpStatusCode = {}));

var ok = function ok(body) {
  return {
    statusCode: HttpStatusCode.OK,
    body: body
  };
};
var created = function created(body) {
  return {
    statusCode: HttpStatusCode.CREATED,
    body: body
  };
};
var badRequest = function badRequest(message) {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message
  };
};
var serverError = function serverError() {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Algo deu errado"
  };
};

var GetUsersController = /*#__PURE__*/function () {
  function GetUsersController(getUsersRepository) {
    this.getUsersRepository = void 0;
    this.getUsersRepository = getUsersRepository;
  }
  var _proto = GetUsersController.prototype;
  _proto.handle = /*#__PURE__*/function () {
    var _handle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var users;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return this.getUsersRepository.getUsers();
          case 3:
            users = _context.sent;
            return _context.abrupt("return", ok(users));
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", serverError());
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 7]]);
    }));
    function handle() {
      return _handle.apply(this, arguments);
    }
    return handle;
  }();
  return GetUsersController;
}();

var MongoClient = {
  client: undefined,
  db: undefined,
  connect: function connect() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var url, username, password, client, db;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            url = process.env.MONGODB_URL || "localhost:27017";
            username = process.env.MONGODB_USERNAME;
            password = process.env.MONGODB_PASSWORD;
            client = new MongoClient$1(url, {
              auth: {
                username: username,
                password: password
              }
            });
            db = client.db("users-db");
            _this.client = client;
            _this.db = db;
            console.log("Connect to mongodb");
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  }
};

var _excluded$3 = ["_id"];
var MongoGetUsersRepository = /*#__PURE__*/function () {
  function MongoGetUsersRepository() {}
  var _proto = MongoGetUsersRepository.prototype;
  _proto.getUsers = /*#__PURE__*/function () {
    var _getUsers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var users;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return MongoClient.db.collection("users").find({}).toArray();
          case 2:
            users = _context.sent;
            return _context.abrupt("return", users.map(function (_ref) {
              var _id = _ref._id,
                rest = _objectWithoutPropertiesLoose(_ref, _excluded$3);
              return _extends({}, rest, {
                id: _id.toHexString()
              });
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getUsers() {
      return _getUsers.apply(this, arguments);
    }
    return getUsers;
  }();
  return MongoGetUsersRepository;
}();

var _excluded$2 = ["_id"];
var MongoCreateUserRepository = /*#__PURE__*/function () {
  function MongoCreateUserRepository() {}
  var _proto = MongoCreateUserRepository.prototype;
  _proto.createUser = /*#__PURE__*/function () {
    var _createUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
      var _yield$MongoClient$db, insertedId, user, _id, rest;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return MongoClient.db.collection("users").insertOne(params);
          case 2:
            _yield$MongoClient$db = _context.sent;
            insertedId = _yield$MongoClient$db.insertedId;
            _context.next = 6;
            return MongoClient.db.collection("users").findOne({
              _id: insertedId
            });
          case 6:
            user = _context.sent;
            if (user) {
              _context.next = 9;
              break;
            }
            throw new Error("User not created");
          case 9:
            _id = user._id, rest = _objectWithoutPropertiesLoose(user, _excluded$2);
            return _context.abrupt("return", _extends({
              id: _id.toHexString()
            }, rest));
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function createUser(_x) {
      return _createUser.apply(this, arguments);
    }
    return createUser;
  }();
  return MongoCreateUserRepository;
}();

var CreateUserController = /*#__PURE__*/function () {
  function CreateUserController(createUserRepository) {
    this.createUserRepository = void 0;
    this.createUserRepository = createUserRepository;
  }
  var _proto = CreateUserController.prototype;
  _proto.handle = /*#__PURE__*/function () {
    var _handle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(httpRequest) {
      var requiredFields, _i, _requiredFields, _httpRequest$body, _httpRequest$body$fie, field, emailIsValid, user;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            requiredFields = ["firstName", "lastName", "email", "password"];
            _i = 0, _requiredFields = requiredFields;
          case 3:
            if (!(_i < _requiredFields.length)) {
              _context.next = 10;
              break;
            }
            field = _requiredFields[_i];
            if (httpRequest != null && (_httpRequest$body = httpRequest.body) != null && (_httpRequest$body$fie = _httpRequest$body[field]) != null && _httpRequest$body$fie.length) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", badRequest("O campo " + field + " \xE9 obrigat\xF3rio"));
          case 7:
            _i++;
            _context.next = 3;
            break;
          case 10:
            emailIsValid = validator.isEmail(httpRequest.body.email);
            if (emailIsValid) {
              _context.next = 13;
              break;
            }
            return _context.abrupt("return", badRequest("E-mail do tipo inválido"));
          case 13:
            _context.next = 15;
            return this.createUserRepository.createUser(httpRequest.body);
          case 15:
            user = _context.sent;
            return _context.abrupt("return", created(user));
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", serverError());
          case 22:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 19]]);
    }));
    function handle(_x) {
      return _handle.apply(this, arguments);
    }
    return handle;
  }();
  return CreateUserController;
}();

var _excluded$1 = ["_id"];
var MongoUpdateUserRepository = /*#__PURE__*/function () {
  function MongoUpdateUserRepository() {}
  var _proto = MongoUpdateUserRepository.prototype;
  _proto.updateUser = /*#__PURE__*/function () {
    var _updateUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id, params) {
      var user, _id, rest;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return MongoClient.db.collection("users").updateOne({
              _id: new ObjectId(id)
            }, {
              $set: _extends({}, params)
            });
          case 2:
            _context.next = 4;
            return MongoClient.db.collection("users").findOne({
              _id: new ObjectId(id)
            });
          case 4:
            user = _context.sent;
            if (user) {
              _context.next = 7;
              break;
            }
            throw new Error("Não foi possível atualizar o usuário");
          case 7:
            _id = user._id, rest = _objectWithoutPropertiesLoose(user, _excluded$1);
            return _context.abrupt("return", _extends({
              id: _id.toHexString()
            }, rest));
          case 9:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function updateUser(_x, _x2) {
      return _updateUser.apply(this, arguments);
    }
    return updateUser;
  }();
  return MongoUpdateUserRepository;
}();

var UpdateUserController = /*#__PURE__*/function () {
  function UpdateUserController(updateUserRepository) {
    this.updateUserRepository = void 0;
    this.updateUserRepository = updateUserRepository;
  }
  var _proto = UpdateUserController.prototype;
  _proto.handle = /*#__PURE__*/function () {
    var _handle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(httpRequest) {
      var _httpRequest$params, id, body, allowedFieldsToUpdate, someFieldIsNotAllowedToUpdate, user;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _httpRequest$params = httpRequest == null ? void 0 : httpRequest.params, id = _httpRequest$params.id;
            body = httpRequest.body;
            if (body) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", badRequest("Faltando informações"));
          case 5:
            if (id) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", badRequest("Faltando ID do usuário"));
          case 7:
            allowedFieldsToUpdate = ["firstName", "lastName", "password"];
            someFieldIsNotAllowedToUpdate = Object.keys(body).some(function (key) {
              return !allowedFieldsToUpdate.includes(key);
            });
            if (!someFieldIsNotAllowedToUpdate) {
              _context.next = 11;
              break;
            }
            return _context.abrupt("return", badRequest("Campo recebido não é permitido para alteração"));
          case 11:
            _context.next = 13;
            return this.updateUserRepository.updateUser(id, body);
          case 13:
            user = _context.sent;
            return _context.abrupt("return", ok(user));
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", serverError());
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 17]]);
    }));
    function handle(_x) {
      return _handle.apply(this, arguments);
    }
    return handle;
  }();
  return UpdateUserController;
}();

var _excluded = ["_id"];
var MongoDeleteUserRepository = /*#__PURE__*/function () {
  function MongoDeleteUserRepository() {}
  var _proto = MongoDeleteUserRepository.prototype;
  _proto.deleteUser = /*#__PURE__*/function () {
    var _deleteUser = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
      var user, _yield$MongoClient$db, deletedCount, _id, rest;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return MongoClient.db.collection("users").findOne({
              _id: new ObjectId(id)
            });
          case 2:
            user = _context.sent;
            if (user) {
              _context.next = 5;
              break;
            }
            throw new Error("Usuário não encontrado");
          case 5:
            _context.next = 7;
            return MongoClient.db.collection("users").deleteOne({
              _id: new ObjectId(id)
            });
          case 7:
            _yield$MongoClient$db = _context.sent;
            deletedCount = _yield$MongoClient$db.deletedCount;
            if (deletedCount) {
              _context.next = 11;
              break;
            }
            throw new Error("Usuário não foi deletado");
          case 11:
            _id = user._id, rest = _objectWithoutPropertiesLoose(user, _excluded);
            return _context.abrupt("return", _extends({
              id: _id.toHexString()
            }, rest));
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function deleteUser(_x) {
      return _deleteUser.apply(this, arguments);
    }
    return deleteUser;
  }();
  return MongoDeleteUserRepository;
}();

var DeleteUserController = /*#__PURE__*/function () {
  function DeleteUserController(deleteUserRepository) {
    this.deleteUserRepository = void 0;
    this.deleteUserRepository = deleteUserRepository;
  }
  var _proto = DeleteUserController.prototype;
  _proto.handle = /*#__PURE__*/function () {
    var _handle = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(httpRequest) {
      var _httpRequest$params, id, user;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = httpRequest == null ? void 0 : (_httpRequest$params = httpRequest.params) == null ? void 0 : _httpRequest$params.id;
            if (id) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", badRequest("Faltando ID do usuário"));
          case 4:
            _context.next = 6;
            return this.deleteUserRepository.deleteUser(id);
          case 6:
            user = _context.sent;
            return _context.abrupt("return", ok(user));
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", serverError());
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 10]]);
    }));
    function handle(_x) {
      return _handle.apply(this, arguments);
    }
    return handle;
  }();
  return DeleteUserController;
}();

config();
var main = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var app, port;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          app = express();
          app.use(express.json());
          port = process.env.PORT || 8080;
          _context5.next = 5;
          return MongoClient.connect();
        case 5:
          app.listen(port, function () {
            return console.log("Server is runing at localhost:" + port);
          });
          app.get("/users", /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
              var mongoGetUsersRepository, getUsersController, _yield$getUsersContro, body, statusCode;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    mongoGetUsersRepository = new MongoGetUsersRepository();
                    getUsersController = new GetUsersController(mongoGetUsersRepository);
                    _context.next = 4;
                    return getUsersController.handle();
                  case 4:
                    _yield$getUsersContro = _context.sent;
                    body = _yield$getUsersContro.body;
                    statusCode = _yield$getUsersContro.statusCode;
                    res.status(statusCode).send(body);
                  case 8:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x, _x2) {
              return _ref2.apply(this, arguments);
            };
          }());
          app.post("/users", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
              var mongoCreateUserRepository, createUserController, _yield$createUserCont, body, statusCode;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    mongoCreateUserRepository = new MongoCreateUserRepository();
                    createUserController = new CreateUserController(mongoCreateUserRepository);
                    _context2.next = 4;
                    return createUserController.handle({
                      body: req.body
                    });
                  case 4:
                    _yield$createUserCont = _context2.sent;
                    body = _yield$createUserCont.body;
                    statusCode = _yield$createUserCont.statusCode;
                    console.log(body);
                    res.status(statusCode).send(body);
                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x3, _x4) {
              return _ref3.apply(this, arguments);
            };
          }());
          app.patch("/users/:id", /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
              var mongoUpdateUsersRepository, updateUserController, _yield$updateUserCont, body, statusCode;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    mongoUpdateUsersRepository = new MongoUpdateUserRepository();
                    updateUserController = new UpdateUserController(mongoUpdateUsersRepository);
                    _context3.next = 4;
                    return updateUserController.handle({
                      body: req.body,
                      params: req.params
                    });
                  case 4:
                    _yield$updateUserCont = _context3.sent;
                    body = _yield$updateUserCont.body;
                    statusCode = _yield$updateUserCont.statusCode;
                    res.status(statusCode).send(body);
                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x5, _x6) {
              return _ref4.apply(this, arguments);
            };
          }());
          app["delete"]("/users/:id", /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
              var mongoDeleteUsersRepository, deleteUserController, _yield$deleteUserCont, body, statusCode;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    mongoDeleteUsersRepository = new MongoDeleteUserRepository();
                    deleteUserController = new DeleteUserController(mongoDeleteUsersRepository);
                    _context4.next = 4;
                    return deleteUserController.handle({
                      params: req.params
                    });
                  case 4:
                    _yield$deleteUserCont = _context4.sent;
                    body = _yield$deleteUserCont.body;
                    statusCode = _yield$deleteUserCont.statusCode;
                    res.status(statusCode).send(body);
                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x7, _x8) {
              return _ref5.apply(this, arguments);
            };
          }());
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function main() {
    return _ref.apply(this, arguments);
  };
}();
main();
//# sourceMappingURL=crud-node.esm.js.map
