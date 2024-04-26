import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


export class SubscriptionGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.raw.currUser && request.raw.currUser.id ? true : false;  
  }
}