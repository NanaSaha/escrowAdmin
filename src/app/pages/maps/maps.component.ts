import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


import { ApisService } from "../../services/apis.service";
import { CardDetailsComponent } from '../../card-details/card-details.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {
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
   
    allPlay = true;
    audiofile;
    // closeResult;

    // isMasterSel: boolean;
    isMasterSel = []

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

    play_id;
    playlist
   
    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, public api: ApisService,private modalService: NgbModal ) {

    }
    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.retrieve_playlist();
        // this.retrieve_mrkt()
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],

        });
    }

    play(id) {
        // this.play_id = id
        // console.log("play id is:::", this.play_id)
        this.audiofile = id
        console.log("Aaudiofile:::", this.audiofile)
    }

    @Input() public playlist_id = {
        id: 26
    }

    // open(details) {


    //     let data = {
    //         details: details
    //     }

    //     const modalRef = this.modalService.open(PlaylistDetailsComponent);

    //     modalRef.componentInstance.fromParent = data;
    //     modalRef.result.then((result) => {
    //         console.log(result);
    //     }, (reason) => {
    //     });
    // }


    isAllSelected() {
        console.log("Selected >>>>>>????", this.isMasterSel)


    }


    deleteTrack(id) {
        console.log("--delting ads")
        var token = localStorage.getItem("token");
        console.log("TOKEN HERE", token)
        console.log("id", id)

        this.api.deleteTracks(token, id).then(
            (result) => {

                var results_body = result;

                console.log("results", results_body["data"]);
                console.log("Status", results_body["status"]);


                this.loading = true;
                this.router.navigate(['playlist']);

            }

        )
            .catch((error) => {

                console.log("Promise rejected with " + JSON.stringify(error));
                this.loading = true;

            });

    }

    retrieve_playlist() {
        var token = localStorage.getItem("token");
        console.log("TOKEN HERE", token)

        let arr = [];

        this.api.display_playlist(token).then(
            (result) => {

                var results_body = result;

                console.log("results", results_body["data"]);
                this.user_list = results_body["data"]

                arr = this.user_list[0]
                this.playlist = arr
                console.log("user_list", this.user_list);
                this.loading = true;

            }

        )
            .catch((error) => {

                console.log("Promise rejected with " + JSON.stringify(error));
                this.loading = true;

            });


    }



    onSubmit() {

        var token = localStorage.getItem("token");
        this.submitted = true;
        this.loading = false;
        this.loginVal = JSON.stringify(this.form.value);
       
        console.log("LETS SEE THE LOGIN VAL " + this.loginVal);

        this.jsonBody = JSON.parse(this.loginVal);

        console.log("LETS SEE THE jsonBody VAL " + this.jsonBody);

        // this.router.navigate(['admin-users']);

        this.api.createPlaylist(this.jsonBody, token).then(
            (result) => {

                var results_body = result;

                console.log("results", result);
                this.router.navigate(['playlist']);
                this.loading = true;


            }
        )
            .catch((error) => {
                this.loading = true;
                alert(JSON.stringify(error))
                console.log("Promise rejected with " + JSON.stringify(error));

            });
    }



    showPlay() {
        console.log("cccllick:::")
        this.allPlay = !this.allPlay
        console.log("All Play is:::", this.allPlay)
    }

    playAud(f) {
        this.audiofile = f
        console.log("Aaudiofile:::", this.audiofile)
    }
}




// @Component({

//     selector: 'app-playlist',
//     templateUrl: './playlist.component.html',
//     styleUrls: ['./playlist.component.css']
// })

// export class PlaylistComponent implements OnInit {
//     form: FormGroup;
//     loading = false;
//     submitted = false;
//     loginVal;
//     jsonBody
//     user_list;
//     allPlay = true;
//     audiofile;
//     closeResult;

//     // isMasterSel: boolean;
//     isMasterSel = []

//     //@Input() public playlist_id: any;

//     constructor(private formBuilder: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router, public api: ApisService, private modalService: NgbModal) {
//         // this.retrieve_cards()
//     }
    

