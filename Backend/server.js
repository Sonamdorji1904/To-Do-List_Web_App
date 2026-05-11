import { app, port } from './index.js';

const startServer = (currentPort) => {
  const server = app.listen(currentPort, () => {
    console.log(`Server running on port ${currentPort}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = Number(currentPort) + 1;
      console.warn(`Port ${currentPort} is in use, retrying on ${nextPort}`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
};

startServer(Number(port) || 5000);