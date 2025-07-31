import type { PersistStorage, StorageValue } from 'zustand/middleware'
import { storage } from '.'

export function createMMKVStorage<T>(): PersistStorage<T> {
  return {
    getItem: (name) => {
      try {
        const value = storage.getString(name)
        return value ? (JSON.parse(value) as StorageValue<T>) : null
      } catch {
        return null
      }
    },
    setItem: (name, value) => {
      try {
        const json = JSON.stringify(value)
        storage.set(name, json)
      } catch (error) {
        console.error('[MMKV persist] setItem failed', error)
      }
    },
    removeItem: (name) => {
      try {
        storage.delete(name)
      } catch (error) {
        console.error('[MMKV persist] removeItem failed', error)
      }
    },
  }
}
