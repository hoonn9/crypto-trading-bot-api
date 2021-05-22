import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    access_token: string;
  }
}
