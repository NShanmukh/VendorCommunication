import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  baseUrl = 'https://vserveq.voltasworld.com/VCOMM/api';
  constructor(private http:HttpClient) { }

  getCommSubmissionData(key){
    return this.http.get(this.baseUrl + '/Communication/GetSubmitedRestructuringByRestructuringKey' + '/' + key).pipe(map((data: any) => {
      return data;
    }));
  }
  
  createVendorCommunication(body: any, key: string) {
    const headers = { 'content-type': 'application/json' };
    const bodydata = JSON.stringify(body)
    return this.http.post(this.baseUrl + '/Communication/CreateNewRestructuring', bodydata, { 'headers': headers }).pipe(map((data: any) => {
      return data;
    }));
  }

}
