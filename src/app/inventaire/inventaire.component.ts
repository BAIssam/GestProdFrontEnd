import { Component, OnInit } from '@angular/core';
import { InventaireService } from '../service/inventaire.service';
import { Inventaire } from '../model/inventaire';
@Component({
	selector: 'app-inventaire',
	templateUrl: './inventaire.component.html',
	styleUrls: ['./inventaire.component.css']
})
export class InventaireComponent implements OnInit {
	
	listInventaire: Inventaire[];
	totalRecords: number;
	page: number = 1;

	constructor(private invService: InventaireService) { }

	ngOnInit() {
		this.getInventaire();
	}

	getInventaire() {
		this.invService.getInventaire().subscribe(
			response => { 
				this.listInventaire = response;
				this.totalRecords = this.listInventaire.length;
			}
		);
	}

}
