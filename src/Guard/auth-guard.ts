import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt"

export class AuthGuard implements CanActivate {
    private readonly secretKey = 'sdddsss--ddsss--ddss--ddss--ddss'
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const getRequest = context.switchToHttp().getRequest();
        const authHeader = getRequest.headers['authorization'];
        const token = this.extractToken(authHeader);
        if (!token){
            throw new UnauthorizedException('No token provided');
        }

        const userData = await this.jwtService.verifyAsync(token, { secret: this.secretKey })
        console.log('userData', userData)
        if(userData){
            getRequest.user = userData;
        }
        return true;
    }

    extractToken(authHeader: string): string | null {
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.slice(7, authHeader.length);
        }
        return null;
    }
}