import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-methodology-explainer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './methodology-explainer.html',
 // styleUrls: ['./methodology-explainer.css'],
})
export class MethodologyExplainerComponent {
  // Paso activo del carousel (simple estado para navegación)
  activeStep = 0;

  // Lista de pasos explicativos
  steps = [
    {
      title: 'Paso 1: Cargar imagen binaria',
      description: 'Sube una imagen donde los píxeles blancos representan la mancha y los negros el fondo.',
    },
    {
      title: 'Paso 2: Generar puntos aleatorios',
      description: 'El sistema genera n puntos aleatorios dentro de los límites de la imagen.',
    },
    {
      title: 'Paso 3: Contar puntos dentro de la mancha (ni)',
      description: 'Se verifica cuáles de esos puntos caen sobre píxeles blancos.',
    },
    {
      title: 'Paso 4: Estimar el área',
      description: 'Se usa la fórmula A = Área total × (ni / n) para calcular la proporción de mancha.',
    },
  ];

  // Avanza al siguiente paso
  nextStep() {
    this.activeStep = (this.activeStep + 1) % this.steps.length;
  }

  // Regresa al paso anterior
  prevStep() {
    this.activeStep = (this.activeStep - 1 + this.steps.length) % this.steps.length;
  }
}