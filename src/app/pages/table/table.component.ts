

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApisService } from "../../services/apis.service";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from '../../user-details/user-details.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { VirtualTopupComponent } from '../../virtual-topup/virtual-topup.component';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    user_list;
    searchText;
    loading = false;
    constructor(private router: Router, public api: ApisService, private modalService: NgbModal) {


    }



    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.retrieve_users()
        // this.tableData1 = {
        //     headerRow: ['ID', 'Name', 'Country', 'City', 'Salary'],
        //     dataRows: [
        //         ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        //         ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        //         ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        //         ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        //         ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        //         ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
        //     ]
        // };
        // this.tableData2 = {
        //     headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
        //     dataRows: [
        //         ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
        //         ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
        //         ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
        //         ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
        //         ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten',],
        //         ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester']
        //     ]
        // };
    }


    retrieve_users() {
        var token = localStorage.getItem("token");

        this.api.all_users(token).then(
            (result) => {

                var results_body = result;

                console.log("results", results_body["data"]);
                this.user_list = results_body["data"]
                console.log("user_list", this.user_list);
                this.loading = true;


            }

        )
            .catch((error) => {

                console.log("Promise rejected with " + JSON.stringify(error));
                this.loading = true;

            });
    }


    details(details) {



        let navigationExtras: NavigationExtras = {
            queryParams: {
                user_details: JSON.stringify(details),
            },
        };
        this.router.navigate(['userdetails'], navigationExtras);




    }

    verify(item) {
        console.log("USER ID--->>", item.id)
        var token = localStorage.getItem("token");
        console.log("TOKEN HERE", token)





        this.api.verifyUser(token, item.id).then(
            (result) => {

                var results_body = result;

                console.log("results", results_body["data"]);
                console.log("Status", results_body["status"]);


                this.loading = true;
                this.router.navigate(['table']);
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



    disable(item) {
        console.log("USER ID--->>", item.id)
        var token = localStorage.getItem("token");
        console.log("TOKEN HERE", token)





        this.api.disableUser(token, item.id).then(
            (result) => {

                var results_body = result;

                console.log("results", results_body["data"]);
                console.log("Status", results_body["status"]);


                this.loading = true;
                this.router.navigate(['table']);
                this.diableAlert()

            }

        )
            .catch((error) => {

                this.erroalert()
                // this.notReady()

                console.log("Promise rejected with " + JSON.stringify(error));
                this.loading = true;

            });
    }



    alertWithSuccess() {
        Swal.fire('Yay!', 'User Verified succesfully!', 'success')
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
            title: 'Suspended',
            text: 'User Suspended'

        })
    }



    topup(details) {

        console.log("USER ID HERE IS ??::", details)
        let data = {
            details: details
        }

        const modalRef = this.modalService.open(VirtualTopupComponent);

        modalRef.componentInstance.fromParent = data;
        modalRef.result.then((result) => {
            console.log(result);
        }, (reason) => {
        });
    }
}
