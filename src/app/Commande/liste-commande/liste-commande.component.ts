import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommandeService } from '../../service/commande.service';
import { Commande } from '../../model/commande';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListeLcommandeComponent } from '../liste-lcommande/liste-lcommande.component';

@Component({
	selector: 'app-liste-commande',
	templateUrl: './liste-commande.component.html',
	styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {

	commandeListe;
	SearchText: string;
	totalRecords: number;
	page: number = 1;

	constructor(private service: CommandeService, private router: Router,
		private toastr: ToastrService, public fb: FormBuilder,
		private datePipe: DatePipe,
		private matDialog: MatDialog) { }

	ngOnInit() {

		this.refreshListe();

	}

	refreshListe() {
		this.service.getAll().subscribe(
			response => { 
				this.commandeListe = response;
				this.totalRecords = this.commandeListe.length;
			}
		);

	}

	getLignesCommande(idCmde: number) {
		
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.width = "50%";
		dialogConfig.data = { idCmde };
		this.matDialog.open(ListeLcommandeComponent, dialogConfig);
		
	}


	onDelete(id: number, event: any) {

		if (window.confirm('Etes vous sure de supprimer cette commande ?')) {
			this.service.deleteData(id)
				.subscribe(
					data => {
						console.log(data);
						this.toastr.warning(' Commande supprim\u00e9e avec succ\u00e8s!');
						this.refreshListe();
					},
					error => console.log(error));
		}
		event.stopPropagation();
	}
	
	newComm() {
		this.service.choixmenu = "A";
		this.router.navigateByUrl('/home/(contentOutlet:addcommandes)');
	}

	onSelect(item: Commande) {

		this.service.formData = this.fb.group(Object.assign({}, item));
		this.service.choixmenu = "M"
		this.router.navigateByUrl('/home/(contentOutlet:addcommandes)');
	}
	transformDate(date) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}
}
