/* import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.html'
})
export class ImageUploaderComponent {
  @Output() upload = new EventEmitter<HTMLImageElement>();

  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          console.log('✅ Imagen cargada y emitida');
          this.upload.emit(img); // 🔥 Aquí se emite al padre
        };
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
} */

  import { Component, Output, EventEmitter } from '@angular/core';
  import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.html',

})
export class ImageUploaderComponent {
  @Output() upload = new EventEmitter<HTMLImageElement>();

  fileLoaded = false;
  fileName = '';

  handleFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileLoaded = false;
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          console.log('✅ Imagen cargada y emitida');
          this.upload.emit(img);
          this.fileLoaded = true; // 🟢 Mostrar mensaje en UI
        };
        img.src = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}