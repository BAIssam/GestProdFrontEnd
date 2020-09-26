import { Component, OnInit, Inject } from '@angular/core';
import { FactureService } from '../../service/facture.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-liste-lfacture',
	templateUrl: './liste-lfacture.component.html',
	styleUrls: ['./liste-lfacture.component.css']
})
export class ListeLfactureComponent implements OnInit {
	
	lFactureListe: any;

	constructor(private service: FactureService,
	@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		this.getLignesFacture(this.data.idFact);
	}

	getLignesFacture(idFact: number) {
		this.service.getLFacture(idFact).subscribe(
			response => { this.lFactureListe = response; }
		);

	}


}
