import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]
      ],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('/shop');
    }, error => {
      this.errors = error.errors;
      this.toastr.error(this.errors.toLocaleString(), 'Error', {
        progressBar: true,
        timeOut: 3000,
        progressAnimation: 'increasing'
      });
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }

}
