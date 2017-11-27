import { Component, OnInit, Input } from '@angular/core';

// Imports para llevar a lib ABM
import { ButtonModule, ToolbarModule } from 'primeng/primeng';


@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.css']
})
export class AbmComponent implements OnInit {

  titulo = "ABM";
  @Input() tabla : string;

  constructor() { }

  ngOnInit() {
  }

}
