import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from '../../components/image-uploader/image-uploader';
import { PointSliderComponent } from '../../components/point-slider/point-slider';
import { AreaCalculatorComponent } from '../../components/area-calculator/area-calculator';
import { ResultsTableComponent } from '../../components/results-table/results-table';
import { MethodologyExplainerComponent } from '../../components/methodology-explainer/methodology-explainer';


import { StainService } from '../../services/stain.service';
import { MaterialModule } from '../../material/material.module';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-stain-area-view',
  standalone: true,
  imports: [
    CommonModule,
    ImageUploaderComponent,
    PointSliderComponent,
    AreaCalculatorComponent,
    MethodologyExplainerComponent,
    ResultsTableComponent,
    MaterialModule,
    MatTabsModule
  ],
  templateUrl: './stain-area-view.html',
  styleUrl: './stain-area-view.css',
})
export class StainAreaViewComponent {
  constructor(public stainService: StainService) {}

  // 🧠 Este método conecta el slider con el servicio
  onPointChange(n: number) {
    this.stainService.updatePointCount(n);
  }

  // 📤 Este método recibe la imagen cargada desde el componente hijo
  onImageUpload(img: HTMLImageElement) {
    console.log('📤 Imagen recibida en StainAreaViewComponent');
    this.stainService.updateImage(img);
  }
}