import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

export function loadString(key: string): string | null {
  try {
    return storage.getString(key) ?? null
  } catch {
    return null
  }
}

export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value)
    return true
  } catch {
    return false
  }
}
export function load<T>(key: string): T | null {
  let loadedItem: string | null = null
  try {
    loadedItem = loadString(key)
    return JSON.parse(loadedItem ?? "") as T
  } catch {
    return (loadedItem as T) ?? null
  }
}

export function save(key: string, value: unknown): boolean {
  try {
    saveString(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function remove(key: string): void {
  try {
    storage.delete(key)
  } catch {}
}

export function clear(): void {
  try {
    storage.clearAll()
  } catch {}
}
