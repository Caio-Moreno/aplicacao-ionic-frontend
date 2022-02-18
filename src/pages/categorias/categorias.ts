import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CatergoriaDTO } from '../../models/categoria.dto';
import { categoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CatergoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: categoriaService) {
  }



  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }

  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }


}
