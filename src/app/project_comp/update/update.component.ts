import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';

interface Slot {
  _id: string;
  date: string;
  time: string;
  available: boolean;
}
interface doctor {
  _id: string;
  name: string;
}
interface id {
  _id: string;
}
interface slected {
  name: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  constructor(
    private http: HttpClient,
    private router: Router // private dataService: DataService
  ) {}

  doctor: doctor[] = [];
  doctorSlots: Slot[] = [];
  selectedslots: Slot[] = [];
  newSlot: Slot = { _id: '', date: '', time: '', available: true };
  slected: id = { _id: '' };
  doctorname: string = '';
  temp: any;
  ngOnInit(): void {
    this.getdoctor();
  }

  getdoctor() {
    this.http
      .get(
        'https://clinic-reservation-back-git-amrmahmoud33-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/doctor'
      )
      .subscribe((res: any) => {
        this.doctor = res.data;
        console.log(this.doctor);
      });
  }
  getDoctorSlots(did: any) {
    this.http
      .post(
        'https://clinic-reservation-back-git-amrmahmoud33-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/patient/doctor/slots',
        did
      )
      .subscribe((res: any) => {
        this.doctorSlots = res.data;
        console.log(this.doctorSlots);
      });
  }
  sendObject(newone: Slot) {
    // this.dataService.setSharedObject(newone);
    this.router.navigate(['pationt'], {
      state: { data: newone },
    });
  }
}
