module.exports = {
  apps: [
    {
      name: 'aac-api',
      script: './server/index.js',
      watch: true,
      interpreter: 'babel-node',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'aac-client',
      script: './server.js',
      watch: true,
      interpreter: 'babel-node',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
