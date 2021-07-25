export function getTypes(value:string|undefined) {
  if (Array.isArray(value)) return 'array';
  return typeof value;
}
