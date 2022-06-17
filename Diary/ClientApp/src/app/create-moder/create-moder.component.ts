import { Component, OnInit } from '@angular/core'
import { VerificationService } from 'src/app/service/verification.service';
import { NgForm } from '@angular/forms'
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-create-moder',
  templateUrl: './create-moder.component.html',
  styleUrls: ['./create-moder.component.scss']
})

export class CreateModerComponent implements OnInit{

  credentials: RegisterModel = {
    email: '',
    password: '',
    nikeName: ''
  }

  isSend : boolean = true

  constructor(
    private verificationService: VerificationService
  ) { }
  
  ngOnInit(): void {
  }
  
  createModer(form: NgForm) {
    if (form.valid) {
      console.log(this.credentials)
      this.verificationService.createModer(this.credentials).subscribe({
        next: () => {
          this.isSend = false
          setTimeout(() => {
            this.isSend = true
          }, 2000)
        },
      })
    }
  }
}
