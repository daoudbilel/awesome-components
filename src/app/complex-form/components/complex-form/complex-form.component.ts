import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  mainForm!: FormGroup;

  personalInfoForm!: FormGroup;

  contactPreferenceCtrl!: FormControl;

  phoneCtrl!: FormControl;

  emailForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;

  loginInfoForm!: FormGroup;
  confirmPasswordCtrl!: FormControl;
  passwordCtrl!: FormControl;


  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservable();


  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    });
  }

  initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.formBuilder.control('phone');

    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
    });

    this.phoneCtrl = this.formBuilder.control('');

    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    });

  }

  onSubmitForm() {
    console.log(this.mainForm.value);

  }


  private initFormObservable() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => {
        if (showEmailCtrl) {
          this.emailCtrl.addValidators([]);
          this.confirmEmailCtrl.addValidators([
            Validators.required,
            Validators.email
          ]);
        } else {
          this.emailCtrl.clearValidators();
          this.confirmEmailCtrl.clearValidators();
        }
        this.emailCtrl.updateValueAndValidity();
        this.confirmEmailCtrl.updateValueAndValidity();
      })
    );
    this.showPhoneCtrl$ = this.phoneCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl$ => {
        if (showPhoneCtrl$) {
          //ajouter Validators
          this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
        } else {
          //retirer Validators
          this.phoneCtrl.clearValidators()

        }
        this.phoneCtrl.updateValueAndValidity();

      })
    )

  }
}
