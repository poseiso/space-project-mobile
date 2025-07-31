import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Pi } from '../models/Pi'
import { PiProvider } from '../providers/PiProvider'
import { createMMKVStorage } from '@/utils/storage/mmkvStorage'

export type PiState = {
  pi: Pi | null
  loading: boolean
  error: string | null

  fetchPi: () => Promise<void>
  pause: () => Promise<void>
  resume: () => Promise<void>
  reset: () => Promise<void>
}
let interval: number | null = null
export const usePiStore = create<PiState>()(
  persist(
    (set) => ({
      pi: null,
      loading: false,
      error: null,

      fetchPi: async () => {
        set({ loading: true, error: null })
        try {
          const pi = await PiProvider.getPi()
          set({ pi: { ...pi } })
        } catch (e) {
          set({ error: (e as Error).message })
        } finally {
          set({ loading: false })
        }
      },
      
      pause: async () => {
        set({ loading: true })
        try {
          await PiProvider.pause()
          const pi = await PiProvider.getPi()
          set({ pi: { ...pi } })
        } catch (e) {
          set({ error: (e as Error).message })
        } finally {
          set({ loading: false })
        }
      },
      
      resume: async () => {
        set({ loading: true })
        try {
          await PiProvider.resume()
          const pi = await PiProvider.getPi()
          set({ pi: { ...pi } })
        } catch (e) {
          set({ error: (e as Error).message })
        } finally {
          set({ loading: false })
        }
      },
      
      reset: async () => {
        set({ loading: true })
        try {
          await PiProvider.reset()
          const pi = await PiProvider.getPi()
          set({ pi: { ...pi } })
        } catch (e) {
          set({ error: (e as Error).message })
        } finally {
          set({ loading: false })
        }
      },

    }),
    {
      name: 'pi-store',
      storage: createMMKVStorage<Pick<PiState, 'pi'>>(),
      partialize: (state) => ({ pi: state.pi }),
      version: 1,
    }
  )
)

export const startPiPolling = () => {
  if (interval) return // already running

  interval = setInterval(async () => {
    usePiStore.setState({ loading: true })
    try {
      const pi = await PiProvider.getPi()
      usePiStore.setState({ pi: { ...pi } })
    } catch (e) {
      console.error('[Polling] Failed to fetch Pi:', e)
    } finally {
      usePiStore.setState({ loading: false })
    }
  }, 10_000)
}


export const stopPiPolling = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}
