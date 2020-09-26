import { Component, OnInit, Inject } from '@angular/core';
import { CommandeService } from '../../service/commande.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
	selector: 'app-liste-lcommande',
	templateUrl: './liste-lcommande.component.html',
	styleUrls: ['./liste-lcommande.component.css']
})
export class ListeLcommandeComponent implements OnInit {

	lCommandeListe;

	constructor(private service: CommandeService,
	@Inject(MAT_DIALOG_DATA) public data) { }

	ngOnInit() {
		this.getLignesCommande(this.data.idCmde);
	}

	getLignesCommande(idCmde: number) {
		
		this.service.getLCommande(idCmde).subscribe(
			response => { this.lCommandeListe = response; }
		);

	}


}
