import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../../model/article';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { AddArticleComponent } from '../../article/add-article/add-article.component';

@Component({
	selector: 'app-list-article',
	templateUrl: './list-article.component.html',
	styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

	article: Article;
	control: FormControl = new FormControl('');
	totalRecords: number;
	page: number = 1;

	constructor(public articleService: ArticleService, public toastr: ToastrService,
		private router: Router, public fb: FormBuilder,
		private matDialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<AddArticleComponent>, ) { }

	ngOnInit() {
		this.getData();
	}

	addarticle() {
		this.articleService.choixmenu = "A";
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.width = "50%";
		//dialogConfig.data="gdddd";
		this.matDialog.open(AddArticleComponent, dialogConfig);
	}

	getData() {
		this.articleService.getAll().subscribe(
			response => { 
				this.articleService.listData = response; 
				this.totalRecords = this.articleService.listData.length;
			}
		);

	}

	removeData(id: number) {
		if (window.confirm('Etes vous sure de supprimer cet article ?')) {
			this.articleService.deleteData(id)
				.subscribe(
					data => {
						console.log(data);
						this.toastr.warning(' Article supprim\u00e9 avec succ\u00e8s!');
						this.getData();
					},
					error => console.log(error));
		}
	}

	selectData(item: Article) {
		this.articleService.choixmenu = "M";
		this.articleService.formData = this.fb.group(Object.assign({}, item));
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.width = "50%";

		this.matDialog.open(AddArticleComponent, dialogConfig);
	}
	
	newArticle(){
		this.articleService.choixmenu = "A";
		this.router.navigateByUrl('/home/(contentOutlet:articles)');
	}
}
