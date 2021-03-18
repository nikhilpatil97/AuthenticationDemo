import {
  Injectable
} from '@angular/core';
import {
  ToastrService
} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrNotification: ToastrService) {}

  showSuccess(message, title) {
    this.toastrNotification.success(message, title)
  }

  showError(message, title) {
    this.toastrNotification.error(message, title)
  }

  showInfo(message, title) {
    this.toastrNotification.info(message, title)
  }

  showWarning(message, title) {
    this.toastrNotification.warning(message, title)
  }

}
