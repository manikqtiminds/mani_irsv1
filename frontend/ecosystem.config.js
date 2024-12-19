module.exports = {
    apps: [{
      name: 'car-inspection-frontend',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 80,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
        PM2_SERVE_REWRITES: JSON.stringify([
          { "source": "/**", "destination": "/index.html" }
        ])
      }
    }]
  }