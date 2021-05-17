import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  baseUrl = 'https://vserveq.voltasworld.com/DPRFEEDBACK/api';
  constructor(private http: HttpClient) { }

  getFeedbackSubmissionData(key) {
    return this.http.get(this.baseUrl + '/Feedback/GetFeedBackDetailsBySalesOrderNo' + '/' + key).pipe(map((data: any) => {
      return data;
    }));
  }

  createIntermediateFeedback(body: any, key: string) {
    const headers = { 'content-type': 'application/json' };
    const bodydata = JSON.stringify(body)
    return this.http.post(this.baseUrl + '/Feedback/CreateOrUpdateIntermediateCompletionFeedBack' + '/' + key, bodydata, { 'headers': headers }).pipe(map((data: any) => {
      return data;
    }));
  }

  createProjectCompletionFeedback(body: any, key: string) {
    return this.http.post(this.baseUrl + '/Feedback/CreateOrUpdateProjectCompletionFeedBack' + '/' + key, body).pipe(map((data: any) => {
      return data;
    }));
  }

  createPostMobFeedback(body: any, key: string) {
    return this.http.post(this.baseUrl + '/Feedback/CreatePostMobilizationFeedBack' + '/' + key, body).pipe(map((data: any) => {
      return data;
    }));
  }
}
