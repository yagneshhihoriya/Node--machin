import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  confirmationAlert(title = 'Confirm', msg = 'continue with operation?') {
    return Swal.fire({
      title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
    });
  }

  successAlert(title = 'success', msg = 'operation done successfully') {
    Swal.fire({ title, text: msg, icon: 'success' });
  }

  failureAlret(title = 'Error', msg = 'operation has failed') {
    Swal.fire({ title, text: msg, icon: 'error' });
  }
}
