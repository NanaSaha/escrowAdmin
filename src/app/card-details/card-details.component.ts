import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ApisService } from "../services/apis.service";
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReasonsComponent } from '../reasons/reasons.component';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
// import * as XLSX from 'xlsx';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
//import { ExcelJson } from './interfaces/excel-json.interface';
// import { Papa } from 'papaparse';
// import * as Papa from 'papaparse';
import { ngxCsv } from 'ngx-csv/ngx-csv';




@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
  
export class CardDetailsComponent implements OnInit {
  loading = false;
  
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  card_details;
  cardDet;
  closeResult;
  fileName = 'ExcelSheet.xlsx';
  dat: any[];

  constructor(private modalService: NgbModal, public route: ActivatedRoute, private router: Router, public location: Location, public api: ApisService, ) { 
    
  
  }




  open() {
    this.modalService.open(ReasonsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  } 


  exportexcel(data: any[], filename: string): void {
    // const csvData = this.csvService.arrayToCsv(data);
    // const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

   
    //   // For other browsers
    //   const link = document.createElement('a');
    //   const url = URL.createObjectURL(blob);

    //   link.setAttribute('href', url);
    //   link.setAttribute('download', filename);
    //   link.style.visibility = 'hidden';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);


  }

  vdata = [
    {
      id: 'VE91PLkx8Skili0oxSj4',
      owner_id: 'KNlFvBHg0lgM1YQTRdcD',
      artist_info: 'E Choke',
      production_info: 'D Black Avenue Muzik signee, Sefa delivers her fir…y, DopeNation, and many other top-notch lyricist.',
      lyrics: 'E choke ooo\r\nSefa\r\nSele\r\nKwasi pɛ dedɛ\r\nGirls girl…s girls so yɛ kyeli\r\nWɔ pɛ dedeɛ\r\nYɛn so yɛ kyeli'
    }
  
  ];


  downloadCSV(data) {
   
    console.log("DATA COMING:::", data)
    console.log("DATAthis::", this.vdata)
    var ddt = JSON.stringify(data)

    this.dat = [];

    this.dat.push({
      ddt
    });

  
    console.log("DATAthis 2::", this.dat)

    const jsonObject = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com"
    };

    // Create an empty array
    const jsonArray = [];

    // Push the JSON object to the array
    jsonArray.push(data);

    // Output the JSON array
    console.log(jsonArray);

    var options = {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: ['id']
    };

    new ngxCsv(jsonArray, "showOut", options);


  

  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ReasonsComponent, {
  //     // data: { name: this.name, animal: this.animal },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }

  goBack() {
    // this.router.navigate(['card-details']);
    this.location.back();
  }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // Get routed data from Clicked button in Previous route
    // Get route data from Browser History
    console.log(history.state.data);
    this.route.queryParams.subscribe(
      (params) => {
        if (params && params.card_details) {
          this.card_details = JSON.parse(params.card_details);
          console.log("card_details IS  ", this.card_details);
          console.log("=-----card_details IS-----  ", this.card_details.id);
          // console.log("stage_name IS  ", this.card_details.stage_name);
          // console.log("stage_name IS  ", this.card_details[0].stage_name);
          // console.log("stage_name IS  ", JSON.stringify(params));
          // console.log("stage_name IS  ", params);

        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  approve(id) {
    console.log("approve--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)
    console.log("status", true)

    let status = {
      "listed": true
    }

    this.api.updateCard(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['cards']);
        this.alertWithSuccess()

      }

    )
      .catch((error) => {
     
        this.erroalert()
        // this.notReady()
   
        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }



  disapprove(id) {
    console.log("approve--->>", id)
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("id", id)
    console.log("status", true)

 

    this.api.lockCard(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        console.log("Status", results_body["status"]);


        this.loading = true;
        this.router.navigate(['cards']);
        this.diableAlert()

      }

    )
      .catch((error) => {

        this.erroalert()
        //this.notReady()

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }




  // getcardDetails(id) {
  //   var token = localStorage.getItem("token");
  //   console.log("TOKEN HERE", token)
  //   console.log("ID HERE", id)

  //   this.api.cardDetails(token,id).then(
  //     (result) => {

  //       var results_body = result;

  //       console.log("results", results_body["data"]);
  //       this.cardDet = results_body["data"]
  //       console.log("cardDet", this.cardDet);

  //       this.loading = true;
  //     }

  //   )
  //     .catch((error) => {

  //       console.log("Promise rejected with " + JSON.stringify(error));
  //       this.loading = true;
  //     });
  // }

  simpleAlert() {
    Swal.fire('Hello Angular');
  }

  alertWithSuccess() {
    Swal.fire('...', 'Card approved succesfully!', 'success')
  }

  erroalert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }

  diableAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Locked',
      text: 'Card Locked'

    })
  }

  notReady() {
    Swal.fire({
      icon: 'error',
      title: 'In Progress...',
      text: 'Feature not ready'
    })
  }


  topend() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  toast() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }
  



}
