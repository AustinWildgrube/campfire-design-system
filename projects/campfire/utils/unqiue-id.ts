export function UniqueId() {
  return 'usi_' + (Math.random() + 1).toString(36).substring(7);
}
