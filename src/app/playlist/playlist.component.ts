import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisService } from "../services/apis.service";
import { PlaylistDetailsComponent } from '../playlist-details/playlist-details.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({

    selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  loginVal;
  jsonBody
  user_list;
  allPlay = true;
  audiofile;
  closeResult;
  playlist;
  favv;

 condition: boolean;
  isMasterSel = []
 
 
  //@Input() public playlist_id: any;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public api: ApisService, private modalService: NgbModal) {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],

    });

  }

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    this.retrieve_playlist();

  }

  // @Input() public playlist_id = {
  //   id: 26
  // }

  open(details) {
  

  let data = {
    details: details
    }

    const modalRef = this.modalService.open(PlaylistDetailsComponent);

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }


  isAllSelected(ev) {
    console.log("Selected >>>>>>????", this.isMasterSel[ev])
    console.log("Selected Lenght>>>>>>????", this.isMasterSel)
  
  }

  competition() {
    this.alertWithSuccess()
  }

  alertWithSuccess() {
    Swal.fire('...', 'Card approved succesfully!', 'success')
  }
  

  favor(id) {
    this.favv = id
    console.log("favv >>>>>>????", this.favv)

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
        console.log("user_list", this.playlist);
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

