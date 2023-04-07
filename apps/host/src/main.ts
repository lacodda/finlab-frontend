import { setRemoteDefinitions } from '@finlab-frontend/load-remote-module';
import('./bootstrap');

void fetch('/assets/module-federation.manifest.json')
  .then(async (res) => await res.json())
  .then((definitions) => { setRemoteDefinitions(definitions); })
  .then(async () => await import('./bootstrap').catch((err) => { console.error(err); }));
