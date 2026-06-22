require('dotenv').config();
const Sentry = require("@sentry/node");
const pkg = require('../package.json');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  release: process.env.SENTRY_RELEASE || `fintech@${pkg.version}`,
  tracesSampleRate: 0,
  sampleRate: 1.0,  // 100% de errores
  sendDefaultPii: false,
  enabled: Boolean(process.env.SENTRY_DSN),

  beforeSend(event) {
    if (event.request?.cookies) delete event.request?.cookies;
    if (event.request?.headers?.cookie) delete event.request?.headers?.cookie;

    return event;
  }
});