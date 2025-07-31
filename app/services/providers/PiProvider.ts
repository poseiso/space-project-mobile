import { Pi } from '../models/Pi';
import { PiRepository } from '../repositories/PiRepository';

export const PiProvider = {
  getPi: async (): Promise<Pi> => {
    const { pi, digits, updatedAt } = await PiRepository.getPi();
    return { value: pi, digits, updatedAt };
  },

  pause: async (): Promise<Date> => {
    const { timestamp } = await PiRepository.pause();
    return new Date(timestamp);
  },

  resume: async (): Promise<Date> => {
    const { timestamp } = await PiRepository.resume();
    return new Date(timestamp);
  },

  reset: async (): Promise<Pi> => {
    const { pi, digits, timestamp } = await PiRepository.reset();
    return { value: pi ?? '3.1', digits: digits ?? 1, updatedAt: timestamp };
  },
};
