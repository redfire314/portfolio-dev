import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public resultado: String = 'Resultado'
  pGasolina: Number
  pAlcool: Number

  public calcular(): void {
    if(this.pGasolina && this.pAlcool) {
      let fG = parseFloat(this.pGasolina.toString())
      let fA = parseFloat(this.pAlcool.toString())
      let res = fA/fG
      
      if(res >= 0.7) {
        this.resultado = 'Melhor gasolina'
      } else {
        this.resultado = 'Melhor álcool'
      }
    } else {
      this.resultado = 'Verifique os campos!'
    }
  }
}
