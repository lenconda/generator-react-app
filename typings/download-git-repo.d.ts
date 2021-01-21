declare interface GitCloneOptions {
  clone?: boolean;
  git?: string;
  shallow?: boolean;
  checkout?: string;
  extract?: boolean;
  filename?: string;
}

declare module 'download-git-repo' {
  function clone(
    repository: string,
    destination: string,
    options?: GitCloneOptions,
    cb?: (error?: Error) => void,
  ): void;

  export = clone;
}
