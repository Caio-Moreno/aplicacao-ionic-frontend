import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';



@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      { 
        id: "1",
        logradouro: "Rua quinze de novembro",
        numero: "118",
        complemento: "Casa",
        bairro: "Parque regina",
        cep: "05775200",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas gerais"
          }
        }
      },
      { 
        id: "2",
        logradouro: "Av professor leitao da cunha",
        numero: "118",
        complemento: "Casa",
        bairro: "Parque regina",
        cep: "05775200",
        cidade: {
          id: "1",
          nome: "São Paulo",
          estado: {
            id: "1",
            nome: "São Paulo"
          }
        }
      }
    ]
  }

}
