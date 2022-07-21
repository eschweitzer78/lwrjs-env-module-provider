import { hashContent } from '@lwrjs/shared-utils';
import { generateModule } from './utils.js';

const MODULE_NAME = '@eschweitzer78/env/';

export default class EnvModuleProvider {
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
      const compiledSource = generateModule(envInfo.envValue);
      // Construct a Compiled Module
      return {
        id: moduleEntry.id,
        specifier,
        namespace,
        name,
        version: this.version,
        originalSource: compiledSource,
        moduleEntry,
        ownHash: hashContent(compiledSource),
        compiledSource,
      };
    }
}
//# sourceMappingURL=index.js.map