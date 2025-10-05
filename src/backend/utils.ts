import { Request, Response } from 'express';
import { Server } from 'http';

export function gracefulShutdown(server: Server, signal: string) {
   console.info(`Received ${signal}. Starting graceful shutdown...`);

   server.close(() => {
      console.info('HTTP server closed');
      process.exit(0);
   });

   setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
   }, 10000);
}

export function finalErrorHandler(error: Error, _: Request, res: Response) {
   console.error('Unhandled error:', error);
   res.status(500).json({ error: 'Internal server error' });
}