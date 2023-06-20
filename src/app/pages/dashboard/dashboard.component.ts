import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ApisService } from "../../services/apis.service";
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  loading = false;
  hotpick;
  cardDet;
  user_list;


  constructor(public api: ApisService, private route: ActivatedRoute,
    private router: Router) {
    this.retrieve_hot_pick();
  }


  ngOnInit() {
    this.retrieve_hot_pick();
    this.retrieve_users()
      var full_name = localStorage.getItem("full_name");
      var email = localStorage.getItem("email");
      console.log("full_name CONSTRUCT " + full_name);
      console.log("email CONSTRUCT " + email);
    }
  
  
  
    retrieve_hot_pick() {
      var token = localStorage.getItem("token");
      console.log("TOKEN HERE", token)

      this.api.retrieveHotpick(token).then(
        (result) => {

          var results_body = result;

          console.log("results", results_body["data"]);
          this.hotpick = results_body["data"]
          // this.hotpick = this.hotpick[0]
          console.log("popuar list", this.hotpick.cover_art_url);

          this.loading = true;
        }

      )
        .catch((error) => {

          console.log("Promise rejected with " + JSON.stringify(error));
          this.loading = true;
        });
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


  retrieve_users() {
    var token = localStorage.getItem("token");

    this.api.metrics(token).then(
      (result) => {

        var results_body = result;

        console.log("results", results_body["data"]);
        this.user_list = results_body["data"]
        console.log("user_list", this.user_list);
        console.log("user_list", this.user_list[0]);
        this.loading = true;


      }

    )
      .catch((error) => {

        console.log("Promise rejected with " + JSON.stringify(error));
        this.loading = true;

      });
  }

  
    
  }

