/**
 * ファイルの拡張子を返す関数
 */
export function getExt(filename: string): string {
  const dotPosition = filename.lastIndexOf('.');
  if (dotPosition === -1) return '';
  return filename.slice(dotPosition + 1);
}
