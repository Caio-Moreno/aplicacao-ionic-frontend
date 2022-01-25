import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CatergoriaDTO } from "../../models/categoria.dto";

@Injectable()
export class categoriaService {
    
    constructor(public http: HttpClient){
    }

    findAll() : Observable<CatergoriaDTO[]> {
       return  this.http.get<CatergoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}