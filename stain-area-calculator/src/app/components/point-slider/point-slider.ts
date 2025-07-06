import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-point-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './point-slider.html',
})
export class PointSliderComponent {
  // Valor del slider, con un valor inicial razonable
  pointCount = 1000;

  // Evento personalizado para emitir el cambio de puntos al componente padre
  @Output() pointChange = new EventEmitter<number>();

  // Método que se ejecuta cuando el usuario cambia el valor
  onSliderChange() {
    this.pointChange.emit(this.pointCount); // Emitimos el nuevo valor
  }
}