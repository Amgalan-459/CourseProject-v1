import { CanActivateFn } from '@angular/router';

export const trainerGuard: CanActivateFn = (route, state) => {
  return true;
};
