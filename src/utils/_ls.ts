const key = 'au-user'

export function setlocalStorageToken(value: string) {
  localStorage.setItem(key, value)
}

export function removelocalStorageToken() {
  localStorage.removeItem(key)
}

export const getlocalStorageToken: () => string = function(): string {
  return localStorage.getItem(key) as string
}