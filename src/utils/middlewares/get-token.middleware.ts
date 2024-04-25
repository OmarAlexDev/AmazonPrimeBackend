import { NestMiddleware, Injectable } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify';
import {verifyToken} from 'src/utils/functions/jwt';

type IUser = {
  id: number,
  email: string,
  isAdmin: boolean
}

interface RequestCustom extends FastifyRequest {
  currUser: IUser
}

@Injectable()
export class GetToken implements NestMiddleware{

    use(req: RequestCustom, res: FastifyReply['raw'], next: () => void) {
        if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer ')){
          const tokenContents: IUser = verifyToken(req.headers.authorization.replace('Bearer ',''));
          req.currUser = tokenContents;
        }
        next();
      }
}