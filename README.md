# lwrjs-env-module-provider
A module provider for environment variables in [LWR](https://developer.salesforce.com/docs/platform/lwr/overview)

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project. You will need to configure the module providers
to add the `lwrjs-env-module-provider`, which is available on npm as `@eschweitzer78/lwrjs-env-module-provider`. Remember to all the standard module providers too.

```json
// lwr.config.json
{
      "moduleProviders": [
      "@eschweitzer78/lwrjs-env-module-provider",
      "@lwrjs/app-service/moduleProvider",
      "@lwrjs/lwc-module-provider",
      "@lwrjs/npm-module-provider"
  ]
}
```

## Getting environment variable values

In the code of your LWC, you can do a scoped import e.g:

```javascript
  import envValue from '@eschweitzer78/env/USERNAME';
```

you can then use the imported value as required.