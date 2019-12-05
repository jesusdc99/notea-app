import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  // https://youtu.be/ugZDc_bL8PY
  transform(array: any[], texto: string): any[] {
    if(texto === undefined) {
      return array;
    }

    texto = texto.toLowerCase();

    return array.filter((item) => {
      return item.title.toLowerCase().includes(texto) || item.description.toLowerCase().includes(texto);
    });
  }

}
