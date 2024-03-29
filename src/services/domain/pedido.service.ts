import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { pedidoDTO } from "../../models/pedido.dto";

@Injectable()
export class PedidoService {
    
    constructor(public http: HttpClient){
    }

    insert(obj: pedidoDTO) {
        return  this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj, {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}