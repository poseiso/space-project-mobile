const endpoints = {
  health: '/health',
  pi: '/pi',
  pause: '/pi/pause',
  resume: '/pi/resume',
  reset: '/pi/reset',
} as const;

export default endpoints;
