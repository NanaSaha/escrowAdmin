
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../services/apis.service";
import { CardDetailsComponent } from '../card-details/card-details.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RevenueRecordComponent } from '../revenue-record/revenue-record.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  loginVal;
  jsonBody
  user_list;
  trending_list;
  popular_list;
  recent_list;
  title = 'appBootstrap';
  cardDet;
  searchText;
  public items: any;
  public items2: any;
  dat: any[];
  

  closeResult: string = '';
  // slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };

  slideConfig = {
    "slidesToShow": 4.3,
    "slidesToScroll": 1,
    // "dots": true,
    "infinite": false,
    // appendArrows: '.slider-nav',
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApisService, private modalService: NgbModal) {

  }
  ngOnInit() {
    this.retrieve_cards();
    this.retrieve_cards_locked();
    // this.retrieve_trending_cards()
    // this.retrieve_popular_list()
    // this.retrieve_recent_list()
  }

  gotoCardDetails(id) {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    console.log("ID HERE", id)

    this.api.cardDetails(token, id).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.cardDet = results_body["data"]
        console.log("cardDet", this.cardDet);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            card_details: JSON.stringify(this.cardDet),
          },
        };
        this.router.navigate(['card-details'], navigationExtras);


        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });


  }



  // getcardDetails(id) {
  //     var token = localStorage.getItem("token");
  //     console.log("TOKEN HERE", token)
  //     console.log("ID HERE", id)

  //     this.api.cardDetails(token, id).then(
  //         (result) => {

  //             var results_body = result;

  //             console.log("results", results_body["data"]);
  //             this.cardDet = results_body["data"]
  //             console.log("cardDet", this.cardDet);

  //             this.loading = true;
  //         }

  //     )
  //         .catch((error) => {

  //             console.log("Promise rejected with " + JSON.stringify(error));
  //             this.loading = true;
  //         });
  // }


  // open(content: any) {
  //     this.modalService.open(CardDetailsComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     });


  // } 

  // private getDismissReason(reason: any): string {
  //     if (reason === ModalDismissReasons.ESC) {
  //         return 'by pressing ESC';
  //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //         return 'by clicking on a backdrop';
  //     } else {
  //         return `with: ${reason}`;
  //     }
  // }

  retrieve_cards() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.cardList(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);

      
        this.items2 = [];
        for (var value of this.user_list) {
        
          // console.log("Calue ITME::", value.listed);
         
        
            console.log("Only true vlaue::", value.status);
            this.items2.push({
              value
            });
          
        }
        console.log("PUBLISHED ITEM HERE", this.items2);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }


  retrieve_cards_locked() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.cardListlocked(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);

        this.items = [];
      
        for (var value of this.user_list) {
            console.log("Only true vlaue::", value.status);
            this.items.push({
              value
            });
          
        }
        console.log("LOCKED ITEM HERE", this.items);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }

  retrieve_trending_cards() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.trendingcardList(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.trending_list = results_body["data"]
        console.log("trendin list", this.trending_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }

  retrieve_popular_list() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.popular_card(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.popular_list = results_body["data"]
        console.log("popuar list", this.popular_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }


  retrieve_recent_list() {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)

    this.api.recent_card(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.recent_list = results_body["data"]
        console.log("recent_list", this.recent_list);

        this.loading = true;
      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;
      });
  }




  topup(details) {

    console.log("USER ID HERE IS ??::", details)
    let data = {
      details: details
    }

    const modalRef = this.modalService.open(RevenueRecordComponent);

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }




  downloadCSV(data) {

    console.log("DATA COMING:::", data)
   
    var ddt = JSON.stringify(data)

    this.dat = [];

    for (var value of data) {

      console.log("Only true vlaue::", value.value.id);
      this.dat.push({
        id: value.value.id,
        balance: value.value.balance,
        artist_info: value.value.artist_info,
        cover_art_url: value.value.cover_art_url,
        genre: value.value.genre,
        created_at: value.value.created_at
      });

    }


  console.log("DATAthis 2::", this.dat)

    // const jsonObject = {
    //   name: "John Doe",
    //   age: 30,
    //   email: "johndoe@example.com"
    // };

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
      headers: ['id','artist info','balance','cover_art_url','genre','created_at']
    };

    new ngxCsv(this.dat, "showOut", options);
  }



}

