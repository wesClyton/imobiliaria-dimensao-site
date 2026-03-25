import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/imobiliaria-dimensao-site/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine (SSR for all visitors)
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }, (err: Error, html: string) => {
      if (err) {
        console.error('SSR error:', err);
        res.sendFile(join(distFolder, 'index.html'));
      } else {
        res.send(html);
      }
    });
  });

  return server;
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
