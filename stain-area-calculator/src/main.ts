import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// If './app/app' has a default export, use:
import { App } from './app/app';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
