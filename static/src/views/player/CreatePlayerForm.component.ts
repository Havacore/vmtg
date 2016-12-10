import { Component } from '@angular/core';
import {Player} from "../../models";

@Component({
  selector: 'create-player-form',
  template: `
    <form>
        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName"
                required
                [(ngModel)]="formModel.firstName" name="firstName">
            {{formModel.firstName}}
        </div>
        <button md-button-primary type="submit" (click)="formSubmit()">Submit</button>
        {{submitted}}
    </form>
`
})

export class CreatePlayerFormComponent {

    private formModel: Object = {firstName: ""};
    private player: Player = new Player("", "", 0, "");
    private submitted: boolean = false;

    public formSubmit() {
        this.submitted = true;

    }
}
