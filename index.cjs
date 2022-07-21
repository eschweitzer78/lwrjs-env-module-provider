var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// packages/@lwrjs/label-module-provider/src/index.ts
__markAsModule(exports);
__export(exports, {
  default: () => src_default
});
var import_crypto = __toModule(require("crypto"));
var import_utils = __toModule(require("./utils.cjs"));

const MODULE_NAME = '@eschweitzer78/env/';

var EnvModuleProvider = class {
    constructor({ provideDefault = false }, { config, runtimeEnvironment: { defaultLocale, lwrVersion } }) {
        this.name = 'env-module-provider';
        this.version = lwrVersion;
        this.provideDefault = provideDefault;
        // normalize the label directories
    }

    async getEnvInfo(specifier) {
        // Check if this provider handles given specifier package/prefix
        // Modules handled by this provider have specifiers in this form: "{package}/{labelReference}"
        const envInfo = process.env[specifier];

        if (!envInfo) {
            return undefined;
        }

        return { envReference: specifier, envValue: envInfo };
    }
    async getModuleEntry({ specifier }, runtimeParams = {}) {
      if (!specifier.startsWith(MODULE_NAME)) {
        return undefined;
      }

      const info = await this.getEnvInfo(specifier.slice(MODULE_NAME.length));

      if (info) {
        const safeReference = info.envReference.replace(/\./g, '-');
        return {
          id: `${specifier}`,
          virtual: true,
          entry: `<virtual>/@eschweitzer78-env/${safeReference}`,
          specifier,
          version: this.version,
        };
      }
    }
    async getModule({ specifier, namespace, name = specifier }, runtimeParams = {}) {
      // Retrieve the Module Entry
      const moduleEntry = await this.getModuleEntry({ specifier }, runtimeParams);

      if (!moduleEntry) {
        return;
      }

      const envInfo = (await this.getEnvInfo(specifier.slice(MODULE_NAME.length)));
      const compiledSource = (0, import_utils.generateModule)(envInfo.envValue);
      // Construct a Compiled Module
      return {
        id: moduleEntry.id,
        specifier,
        namespace,
        name,
        version: this.version,
        originalSource: compiledSource,
        moduleEntry,
        ownHash: (0, import_crypto.createHash)('md5').update(compiledSource).digest('hex'),
        compiledSource,
      };
    }
}
var src_default = EnvModuleProvider;
