import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { FieldMessage } from "../models/fieldmessage";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInteceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .catch((error, caught) => {
            
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            
            console.log('Erro detectado pelo interceptor');
            console.log(errorObj)

            switch(errorObj.status){
                case 401: 
                this.handler401();

                case 403: 
                this.handler403();
                break;

                case 422:
                this.handler422(errorObj);
                break;

                default: 
                this.handlerDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any
    
    }

    handler403(){
        this.storage.setLocalUser(null);
    }

    handler401(){
       let alert = this.alertCtrl.create({
           title: 'Erro 401: Falha na autenticação',
           message: 'Email ou senha incorretos',
           enableBackdropDismiss: false,
           buttons: [
               { text: 'Ok'}
           ]
       });
       alert.present();
    }

    handler422(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErros(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                { text: 'Ok'}
            ]
        });
        alert.present();
    }

    handlerDefaultError(errorObj){
        console.log('Entrei no erro default')

        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': '+ errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                { text: 'Ok'}
            ]
        });
        alert.present();
           
    }

    listErros(messages : FieldMessage[]) : string {
        let s : string = '';

        for(var i = 0; i < messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + ': </strong>' + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInteceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInteceptor,
    multi: true
}