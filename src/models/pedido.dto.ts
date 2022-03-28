import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { RefDTO } from "./ref.dto";

export interface pedidoDTO {
    cliente: RefDTO,
    enderecoDeEntrega: RefDTO,
    pagamento: PagamentoDTO,
    itens: ItemPedidoDTO[]
}