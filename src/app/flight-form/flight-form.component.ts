import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="flight-form-container">
      <h2>Flight Information Form</h2>
      <h4>Please fill out the all the information or form will be invalidated</h4>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="airline">Airline:</label>
          <input type="text" id="airline" [(ngModel)]="flightInfo.airline" name="airline" required>
        </div>
        <div class="form-group">
          <label for="arrivalDate">Arrival Date:</label>
          <input type="date" id="arrivalDate" [(ngModel)]="flightInfo.arrivalDate" name="arrivalDate" required>
        </div>
        <div class="form-group">
          <label for="arrivalTime">Arrival Time:</label>
          <input type="time" id="arrivalTime" [(ngModel)]="flightInfo.arrivalTime" name="arrivalTime" required>
        </div>
        <div class="form-group">
          <label for="flightNumber">Flight Number:</label>
          <input type="text" id="flightNumber" [(ngModel)]="flightInfo.flightNumber" name="flightNumber" required>
        </div>
        <div class="form-group">
          <label for="numOfGuests">Number of Guests:</label>
          <input type="number" id="numOfGuests" [(ngModel)]="flightInfo.numOfGuests" name="numOfGuests" required>
        </div>
        <div class="form-group">
          <label for="comments">Comments:</label>
          <textarea id="comments" [(ngModel)]="flightInfo.comments" name="comments"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p class="message" [ngClass]="{'success': !isError, 'error': isError}" *ngIf="message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent {
  flightInfo = {
    airline: '',
    arrivalDate: '',
    arrivalTime: '',
    flightNumber: '',
    numOfGuests: 0,
    comments: ''
  };
  message = '';
  isError = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const url = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';
    const headers = new HttpHeaders({
      'token': 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
      'candidate': 'Akash Rattan'
    });

    this.http.post(url, this.flightInfo, { headers }).subscribe(
      response => {
        this.message = 'Flight information submitted successfully!';
        this.isError = false;
      },
      error => {
        this.message = 'Error submitting flight information. Please try again.';
        this.isError = true;
      }
    );
  }
}