import { SavePrincipalAction } from './save.principal.action';
import { SAVE_PRINCIPAL } from './save.principal.action';
import { Principal } from './principal.model';

export function principalReducer(state: Principal, action: SavePrincipalAction){
  switch(action.type){
    //assign permet de fusionner les objets
    case SAVE_PRINCIPAL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
