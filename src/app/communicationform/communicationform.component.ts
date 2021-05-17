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
  successMessage = 'Your Form Submitted Successfully!'
  headMes = 'CONGRATULATIONS!'
  communicationForm: FormGroup;
  key: string;
  type: string;

  constructor(private fb: FormBuilder, private commService: CommunicationService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.key = params['params'].key;
      this.type = params['params'].type;
      // this.stepper.selectedIndex = 3
    });
  }

  ngOnInit(): void {
    this.communicationForm = this.fb.group({
      rid: [''],
      email: ['', [Validators.required, Validators.email]],
      vendorCode: [''],
      vendorName: ['', Validators.required],
      confirmation: [true, Validators.required],
      remarks: [''],
      sendCopy: [false]
    });
    // this.getSubmissionFormStatus(this.key);
  }

  onIntermediateFormSubmit() {
    console.log(this.communicationForm.value);
    debugger;
    if (this.communicationForm.invalid) {
      this.headMes = 'Please fill all mandatory fields and try again';
      this.successMessage = '';
      this.success = true;
      return;
    }
    this.commService.createVendorCommunication(this.communicationForm.value, this.key).subscribe((data: any) => {
      if (data.success) {
        if (data.result) {
          if (data.result.id === 0) {
            this.headMes = 'Data not found for selected customer';
            return;
          }
          this.success = true;
          this.successMessage = 'Your Form Submitted Successfully!';
          this.headMes = '';
          this.communicationForm.reset();
        }
      }
    }), err => {
      console.log(err)
    };
  }

  closeAlert() {
    this.success = false;
  }
}