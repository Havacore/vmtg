import { Component } from '@angular/core';
import {Player} from '../../models';
import {PlayerService} from './Player.service';

interface FormModel {
    firstName?: string,
    lastName?: string,
    email?: string
}

@Component({
  selector: 'create-player-form',
  template: `
    <form (ngSubmit)="formSubmit()" #playerCreateForm="ngForm">
        <div class="form-group">
            <div>
                <md-input type="text" class="form-control" id="firstName"
                    placeholder="First Name"
                    required
                    [(ngModel)]="formModel.firstName" name="firstName">    
                </md-input>
            </div>
            <div>
                <md-input type="text" class="form-control" id="lastName"
                    placeholder="Last Name"
                    required
                    [(ngModel)]="formModel.lastName" name="lastName">    
                </md-input>
            </div>
            <div>
                <md-input type="text" class="form-control" id="email"
                    placeholder="email"
                    required
                    [(ngModel)]="formModel.email" name="email">    
                </md-input>
            </div>
        </div>
        <div>
            <button md-raised-button color="primary" type="submit" (click)="newPlayer()" [disabled]="!playerCreateForm.form.valid">Submit</button>
            <md-spinner *ngIf="submitting" class="form-submit-spinner"></md-spinner>
        </div>
    </form>
`,
    styles: [`
.form-submit-spinner {
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
}
`],
    providers: []
})

export class CreatePlayerFormComponent {

    private formModel: FormModel = {};
    private player: Player = new Player("", "", 0, "");
    private submitting: boolean = false;
    private errorMessage: any;

    constructor(private playerService: PlayerService) {
    }

    private newPlayer() {
        this.player =  new Player(this.formModel.firstName, this.formModel.lastName, 0, this.formModel.email);
    }

    private refreshForm() {
        this.formModel = {};
    }

    public formSubmit() {
        this.submitting = true;
        this.playerService.createPlayer(this.player)
            .subscribe(
                player => {
                    this.submitting = false;
                    this.refreshForm();
                    console.log(player);
                },
                error => {
                    this.errorMessage = <any>error;
                    this.submitting = false;
                }
            );
    }
}
