/**
 * 入力されたパラメータの型を返す関数
 */
export function getType( object: any ): string {
  const toString = Object.prototype.toString;
  return toString.call(object).slice(8, -1).toLowerCase();
}