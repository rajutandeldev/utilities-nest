import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
         return next.handle().pipe(
            map(data=>{
                return {
                    status: context.switchToHttp().getResponse().statusCode,
                    data,
                    error: null
                }
            })
         );
    }
}
