//import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

//@Component({
 // selector: 'app-root',
  //standalone: true,
  // Importamos RouterOutlet para manejar las rutas
  // Esto permite que Angular renderice los componentes según la ruta actual
  //imports: [RouterOutlet],
  //templateUrl: './app.html',
  //styleUrls: ['./app.css']
//})
//export class App {
//  protected title = 'stain-area-calculator';
//}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export  class App {
  protected title = 'stain-area-calculator';
}
