import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserContextDto } from '../../dto/user-context.dto';

interface RequestWithUser extends Request {
  user: UserContextDto;
}

export const ExtractUserFromRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserContextDto => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException(
        'User not found in request. Authentication required.',
      );
    }

    return user;
  },
);
