import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Slot {
  date: string;
  time: string;
  _id: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent {
  constructor(private http: HttpClient, private router: Router) {}
  slots: Slot[] = [];
  newSlot: Slot = { date: '', time: '', _id: '' };
  doctorName: string = '';
  ngOnInit(): void {
    this.getSlot();
  }
  getSlot() {
    this.http
      .get(
        'https://clinic-reservation-back-git-amrmahmoud33-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/doctor/slots'
      )
      .subscribe((res: any) => {
        console.log(res.data);
        this.slots = res.data;
      });
  }
  addSlot() {
    this.http
      .post(
        'https://clinic-reservation-back-git-amrmahmoud33-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/doctor/slot',
        this.newSlot
      )
      .subscribe((res) => {
        this.newSlot = { date: '', time: '', _id: '' };
        this.getSlot();
      });
  }

  deleteSlot(slot: Slot) {
    const index = this.slots.indexOf(slot);
    if (index > -1) {
      this.http
        .delete(
          'https://clinic-reservation-back-git-amrmahmoud33-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/doctor/slot/delete/' +
            this.slots[index]._id
        )
        .subscribe();
      this.slots.splice(index, 1);
    }
  }
  logout() {
    localStorage.setItem('token', 'logout');
    this.router.navigate(['login']);
  }
}
