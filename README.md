# lwrjs-env-module-provider
A module provider for environment variables in [LWR](https://developer.salesforce.com/docs/platform/lwr/overview)

## Purpose

Configuration of your apps through environment variables can be very convenient, especially when source code change and
redeployment can be long or costly, or if you do want minimum downtime. This module provider enables you to import the value
of environment variables (normally accessible under `process.env`) into your LWCs.

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

You can then use the imported value as required, here is a full example:

```javacript
import { LightningElement } from 'lwc';

import envValue from '@eschweitzer78/env/USERNAME';

export default class HelloWorldApp extends LightningElement {
  get username() { return envValue; }
}
```

```html
<template>
  <main>
    <img src="/public/assets/recipes-logo.png" alt="logo" />
      <h1>Hello {username}!</h1>
  </main>
</template>
```