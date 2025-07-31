export interface PiResponse {
  pi: string;
  digits: number;
  updatedAt: string;
}

export interface PauseResumeResetResponse {
  status: 'paused' | 'resumed' | 'reset';
  timestamp: string;
  pi?: string;
  digits?: number;
}
