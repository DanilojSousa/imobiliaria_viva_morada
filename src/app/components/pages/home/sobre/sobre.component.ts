import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sobre',
    imports: [CommonModule, MatIconModule],
    templateUrl: './sobre.component.html',
    styleUrl: './sobre.component.css'
})
export class SobreComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    
  }

}
