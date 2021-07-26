import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "http";

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    return super.createIOServer(port, { ...options, cors: true });
  }
}