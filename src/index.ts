import config from './config/config';
import app from './app';

const server = app.listen(config.port, () => {
  console.log(`Server en port: ${config.port}`);
});

export { app, server };
