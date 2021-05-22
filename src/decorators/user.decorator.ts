import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // const ctx = GqlExecutionContext.create(context);
    // const seller: Seller = ctx.getContext().req.seller;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw Error('No JWT. I refuse to proceed');
    }
    return user;
  },
);
