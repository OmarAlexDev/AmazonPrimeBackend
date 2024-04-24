import { NestMiddleware, Injectable } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from "src/auth/auth.service";

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

    constructor(private authService: AuthService){}

    use(req: RequestCustom, res: FastifyReply['raw'], next: () => void) {
        if(req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer ')){
          const tokenContents: IUser = this.authService.verifyToken(req.headers.authorization.replace('Bearer ',''));
          req.currUser = tokenContents;
        }
        next();
      }
}