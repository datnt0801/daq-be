import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const AllowedRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RoleGuard implements CanActivate {

    constructor (private readonly reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const payload = request.payload;
        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!roles) {
            return true;
        }
        return roles.includes(payload.userType);
    }
}