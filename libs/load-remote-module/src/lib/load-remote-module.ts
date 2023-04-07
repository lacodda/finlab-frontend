export type ResolveRemoteUrlFunction = (
  remoteName: string
) => string | Promise<string>;

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __webpack_share_scopes__: { default: unknown };

let resolveRemoteUrl: ResolveRemoteUrlFunction;

export function setRemoteUrlResolver(_resolveRemoteUrl: ResolveRemoteUrlFunction): void {
  resolveRemoteUrl = _resolveRemoteUrl;
}

let remoteUrlDefinitions: Record<string, string>;

export function setRemoteDefinitions(definitions: Record<string, string>): void {
  remoteUrlDefinitions = definitions;
}

const remoteModuleMap = new Map<string, unknown>();
const remoteContainerMap = new Map<string, unknown>();

export async function loadRemoteModule(remoteName: string, moduleName: string): Promise<any> {
  const remoteModuleKey = `${remoteName}:${moduleName}`;
  if (remoteModuleMap.has(remoteModuleKey)) {
    return remoteModuleMap.get(remoteModuleKey);
  }

  const container = remoteContainerMap.has(remoteName)
    ? remoteContainerMap.get(remoteName)
    : await loadRemoteContainer(remoteName);

  const factory = await container.get(moduleName);
  const Module = factory();

  remoteModuleMap.set(remoteModuleKey, Module);

  return Module;
}

async function loadModule(url: string): Promise<any> {
  return await import(/* webpackIgnore:true */ url);
}

let initialSharingScopeCreated = false;

async function loadRemoteContainer(remoteName: string): Promise<any> {
  if (!resolveRemoteUrl && !remoteUrlDefinitions) {
    throw new Error(
      'Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation to find the remote apps correctly.'
    );
  }

  if (!initialSharingScopeCreated) {
    initialSharingScopeCreated = true;
    await __webpack_init_sharing__('default');
  }

  const remoteUrl = remoteUrlDefinitions
    ? remoteUrlDefinitions[remoteName]
    : await resolveRemoteUrl(remoteName);

  const containerUrl = `${remoteUrl}${
    remoteUrl.endsWith('/') ? '' : '/'
  }remoteEntry.js`;

  const container = await loadModule(containerUrl);
  await container.init(__webpack_share_scopes__.default);

  remoteContainerMap.set(remoteName, container);
  return container;
}
