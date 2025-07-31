import httpClient from '../api/httpClient';
import endpoints from '../api/endpoints';
import {
  PiResponse,
  PauseResumeResetResponse,
} from '../types/api';

export const PiRepository = {
  async getPi(): Promise<PiResponse> {
    const { data } = await httpClient.get<PiResponse>(endpoints.pi);
    return data;
  },

  async pause(): Promise<PauseResumeResetResponse> {
    const { data } = await httpClient.post<PauseResumeResetResponse>(endpoints.pause);
    if (data.status !== 'paused') throw new Error('Invalid pause response');
    return data;
  },

  async resume(): Promise<PauseResumeResetResponse> {
    const { data } = await httpClient.post<PauseResumeResetResponse>(endpoints.resume);
    if (data.status !== 'resumed') throw new Error('Invalid resume response');
    return data;
  },

  async reset(): Promise<PauseResumeResetResponse> {
    const { data } = await httpClient.post<PauseResumeResetResponse>(endpoints.reset);
    if (data.status !== 'reset') throw new Error('Invalid reset response');
    if (!data.pi || typeof data.pi !== 'string') throw new Error('Missing pi in reset response');
    return data;
  },
};
