import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt"

export class AuthGuard implements CanActivate {
    private jwtService = new JwtService({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' }
    })

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const getRequest = context.switchToHttp().getRequest();
        const authHeader = getRequest.headers['authorization'];
        const token = this.extractToken(authHeader);
        if (!token){
            throw new UnauthorizedException('No token provided');
        }

        const userData = await this.jwtService.verifyAsync(token)
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