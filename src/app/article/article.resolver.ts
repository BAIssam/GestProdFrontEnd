import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ArticleService } from '../service/article.service';

@Injectable()
export class ArticleResolver implements Resolve<any>{

	constructor(private articleService: ArticleService) {

	}

	resolve() {
		return this.articleService.getAll();
	}
}
