import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FactureService } from '../../service/facture.service';
import { LfactureService } from '../../service/lfacture.service';
import { ArticleService } from '../../service/article.service';
import { DatePipe } from '@angular/common';
import { AddLfactureComponent } from '../../facture/add-lfacture/add-lfacture.component';
import { FormBuilder } from '@angular/forms';
import { Lcommande } from '../../model/lcommande';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-add-facture',
	templateUrl: './add-facture.component.html',
	styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {

	public isValid: boolean = false;
	minDate;
	numcomm: number;
	Date;
	annee = 0;
	mois = 0;
	bigestFacNumber = 0;
	article: any;
	code;
	public isDisabled: boolean = true;

	private modelChanged: Subject<string> = new Subject<string>();
	private subscription: Subscription;
	debounceTime = 500;
	@ViewChild('qteInput')
	qteInput: any;
	@ViewChild('codeBarre')
	codeBarre: any;

	constructor(public service: FactureService,
		private dialog: MatDialog, public fb: FormBuilder,
		public lfactservice: LfactureService,
		public articleService: ArticleService,
		private toastr: ToastrService,
		private router: Router,
		private currentRoute: ActivatedRoute,
		private datePipe: DatePipe) { }

	get f() { return this.service.formData.controls; }

	ngOnInit() {
		//****** Accélérer la réaction de change event *********
		this.subscription = this.modelChanged
			.pipe(
				debounceTime(this.debounceTime),
			)
			.subscribe(() => {
				this.getArticleByCodeBar(this.code);
				this.verifierStock();
			});
		//***************
		this.minDate = this.transformDate(new Date());
		this.codeBarre.nativeElement.focus();
		if (this.service.choixmenu == "A") {
			this.Date = this.transformDate(new Date(Date.now()));
			this.mois = (this.Date).toString().substr(5, 2);
			this.annee = (this.Date).toString().substring(0, 4);
			this.getNextNumberFacture();
			this.initForm();
			this.service.listLignesFacture = [];
			this.f['annee'].setValue(this.annee);
			this.validateForm();
		}
		else {
			//this.service.listLignesFacture = this.service.formData.controls.lignesFactures.value;
			this.service.getLFacture(this.service.formData.value.id).subscribe(
				response => {
					this.service.listLignesFacture = response;					
					this.validateForm();
				}
			);

		}

	}

	initForm() {
		this.service.formData = this.fb.group({
			id: null,
			dateFacture: new Date().toISOString().substring(0, 10),
			annee: (this.Date).toString().substring(0, 4),
			numero: 0,
			timbre: 0,
			totht: 0,
			totrem: 0,
			tottva: 0,
			totttc: 0,
			lignesFactures: [],
			codeBarre: '',
			libelleArticle: '',
			pu: 0,
			qte: 1,
			rem: 0
		});
	}

	ResetForm() {
		this.service.formData.reset();
	}

	ResetFormArticle() {
		(<HTMLInputElement>document.getElementById("codeBarre")).value = "";
		(<HTMLInputElement>document.getElementById("qte")).value = "";
		(<HTMLInputElement>document.getElementById("libelleArticle")).value = "";
		(<HTMLInputElement>document.getElementById("pu")).value = "";
	}

	Add(lfactureIndex: any, id: any) {
		if (lfactureIndex == null) {
			this.service.choixmenu = "A";
		} else {
			this.service.choixmenu = "M";
		}
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.width = "50%";
		dialogConfig.data = { lfactureIndex, id };
		this.dialog.open(AddLfactureComponent, dialogConfig).afterClosed().subscribe(b10 => {
			this.Calcul();
		});

	}

	getArticleByCodeBar(codeBar) {
		if (codeBar.length == 13) {
			this.articleService.getArticleByCodeBar(codeBar).subscribe(
				response => {
					this.article = response;
					if (this.article != null) {
						this.qteInput.nativeElement.focus();
						(<HTMLInputElement>document.getElementById("qte")).value = "1";
						(<HTMLInputElement>document.getElementById("libelleArticle")).value = this.article.libelle;
						(<HTMLInputElement>document.getElementById("pu")).value = this.article.pv;
						(<HTMLInputElement>document.getElementById("remise")).value = this.article.remise;
						this.AddArticleToLignesFacture();
						//this.f['libelleArticle'].setValue(this.article.libelle);
						//this.f['pu'].setValue(this.article.pv);
					}
				}
			);

		}
	}

	getNextNumberFacture() {
		this.service.getBigestNumberFacture().subscribe(
			response => {
				this.bigestFacNumber = response;
				if (this.bigestFacNumber == 0 || parseInt(this.bigestFacNumber.toString().substr(4, 2)) < parseInt(this.mois.toString())) {
					this.f['numero'].setValue(this.annee.toString().concat(this.mois.toString(), "1"));
				} else {
					this.f['numero'].setValue(this.bigestFacNumber + 1);
				}
			}
		);
	}

	AddArticleToLignesFacture() {
		var maj: boolean = false;

		if (this.article != null && this.verifierStock()) {
			this.service.listLignesFacture.forEach(
				item => {
					if (item.codeBarre == this.article.codeBarre) {
						maj = true;
						item.qte = parseInt(item.qte) + parseInt((<HTMLInputElement>document.getElementById("qte")).value);
						item.totht = (parseFloat(item.pv) - ((parseFloat(item.pv) * parseInt(item.remise)/100)))* parseInt(item.qte);
						item.totht = parseFloat(item.totht.toFixed(3));
						item.tottva = (parseFloat(item.totht) * parseInt(item.tva)) / 100;
						item.tottva = parseFloat(item.tottva.toFixed(3));
						item.totttc = parseFloat(item.totht) + parseFloat(item.tottva);
						item.totttc = parseFloat(item.totttc.toFixed(3));
					}
				}
			);

			if (!maj) {
				this.article.codeBarre = (<HTMLInputElement>document.getElementById("codeBarre")).value;
				this.article.qte = (<HTMLInputElement>document.getElementById("qte")).value;
				this.service.listLignesFacture.push(this.article);
				this.article.totht = (this.article.pv - ((this.article.pv * this.article.remise) / 100)) * this.article.qte;
				this.article.totrem = this.article.remise;
				this.article.tottva = (this.article.totht * this.article.tva) / 100;
				this.article.totttc = this.article.totht + this.article.tottva;
			}

			this.Calcul();
			this.validateForm();
			this.ResetFormArticle();
		}
	}

	OnDelete(item: Lcommande, Id: number, i: number) {
		if (Id != null)
			this.service.formData.value.id += Id;
		this.service.listLignesFacture.splice(i, 1);
		this.Calcul();
		this.validateForm();
	}

	Calcul() {
		this.f['totht'].setValue(this.service.listLignesFacture.reduce((prev, curr) => {
			return prev + curr.totht;
		}, 0));
		this.f['totrem'].setValue(this.service.listLignesFacture.reduce((prev, curr) => {
			return prev + ((curr.remise * curr.pv)/100)*curr.qte;
		}, 0));
		this.f['tottva'].setValue(this.service.listLignesFacture.reduce((prev, curr) => {
			return prev + curr.tottva;
		}, 0));
		this.f['totttc'].setValue(this.service.listLignesFacture.reduce((prev, curr) => {
			return prev + curr.totttc;
		}, 0));

		this.service.formData.value.totht = parseFloat(this.service.formData.value.totht.toFixed(3));
		this.service.formData.value.tottva = parseFloat(this.service.formData.value.tottva.toFixed(3));
		let ttc = parseFloat(this.service.formData.value.totttc) + parseFloat(this.service.formData.value.timbre);
		this.service.formData.value.totttc = ttc.toFixed(3);
		this.f['totttc'].setValue(this.service.formData.value.totttc);
	}

	validateForm() {
		this.isValid = true;

		if (this.service.listLignesFacture.length == 0 || this.f['numero'].value == 0 || this.f['numero'].value == '')
			this.isValid = false;

		return this.isValid;
	}

	onSubmit() {
		this.f['lignesFactures'].setValue(this.service.listLignesFacture);
		this.service.saveOrUpdate(this.service.formData.value).
			subscribe(data => {
				this.toastr.success('Validation Faite avec Succ\u00e8s');
				this.router.navigateByUrl('/home/(contentOutlet:listefactures)');
			});
	}

	goToListefactures() {
		this.router.navigateByUrl('/home/(contentOutlet:listefactures)');
	}

	transformDate(date) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}

	verifierStock(): boolean {
		let disponible: boolean = true;
		this.service.listLignesFacture.forEach(
			item => {
				if (item.codeBarre == this.article.codeBarre && item.qte == this.article.stock) {
					this.isDisabled = true;
					this.toastr.error('Stock \u00e9puis\u00e9');
					disponible = false;
				}
			}
		);
		return disponible;
	}
}
