import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Resultado de un cálculo individual
export interface CalculationResult {
  id: number;
  totalPoints: number;
  pointsInside: number;
  estimatedArea: number;
}

@Injectable({
  providedIn: 'root',
})
export class StainService {
  // Imagen binaria cargada (tipo genérico, puedes adaptar a ImageData, File, etc.)
  private imageSubject = new BehaviorSubject<HTMLImageElement | null>(null);
  image$ = this.imageSubject.asObservable();

  // Cantidad de puntos seleccionados por el usuario
  private pointCountSubject = new BehaviorSubject<number>(1000);
  pointCount$ = this.pointCountSubject.asObservable();

  // Resultados calculados acumulados
  private resultList: CalculationResult[] = [];
  private resultsSubject = new BehaviorSubject<CalculationResult[]>([]);
  results$ = this.resultsSubject.asObservable();

  private idCounter = 1;

  // 👤 Método para actualizar la imagen cuando se carga
  updateImage(img: HTMLImageElement) {
    this.imageSubject.next(img);
  }

  // 🔧 Método para actualizar la cantidad de puntos seleccionada
  updatePointCount(count: number) {
    this.pointCountSubject.next(count);
  }

  // 🎯 Método para calcular el área estimada del stain
  calculateArea() {
    const img = this.imageSubject.value;
    const n = this.pointCountSubject.value;
    console.log(`Calculando área con ${n} puntos...`);

    if (!img || n <= 0) {
    // Validamos que la imagen esté cargada y que la cantidad de puntos sea válida
    console.log(`Imagen no cargada`);
    return;
    
    }

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dibujamos la imagen en un canvas para acceder a los píxeles
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
    let ni = 0;

    //  Muestreo aleatorio de puntos
    for (let i = 0; i < n; i++) {
      const x = Math.floor(Math.random() * img.width);
      const y = Math.floor(Math.random() * img.height);
      const idx = (y * img.width + x) * 4;

      // El pixel es blanco si RGB = 255,255,255
      const r = imageData[idx];
      const g = imageData[idx + 1];
      const b = imageData[idx + 2];

      if (r > 200 && g > 200 && b > 200) {
        ni++;
      }
    }

    // 🧮 Fórmula del área estimada
    const area = img.width * img.height * (ni / n);

    const result: CalculationResult = {
      id: this.idCounter++,
      totalPoints: n,
      pointsInside: ni,
      estimatedArea: parseFloat(area.toFixed(2)),
    };

    console.log(`Área estimada: ${result.estimatedArea} píxeles`);
    // Agregamos el resultado a la lista y notificamos a los suscriptores
    this.resultList.push(result);
    this.resultsSubject.next([...this.resultList]);
  }
}