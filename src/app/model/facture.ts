import { Lfacture } from '../model/lfacture';
export class Facture {
    id :number;
    dateFacture : any;
    numero   : number;
	timbre : number;
    totht : number;
    totrem : number;
    tottva : number;
    totttc : number;
    lignesFactures :Array<Lfacture> =[];
}
