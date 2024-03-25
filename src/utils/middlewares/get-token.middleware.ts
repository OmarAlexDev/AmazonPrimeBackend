import { NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify';

interface RequestCustom extends FastifyRequest {
  token: string;
}

export class GetToken implements NestMiddleware{
    use(req: RequestCustom, res: FastifyReply['raw'], next: () => void) {
        if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer ')){
          req.token = req.headers.authorization.replace('Bearer ','')
        }
        next();
      }
}