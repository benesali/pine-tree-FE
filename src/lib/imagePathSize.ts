export function imagePathSize(src: string, size: number): string {
  const dot = src.lastIndexOf(".");
  if (dot === -1) return src;

  return `${src.slice(0, dot)}-${size}${src.slice(dot)}`;
}