module.exports = {
  apps: [
    {
      name: 'webtmdt',
      script: 'npm',
      args: 'run start',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
