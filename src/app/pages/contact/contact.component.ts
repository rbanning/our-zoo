import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GUID } from '@app/common/guid';
import { ConfigService } from '@app/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  code: string[];
  errorMessage: string = null;
  working: boolean = false;

  configInfo: string[];

  constructor(
    private fb: FormBuilder,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.configInfo = this.config.keys().map(k => {
      return `${k} : ${this.config.get(k)}`;
    });

    this.generateCode();
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      message: [null, [Validators.required, Validators.maxLength(500)]],
      code: [null, [Validators.required, Validators.maxLength(10)]],
    });
  }

  generateCode() {
    this.code = GUID.create().toSimpleString().substr(0, 5).split('');
  }

  validateCode(input: string): boolean {
    return input === this.code.join('');
  }

  submit() {
    this.errorMessage = null;
    this.working = true;

    if (this.form.valid) {
      const {email, name, message, code} = this.form.value;
      if (this.validateCode(code)) {


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
