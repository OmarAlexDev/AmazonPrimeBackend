import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.raw.token ? 
        this.authService.verifyToken(request.raw.token) && this.authService.extractAdminLevel(request.raw.token).isAdmin 
        : 
        false;  
  }
}