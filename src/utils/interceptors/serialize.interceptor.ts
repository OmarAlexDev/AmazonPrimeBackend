import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor{
    new (...args: any[]):{}
}

export class SerializerInterceptor implements NestInterceptor{

    constructor(private dto: ClassConstructor){}

    intercept(context: ExecutionContext, next: CallHandler<any>):  Observable<any>{
        return next.handle().pipe(
            map((data:any)=>{
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}