import { CanActivateFn } from '@angular/router';

export const traineeGuard: CanActivateFn = (route, state) => {
  return true;
};
