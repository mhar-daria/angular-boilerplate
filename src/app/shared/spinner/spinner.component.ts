import { Component } from '@angular/core'
import { LoadingService } from 'src/app/services/loading.service'

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}
