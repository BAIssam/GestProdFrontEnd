import { Lcommande } from '../model/lcommande';
export class Commande {
    id :number;
    numCommande : number;
	dateCommande : any;
	annee : number;
    totht : number;
    tottva : number;
    totttc : number;
    lignesCommande :Array<Lcommande> =[];
}
 