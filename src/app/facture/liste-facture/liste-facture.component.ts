import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactureService } from '../../service/facture.service';
import { Facture } from '../../model/facture';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListeLfactureComponent } from '../liste-lfacture/liste-lfacture.component';

@Component({
	selector: 'app-liste-facture',
	templateUrl: './liste-facture.component.html',
	styleUrls: ['./liste-facture.component.css']
})
export class ListeFactureComponent implements OnInit {

	factureListe;
	SearchText: string;
	totalRecords: number;
	page: number = 1;

	constructor(private service: FactureService, private router: Router,
		private toastr: ToastrService, public fb: FormBuilder,
		private datePipe: DatePipe, private matDialog: MatDialog) { }

	ngOnInit() {
		this.refreshListe();
	}

	refreshListe() {
		this.service.getAll().subscribe(
			response => { 
				this.factureListe = response; 
				this.totalRecords = this.factureListe.length;
			}
		);

	}

	getLignesFacture(idFact: number) {
		
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.width = "60%";
		dialogConfig.data = { idFact };
		this.matDialog.open(ListeLfactureComponent, dialogConfig);
		
	}

	onDelete(id: number, event: any) {
		if (window.confirm('Etes vous sure de supprimer cette facture ?')) {
			this.service.deleteAll(id)
				.subscribe(
					data => {
						console.log(data);
						this.toastr.warning(' Facture supprim\u00e9e avec succ\u00e8s!');
						this.refreshListe();
					},
					error => console.log(error));
		}
		event.stopPropagation();
	}
	
	newFacture() {
		this.service.choixmenu = "A"
		this.router.navigateByUrl('/home/(contentOutlet:addfactures)');
	}

	onSelect(item: Facture) {

		this.service.formData = this.fb.group(Object.assign({}, item));
		this.service.choixmenu = "M"
		this.router.navigateByUrl('/home/(contentOutlet:addfactures)');
	}
	
	transformDate(date) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}

}
