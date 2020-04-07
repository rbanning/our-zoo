import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GUID } from '@app/common/guid';
import { ConfigService, ContactService } from '@app/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  code: string;
  codeRevealed: boolean = false;
  errorMessage: string = null;
  working: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.generateCode();
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      message: [null, [Validators.required, Validators.maxLength(500)]],
      code: [null, [Validators.required, Validators.maxLength(10)]],
    });
  }

  generateCode() {
    this.code = GUID.create().toSimpleString().substr(0, 5);
    this.codeRevealed = false;
  }

  validateCode(input: string): boolean {
    return input === this.code;
  }

  isError(key: string) {
    const ctrl = this.form.get(key);
    return ctrl.invalid && ctrl.dirty;
  }

  ctrlError(key: string) {
    const ctrl = this.form.get(key);
    if (ctrl.invalid && ctrl.dirty) {
      return Object.keys(ctrl.errors).map((k: string) => {
        switch (k) {
          case "required":
            return `${key} is required`;
          case "email":
            return 'invalid email address';
          case "minlength":
            return `${key} is too short (${ctrl.errors.minlength.requiredLength} min.)`;
          case "maxlength":
            return `${key} is too long (${ctrl.errors.maxlength.requiredLength} max.)`;
          default:
            console.log("Error", {key, errors: ctrl.errors});
            return 'invalid value';
        }
      }).join(' - ');
    }
    //else
    return null;
  }


  cancel() {
    this.router.navigate(['/home']);
  }

  submit() {
    this.errorMessage = null;
    this.working = true;

    if (this.form.valid) {
      const {email, name, message, code} = this.form.value;
      if (this.validateCode(code)) {
        this.contactService.send(name, email, message)
          .subscribe(result => {
            this.snackbar.open("Your message was sent: " + result.id, "SUCCESS", { duration: 5000 });
            this.working = false;
            this.cancel();
          });
      } else {
        this.errorMessage = "Invalid - secret code is incorrect";
        this.generateCode();
      }
    } else {
      this.errorMessage = "Invalid - please check your input."
    }

    this.working = !this.errorMessage; //if error, then not working;
  }

}
