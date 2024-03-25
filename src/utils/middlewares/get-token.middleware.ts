import { NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify';

export class GetToken implements NestMiddleware{
    use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
        if(req.headers.authorization){
          req.headers.authorization = req.headers.authorization.replace('Bearer ','')
        }
        next();
      }
}