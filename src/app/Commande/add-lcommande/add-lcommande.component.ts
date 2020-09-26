import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { Lcommande } from '../../model/lcommande';
import { CommandeService } from '../../service/commande.service';
import { LcommandeService } from '../../service/lcommande.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-add-lcommande',
	templateUrl: './add-lcommande.component.html',
	styleUrls: ['./add-lcommande.component.css']
})
export class AddLcommandeComponent implements OnInit {

	articleList: Article[];
	isValid: boolean = true;
	wtotht = 0;
	wtottva = 0;
	wtotttc = 0;
	public formData: FormGroup;

	constructor(public service: LcommandeService,
		@Inject(MAT_DIALOG_DATA) public data,
		public dialogRef: MatDialogRef<AddLcommandeComponent>,
		private articleService: ArticleService,
		private commandeService: CommandeService, public fb: FormBuilder) { }

	get f() { return this.formData.controls; }

	ngOnInit() {
		if (this.data.lcommandeIndex == null) {
			this.InfoForm();
		}
		else {
			this.formData = this.fb.group(Object.assign({}, this.commandeService.listlignesCommande[this.data.lcommandeIndex]));
		}
		this.articleService.getAll().subscribe(
			response => { this.articleList = response; }
		);
	}


	InfoForm() {
		this.formData = this.fb.group({
			id: null,
			numero: this.data.numero,
			qte: 0,
			pu: 0,
			tva: 0,
			totht: 0,
			tottva: 0,
			totttc: 0,
			libart: '',
			code_article: '',
			comm_id: this.data.id_commande,

		});
	}


	selectPrice(ctrl) {
		if (ctrl.selectedIndex == 0) {
			this.f['pu'].setValue(0);
			this.f['tva'].setValue(0);
			this.f['libart'].setValue('');
			this.f['qte'].setValue(0);
		}
		else {
			this.f['pu'].setValue(this.articleList[ctrl.selectedIndex - 1].pa);
			this.f['tva'].setValue(this.articleList[ctrl.selectedIndex - 1].tva);
			this.f['libart'].setValue(this.articleList[ctrl.selectedIndex - 1].libelle);
			this.f['code_article'].setValue(this.articleList[ctrl.selectedIndex - 1].code);
		}
		this.cal();
	}

	cal() {

		this.wtotht = parseFloat((this.formData.value.qte * this.formData.value.pu).toFixed(3));
		this.wtottva = parseFloat(((this.wtotht * this.formData.value.tva) * 0.01).toFixed(3));
		this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
		this.f['totht'].setValue(this.wtotht);
		this.f['tottva'].setValue(this.wtottva);
		this.f['totttc'].setValue(this.wtotttc);
	}

	onSubmit() {

		if (this.data.lcommandeIndex == null) {
			this.commandeService.listlignesCommande.push(this.formData.value)
		}
		else {
			this.commandeService.listlignesCommande[this.data.lcommandeIndex] = this.formData.value;
		}
		this.f['code_article'].setValue(0);
		this.f['pu'].setValue(0);
		this.f['qte'].setValue(0);
		this.f['tva'].setValue(0);
		this.f['totht'].setValue(0);
		if (this.commandeService.choixmenu == "M")
			this.dialogRef.close();

	}

	validateForm(formData: Lcommande) {
		this.isValid = true;
		if (formData.code_article == '')
			this.isValid = false;
		else if (formData.qte == 0)
			this.isValid = false;
		return this.isValid;
	}
}
