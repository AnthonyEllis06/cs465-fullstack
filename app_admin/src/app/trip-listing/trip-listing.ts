import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { trips } from '../data/trips';

import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { Authentication } from '../services/authentication';


@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = trips
  message: string = '';

  constructor(private tripDataService: TripData,
              private router: Router,
              private authentication: Authentication,
              private cdr: ChangeDetectorRef) { 
    console.log('trip-listing constructor'); 
  }
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void { 
    this.tripDataService.getTrips() 
    .subscribe({ 

            next: (value: any) => { 
              this.trips = value; 
              if(value.length > 0) 
              { 
                this.message = 'There are ' + value.length + ' trips available.'; 
              } 
              else{ 
                this.message = 'There were no trips retireved from the database'; 
              } 
              console.log(this.message);
              this.cdr.detectChanges(); 
            }, 
            error: (error: any) => { 
              console.log('Error: ' + error); 
            } 
          }) 
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn()
  {
    return this.authentication.isLoggedIn();
  }

}
