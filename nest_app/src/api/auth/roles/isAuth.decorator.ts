import { SetMetadata } from '@nestjs/common';

export function IsAuth() {
    return SetMetadata('isAuth', true);
  }