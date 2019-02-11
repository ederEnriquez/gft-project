import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../service/accounts.service';
import { CatalogsService } from '../service/catalogs.service.';
import { AccountModel } from '../model/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  newAccount = false;
  accountModel: AccountModel = new AccountModel();
  cardTypes: Array<any>;
  accounts: Array<any> = [];
  constructor(
    private accountsService: AccountsService,
    private catalogsService: CatalogsService
  ) {}

  ngOnInit() {
    this.getAccounts();
  }

  showNewAccount(show: boolean) {
    this.newAccount = show;
    if (this.newAccount) {
      this.catalogsService.cards().subscribe(
        res => {
          this.cardTypes = res.response.type_cards;
        },
        error => {
          alert('Error catalogs:' + error);
        }
      );
    }
  }

  createAccount() {
    if (this.accountModel.valid()) {
      this.accountsService.create(this.accountModel.format()).subscribe(
        res => {
          if (res.hasOwnProperty('success')) {
            alert(res.success);
            this.newAccount = false;
            this.getAccounts();
          } else {
            alert('Error al generar cuenta:' + res);
          }
        },
        error => {
          alert('Error catalogs:' + error);
        }
      );
    }
  }

  filterName() {
    this.cardTypes.forEach(element => {
      if (element.type === this.accountModel.type) {
        this.accountModel.name = element.name;
      }
    });
  }

  private getAccounts() {
    this.accountsService.accounts().subscribe(
      res => {
        debugger;
        if (res.response.length > 0) {
          this.accounts = res.response;
        }
      },
      error => {
        alert('Error accounts:' + error);
      }
    );
  }
}
