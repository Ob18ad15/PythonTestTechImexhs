import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
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
}