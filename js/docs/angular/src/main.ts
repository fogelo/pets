import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { signal } from '@angular/core';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  const firstName = signal('Morgan');
// Read a signal value by calling it— signals are functions.
console.log(firstName());