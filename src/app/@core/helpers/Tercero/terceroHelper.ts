import { RequestManager } from '../../managers/requestManager';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TerceroHerlper {
    constructor(private rqManager: RequestManager) { }

    public getTerceros(id?: any) {
        this.rqManager.setPath('TERCEROS_SERVICE');
        return this.rqManager.get('/tercero/' + id).pipe(
            map(
                (res) => {
                    if (res === 'error') {
                        console.log('No se puede encontrar el Tercero');
                        return undefined;
                    }
                    return res;
                },
            ),
        );
    }
}