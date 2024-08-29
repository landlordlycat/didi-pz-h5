export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
  const value = localStorage.getItem(key) || ''
  return value ? JSON.parse(value) : value
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}
