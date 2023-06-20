import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  loading = false;

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  user_details;
  cardDet;
  closeResult;
  @Input() fromParent;

  constructor(private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService,) {

  }




  goBack() {
    //this.router.navigate(['table']);
     this.location.back();
  }

  ngOnInit(): void {
    // Get routed data from Clicked button in Previous route
    // Get route data from Browser History
    // let user_details = JSON.stringify(this.fromParent)
    // console.log("Playlist Details:::::", this.fromParent);
    // console.log("user_details HERE", this.user_details)
    // this.user_details = JSON.parse(user_details)



    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // Get routed data from Clicked button in Previous route
    // Get route data from Browser History
    // console.log(history.state.data);
    this.route.queryParams.subscribe(
      (params) => {
        if (params && params.user_details) {
          this.user_details = JSON.parse(params.user_details);
          console.log("user_details IS  ", this.user_details);
          console.log("=-----card_details IS-----  ", this.user_details.id);
        

        }
      },
      (err) => {
        console.log(err);
      }
    );
    

  
  }






}

