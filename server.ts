import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import * as path from 'path';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/imobiliaria-dimensao-site/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const userAgent = (req.header('User-Agent') as string).toLowerCase();

    const isBot = detectBot(userAgent);

    if (isBot) {
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    } else {
      res.sendFile(path.join(distFolder, 'index.html'));
    }
  });

  return server;
}

function detectBot(userAgent: string): boolean {
  const bots = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'embedly',
    'baiduspider',
    'pinterest',
    'slackbot',
    'vkShare',
    'facebot',
    'outbrain',
    'w3c_validator'
  ];

  return bots.some(bot => bot.indexOf(userAgent) > -1);
}

const serverApp = app();
export default serverApp;

if (process.env['VERCEL'] !== '1') {
  const port = process.env['PORT'] || 4000;
  serverApp.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export * from './src/main.server';
