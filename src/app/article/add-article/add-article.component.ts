import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
	selector: 'app-add-article',
	templateUrl: './add-article.component.html',
	styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

	wcode: string = '';
	userFile;
	public imagePath;
	imgURL: any;
	public message: string;
	public isValid: boolean = false;

	constructor(public articleService: ArticleService, public fb: FormBuilder,
		private router: Router, public toastr: ToastrService,
		public dialogRef: MatDialogRef<AddArticleComponent>,

	) { }

	get f() { return this.articleService.formData.controls; }

	ngOnInit() {
		if (this.articleService.choixmenu == "A") { 
			this.initForm() 
		} else {
			this.validateForm();
		};

	}

	initForm() {
		this.articleService.formData = this.fb.group({
			id: null,
			code: ['', [Validators.required, Validators.maxLength]],
			codeBarre: ['', [Validators.required]],
			libelle: ['', [Validators.required]],
			pa: [0, [Validators.required]],
			pv: [0, [Validators.required]],
			remise: 0,
			tva: [0, [Validators.required]],
			stock: [0, [Validators.required]],
			stkinit: [0, [Validators.required]]
		});
	}

	ResetForm() {
		this.articleService.formData.reset();
	}

	onSubmit() {
		if (this.articleService.choixmenu == "A") {
			this.addData();
		}
		else {
			this.updateData()
		}
		this.ResetForm();
		this.isValid = false;
		/*this.f['code'].setValue('');
		this.f['codeBarre'].setValue('');
		this.f['libelle'].setValue('');
		this.f['pa'].setValue(0);
		this.f['pv'].setValue(0);
		this.f['tva'].setValue(0);
		this.f['stkinit'].setValue(0);*/
	}

	addData() {
		if (this.articleService.formData.valid) {
			const formData = new FormData();
			const article = this.articleService.formData.value;
			formData.append('article', JSON.stringify(article));
			//formData.append('file', this.userFile);
			this.articleService.createData(formData).subscribe(data => {
				//this.router.navigateByUrl('/home/(contentOutlet:listearticles)');
				this.toastr.success('Validation Faite avec Succ\u00e8s');
			});
		}
	}

	updateData() {
		this.articleService.updatedata(this.articleService.formData.value.id, this.articleService.formData.value).
			subscribe(data => {
				this.dialogRef.close();
				this.toastr.success('Validation Faite avec Succ\u00e8s');
				this.refreshListe();
				this.router.navigateByUrl('/home/(contentOutlet:listearticles)');
			});

	}

	refreshListe() {
		this.articleService.getAll().subscribe(
			response => { this.articleService.listData = response; }
		);

	}

	onSelectFile(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.userFile = file;
			// this.f['profile'].setValue(file);

			var mimeType = event.target.files[0].type;
			if (mimeType.match(/image\/*/) == null) {
				this.message = "Only images are supported.";
				return;
			}

			var reader = new FileReader();

			this.imagePath = file;
			reader.readAsDataURL(file);
			reader.onload = (_event) => {
				this.imgURL = reader.result;
			}
		}
	}

	goToListeArticles() {
		if (this.articleService.choixmenu == "M")
			this.dialogRef.close();
		this.router.navigateByUrl('/home/(contentOutlet:listearticles)');
	}

	validateForm() {
		this.isValid = true;
		if (this.f['code'].value == '' ||
			this.f['codeBarre'].value == '' ||
			this.f['codeBarre'].value == 0 ||
			this.f['libelle'].value == '' ||
			this.f['pa'].value == '' ||
			this.f['pa'].value == 0 ||
			this.f['pv'].value == '' ||
			this.f['pv'].value == 0 ||
			this.f['tva'].value == 0
			)
			this.isValid = false;

	}
}
