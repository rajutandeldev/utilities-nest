import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
         return next.handle().pipe(
            map(data=>{
                let  responseObject:any;
                if(data && data?.length > 0){
                    responseObject = {
                        status: "success",
                        data:{
                            list: data,
                        },
                        error:null
                    }
                }else{
                    responseObject = {
                        status: "success",
                        data,
                        error:null
                    }
                }
                return {
                    ...responseObject
                }
            })
         );
    }
}
