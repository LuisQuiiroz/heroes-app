import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false
})
  // pure: false
  // con cada cambio que se detecte, el pipe se va a actualizar (consume muchos recursos)
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    // console.log('pime imagen se proceso');

    if(!heroe.id && !heroe.alt_img){
      return 'assets/no-image.png';
    } else if( heroe.alt_img){
      return heroe.alt_img;
    } else{
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }

}
