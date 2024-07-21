import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
 // const toastr = inject(ToastrService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
   // toastr.error('Error', 'Please Login First');
    router.navigate(['home']);
    return false;
  }
};
