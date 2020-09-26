import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommandeService } from '../../service/commande.service';
import { LcommandeService } from '../../service/lcommande.service';
import { DatePipe } from '@angular/common';
import { AddLcommandeComponent } from '../../commande/add-lcommande/add-lcommande.component';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-add-commande',
	templateUrl: './add-commande.component.html',
	styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

	isValid: boolean = true;
	articleService: any;
	Date: any;
	compteur: any = {};
	annee = 0;

	constructor(public commService: CommandeService,
		public lcommservice: LcommandeService,
		private dialog: MatDialog, public fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router,
		private datePipe: DatePipe) { }

	get f() { return this.commService.formData.controls }

	ngOnInit() {

		if (this.commService.choixmenu == "A") {
			this.InitForm();
			this.commService.listlignesCommande = [];
			this.Date = this.transformDate(new Date(Date.now()));
			this.annee = (this.Date).toString().substring(0, 4);
			this.f['annee'].setValue(this.annee);
		}
		else {
			this.lcommservice.getAllByIdCommande(this.commService.formData.value.id).subscribe(
				response => { this.commService.listlignesCommande = response }
			);
			this.f['dateCommande'].setValue(this.commService.formData.value.dateCommande);
		}

	}

	InitForm() {
		this.commService.formData = this.fb.group({
			id: null,
			annee: 0,
			numCommande: 0,
			dateCommande: '',
			totht: 0,
			tottva: 0,
			totttc: 0,
			lignesCommande: []
		});
	}

	resetForm() {
		this.commService.formData.reset();
	}

	AddData(lcommandeIndex: any, Id: any) {
		if (lcommandeIndex == null) {
			this.commService.choixmenu = "A";
		} else {
			this.commService.choixmenu = "M";
		}
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.width = "50%";
		dialogConfig.data = { lcommandeIndex, Id };
		this.dialog.open(AddLcommandeComponent, dialogConfig).afterClosed().subscribe(b10 => {
			this.calcul();
		});
	}

	onDelete(Id: number, i: number) {
		if (Id != null)
			this.commService.formData.value.id += Id;
		this.commService.listlignesCommande.splice(i, 1);
		this.calcul();
	}

	calcul() {
		this.f['totht'].setValue(this.commService.listlignesCommande.reduce((prev: any, curr: any) => {
			return prev + curr.totht;
		}, 0));
		this.f['tottva'].setValue(this.commService.listlignesCommande.reduce((prev: any, curr: any) => {
			return prev + curr.tottva;
		}, 0));
		this.f['totttc'].setValue(this.commService.listlignesCommande.reduce((prev: any, curr: any) => {
			return prev + curr.totttc;
		}, 0));

	}

	validateForm() {
		this.isValid = true;

		if (this.commService.listlignesCommande.length == 0)
			this.isValid = false;
		return this.isValid;
	}

	onSubmit() {
		this.f['lignesCommande'].setValue(this.commService.listlignesCommande);
		this.commService.saveOrUpdate(this.commService.formData.value).
			subscribe(data => {
				this.toastr.success('Validation Faite avec Succ\u00e8s');
				this.router.navigateByUrl('/home/(contentOutlet:listecommandes)');
			});
	}

	goToListeCommandes() {
		this.router.navigateByUrl('/home/(contentOutlet:listecommandes)');
	}

	transformDate(date: any) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}

}
