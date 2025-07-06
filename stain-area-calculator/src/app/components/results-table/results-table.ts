import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Estructura de un cálculo de área que se mostrará en la tabla
interface CalculationResult {
  id: number;       // Identificador único
  totalPoints: number;  // n
  pointsInside: number; // ni
  estimatedArea: number; // Área estimada
}

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-table.html',
  //styleUrl: './results-table.component.css',
})
export class ResultsTableComponent {
  // Recibe un arreglo de resultados desde el componente padre
  @Input() results: CalculationResult[] = [];
}
