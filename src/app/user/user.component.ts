import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../shared/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  selectedUser: User;
  userForm: FormGroup;
  operation : string = 'ajouter';

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      enable: ''
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.initUser();
  }

  initUser(){
    this.selectedUser = new User();
    this.createForm();
  }

  loadUsers(){
    this.userService.getUsers().subscribe(
      data => { this.users = data},
      error => { console.log('Erreur chargement des utilisateurs!') },
      () => { console.log('Chargement des utilisateurs effectué!') }
    );
  }

  addUser(){
    const u = this.userForm.value;
    this.userService.addUser(u).subscribe(
      res => {
        this.loadUsers();
      }
    );
  }

  updateUser(){
    console.log('mise à jour utilisateur: ' + this.selectedUser);
    this.userService.updateUser(this.selectedUser).subscribe(
      res => {
        this.initUser();
        this.loadUsers();
      },
      error => {console.log('erreur mise à jour utilisateur')}
    );
  }

  deleteUser(){
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      res => {
        this.selectedUser = new User();
        this.loadUsers();
      },
      error => {console.log('Erreur de suppression!')}
    );
  }

}
