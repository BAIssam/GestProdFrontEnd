import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

import { ProduitService } from './produit.service';
import { Produit } from '../shared/produit.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits : Produit[];

  produitForm: FormGroup;

  operation : string = 'ajouter';

  selectedProduit: Produit;

  constructor(private produitService : ProduitService, private fb : FormBuilder, private route: ActivatedRoute){
	this.produits = this.route.snapshot.data.produits;
    this.createForm();
   }

   createForm(){
     this.produitForm = this.fb.group({
       ref: ['', Validators.required],
       quantite: '',
       prixUnitaire: ''
     });
   }

  ngOnInit() {
    this.initProduit();
    this.loadProduits();
  }

  initProduit(){
    this.selectedProduit = new Produit();
    this.createForm();
  }

  loadProduits(){
    this.produitService.getProduits().subscribe(
      data => { this.produits = data },
      error => { console.log('erreur de chargement des produits') },
      () => { console.log('Chargement des produits effectue') }
    );
  }

  addProduit(){
    const p = this.produitForm.value;
    this.produitService.addProduit(p).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  updateProduit(){
    this.produitService.updateProduit(this.selectedProduit).subscribe(
      res => {
        this.initProduit();
        this.loadProduits();
      }
    );
  }

  deleteProduit(){
    this.produitService.deleteProduit(this.selectedProduit.id).subscribe(
      res =>{
        this.selectedProduit = new Produit();
        this.loadProduits();
      },
      error =>{
        console.log("Erreur suppression !");
      }
    )
  }

}
