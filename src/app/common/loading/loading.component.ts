import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @Input() show: boolean = false
  @Input() diameter: number = 50
  @Input() color: string = 'warn'
}
