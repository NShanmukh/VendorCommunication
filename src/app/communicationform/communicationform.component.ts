import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../main/services/communication.service';

@Component({
  selector: 'app-communicationform',
  templateUrl: './communicationform.component.html',
  styleUrls: ['./communicationform.component.css']
})
export class CommunicationformComponent implements OnInit {
  success = false;
  isLoading=false;
  successMessage = '';
  headMes = '';
  communicationForm: FormGroup;
  key: string;
  type: string;

  constructor(private fb: FormBuilder, private commService: CommunicationService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.key = params['params'].key;
    });
  }

  ngOnInit(): void {
    this.communicationForm = this.fb.group({
      rid: [''],
      restructuringKey: [this.key],
      email: ['', [Validators.required, Validators.email]],
      vendorCode: [''],
      vendorName: ['', Validators.required],
      confirmation: [true, Validators.required],
      remarks: [''],
      sendCopy: [false]
    });
    this.getSubmissionFormStatus(this.key);
  }

  onIntermediateFormSubmit() {

    this.isLoading=true;
    if (this.communicationForm.invalid) {
      this.communicationForm.markAllAsTouched(); 
      this.isLoading=false;     
      return;
    }
    if(this.communicationForm.value.vendorCode){
      this.communicationForm.value.vendorCode = this.communicationForm.value.vendorCode.toString();
    }
    this.commService.createVendorCommunication(this.communicationForm.value, this.key).subscribe((data: any) => {
      if (data) {
        this.isLoading=false;     
        if (data.id === 0) {
          this.headMes = 'Oops!'
          this.isLoading=false;     
          this.successMessage = data.message;
          this.success = true;
          this.communicationForm.reset();
          this.communicationForm.patchValue({
            restructuringKey: this.key,
            confirmation: true,
            sendCopy: false
          })
          return;
        }
        // this.headMes = 'CONGRATULATIONS!'
        this.isLoading=false;
        this.successMessage = 'Your form has been submitted successfully';
        this.success = true;
        this.communicationForm.reset();
        this.communicationForm.patchValue({
          restructuringKey: this.key,
          confirmation: true,
          sendCopy: false
        })
      }
    }, err => {
      this.isLoading=false;     
      this.headMes = 'Error occured. Please try again';
    })
  }

  getSubmissionFormStatus(key) {
    debugger;
    this.isLoading=true;     
    this.commService.getCommSubmissionData(key).subscribe((data) => {
      if (data) {
        this.isLoading=false;     
        this.headMes = 'Oops!'
        this.successMessage = 'You\'ve already Submitted!';
        this.success = true;
        this.communicationForm.reset();
        this.communicationForm.patchValue({
          restructuringKey: this.key,
          confirmation: true,
          sendCopy: false
        })
      }
    }, err => {
      this.isLoading=false;     
      this.headMes = 'Error occured. Please try again';
    })
  }

  closeAlert() {
    this.success = false;
  }
}
