import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { Lfacture } from '../../model/lfacture';
import { FactureService } from '../../service/facture.service';
import { LfactureService } from '../../service/lfacture.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add-lfacture',
	templateUrl: './add-lfacture.component.html',
	styleUrls: ['./add-lfacture.component.css']
})
export class AddLfactureComponent implements OnInit {

	formData: FormGroup;
	articleList: Article[];
	isValid: boolean = true;
	wtotht = 0;
	wtothtrem = 0;
	wtottva = 0;
	wtotttc = 0;
	public stockDispo: number;
	public codeBarre: number;
	public codeArticle: number;
	public isDisabled: boolean;

	constructor(public service: LfactureService,
		@Inject(MAT_DIALOG_DATA) public data,
		public dialogRef: MatDialogRef<AddLfactureComponent>,
		private articleService: ArticleService,
		private factService: FactureService, public fb: FormBuilder,
		private toastr: ToastrService) { }

	get f() { return this.formData.controls; }

	ngOnInit() {
		this.articleService.getAll().subscribe(
			response => { this.articleList = response; }
		);
		if (this.data.lfactureIndex == null) {
			this.initForm();
			this.isDisabled = true;
		}
		else {
			this.codeArticle = this.factService.listLignesFacture[this.data.lfactureIndex].code;
			this.getArticleByCode(this.codeArticle);			
			
			this.formData = this.fb.group(Object.assign({}, this.factService.listLignesFacture[this.data.lfactureIndex], {codeBarre: 0}, {stock: 0}));
			//this.codeBarre = this.formData.value.codeBarre;
			//this.stockDispo = this.formData.value.stock;
			
			this.isDisabled = false;
		}

	}

	initForm() {
		this.formData = this.fb.group({
			id: null,
			numero: this.data.id_commande,
			qte: 0,
			pv: 0,
			remise: 0,
			tva: 0,
			totht: 0,
			tottva: 0,
			totttc: 0,
			//totrem: 0,
			id_article: 0,
			libelle: '',
			code: '',
			codeBarre: '',
			stock: 0
		});
	}

	updatePrice(ctrl) {
		if (ctrl.selectedIndex == 0) {
			this.f['pv'].setValue(0);
			this.f['tva'].setValue(0);
			this.f['libelle'].setValue(' ');
			this.f['qte'].setValue(0);
		}
		else {
			this.f['pv'].setValue(this.articleList[ctrl.selectedIndex - 1].pv);
			this.f['remise'].setValue(this.articleList[ctrl.selectedIndex - 1].remise);
			//this.f['totrem'].setValue(this.articleList[ctrl.selectedIndex - 1].remise);
			this.f['tva'].setValue(this.articleList[ctrl.selectedIndex - 1].tva);
			this.f['libelle'].setValue(this.articleList[ctrl.selectedIndex - 1].libelle);
			this.f['code'].setValue(this.articleList[ctrl.selectedIndex - 1].code);
			this.f['codeBarre'].setValue(this.articleList[ctrl.selectedIndex - 1].codeBarre);
			this.f['stock'].setValue(this.articleList[ctrl.selectedIndex - 1].stock);
			this.stockDispo = this.articleList[ctrl.selectedIndex - 1].stock;
			this.codeBarre = this.articleList[ctrl.selectedIndex - 1].codeBarre;
		}
		this.calcul();
	}

	calcul() {
		this.wtotht = parseFloat((this.formData.value.qte * this.formData.value.pv).toFixed(3));
		this.wtothtrem = parseFloat(
			(this.wtotht - (this.wtotht * this.formData.value.remise * 0.01))
				.toFixed(3)
		);
		this.wtottva = parseFloat(((this.wtothtrem * this.formData.value.tva) * 0.01).toFixed(3));
		this.wtotttc = parseFloat((this.wtothtrem + this.wtottva).toFixed(3));
		this.f['totht'].setValue(this.wtothtrem);
		this.f['tottva'].setValue(this.wtottva);
		this.f['totttc'].setValue(this.wtotttc);
	}

	onSubmit() {
		var maj: boolean = false;

		if (this.validateForm(this.formData.value)) {
			if (this.data.lfactureIndex == null) {

				this.factService.listLignesFacture.forEach(
					item => {
						if (item.codeBarre == this.formData.value.codeBarre) {
							maj = true;
							item.qte = parseInt(item.qte) + parseInt(this.formData.value.qte);
						}
					}
				);

				if (!maj) {
					this.factService.listLignesFacture.push(this.formData.value);
				}

			}
			else {
				this.factService.listLignesFacture[this.data.lfactureIndex] = this.formData.value;
			}
		}
		this.f['code'].setValue(0);
		this.f['pv'].setValue(0);
		this.f['qte'].setValue(0);
		this.f['remise'].setValue(0);
		this.f['tva'].setValue(0);
		this.f['totht'].setValue(0);
		this.f['tottva'].setValue(0);
		this.f['totttc'].setValue(0);
		if (this.factService.choixmenu == "M")
			this.dialogRef.close();
	}

	validateForm(formData: Lfacture) {
		this.isValid = true;
		if (formData.code == '')
			this.isValid = false;
		else if (formData.qte == 0 || this.stockDispo < formData.qte)
			this.isValid = false;

		return this.isValid;
	}

	verifierStock() {
		this.isDisabled = false;
		if (this.factService.listLignesFacture.length != 0) {
			this.factService.listLignesFacture.forEach(
				item => {
					if (this.factService.choixmenu == "A" && item.code == this.codeArticle &&
						(parseInt(item.qte) + parseInt(this.formData.value.qte)) > this.stockDispo) {
						this.isDisabled = true;
						this.toastr.error('Stock insuffisant');
					} else if (this.factService.choixmenu == "M" && item.code == this.codeArticle &&
						parseInt(this.formData.value.qte) > this.stockDispo) {
						this.isDisabled = true;
						this.toastr.error('Stock insuffisant');
					} else if (this.formData.value.qte == '' || this.formData.value.qte == 0) {
						this.isDisabled = true;
					}
				}
			);
		} else if (this.formData.value.qte > this.stockDispo) {
			this.isDisabled = true;
			this.toastr.error('Stock insuffisant');
		} else if (this.formData.value.qte == '' || this.formData.value.qte == 0) {
			this.isDisabled = true;
		}
	}
	
	getArticleByCode(code) {
		this.articleService.getArticleByCode(code).subscribe(
			response => {
				this.articleService.article = response;
				this.codeBarre = this.articleService.article.codeBarre;
				this.stockDispo = this.articleService.article.stock;
				this.formData = this.fb.group(Object.assign({}, this.factService.listLignesFacture[this.data.lfactureIndex], {codeBarre: this.codeBarre}, {stock: this.stockDispo}));
			}
		);
	}

}
