import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
         return next.handle().pipe(
            map(data=>{
                let  responseObject:any;
                if(data && data?.length > 0){
                    responseObject = {
                        success: true,
                        data:{
                            list: data,
                        },
                        error:null
                    }
                }else{
                    responseObject = {
                        success: true,
                        data,
                        error:null
                    }
                }
                return {
                    ...responseObject
                }
            }),
            catchError((err)=>{
                return of({
                    success: false,
                    data:null,
                    error: err.message || 'An error occurred'
                })
            })
         );
    }
}
