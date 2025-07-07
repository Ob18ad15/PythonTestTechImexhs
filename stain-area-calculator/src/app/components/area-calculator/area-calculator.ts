import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StainService, CalculationResult } from '../../services/stain.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-area-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area-calculator.html',
  //styleUrl: './area-calculator.component.css',
})
export class AreaCalculatorComponent {
  // Observable que contiene el último cálculo realizado
  lastResult$: Observable<CalculationResult | undefined>;

  constructor(private stainService: StainService) {
    // Extraemos el último resultado observable desde el servicio
    this.lastResult$ = this.stainService.results$.pipe(
      // Nos quedamos con el último elemento del arreglo
      map(results => results.length ? results[results.length - 1] : undefined)
    );
  }

  // Método que se llama al hacer clic en el botón
  calcular() {
    this.stainService.calculateArea();
  }
}