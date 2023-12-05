// File location: /utils/api.ts

let savedPath: string | null = null;

export function savePath(path: string): void {
  savedPath = path;
}

export function getSavedPath(): string | null {
  return savedPath;
}
