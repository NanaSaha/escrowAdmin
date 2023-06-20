import { Injectable, ElementRef } from '@angular/core';
import { timeout } from "rxjs/operators";

import { HttpClientModule, HttpInterceptor, HttpHeaders, HttpClient } from "@angular/common/http";
import * as e from 'express';
import { Observable } from 'rxjs/internal/Observable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';




@Injectable({
  providedIn: 'root'
})
export class ApisService {
  main_url = "http://apidev.showout.studio"; 
  login_enpoint = this.main_url + "/admin/login";
  // get_users = this.main_url + "/admin/get-users";
  get_users = this.main_url + "/user/list";
  
  create_user = this.main_url + "/admin/create";
  get_admin = this.main_url + "/admin/list";
  get_card_list = this.main_url + "/card/list";
  get_card_list_locked = this.main_url + "/card/list/?status=locked";
  get_trending_list = this.main_url + "/card/trending";
  get_popular_list = this.main_url + "/card/popular";
  get_recent_list = this.main_url + "/card/recently-played";
  get_playlist = this.main_url + "/playlist/list";
  create_playlist = this.main_url + "/playlist/create";
  market = this.main_url + "/card-listings/market";
  verification_endpoint = this.main_url + "/admin/verify";
  get_card_details = this.main_url + "/card/";
  hotpick_url = this.main_url + "/card/hot-pick";
  ads_url = this.main_url + "/ads/create";
  get_adverts_url = this.main_url + "/ads";
  delete_ad_url = this.main_url + "/ads/";
  delete_tracks_url = this.main_url + "/playlist/";

  approve_card_url = this.main_url + "/card/approve/";
  lock_card_url = this.main_url + "/card/lock/";
  
  topup_url = this.main_url + "/user/transaction/";
  record_revenue_url = this.main_url + "/revenue/";
  revenue_list_url = this.main_url + "/revenue/list/";
 

  verify_user_url = this.main_url + "/user/activate/";
  disable_user_url = this.main_url + "/user/suspend/";

  distribute_url = this.main_url + "/revenue/distribute/";

  metrics_url = this.main_url + "/admin/metrics";

  timeout_value = 20000;

  constructor(public http: HttpClient) { }

  isAuthenticated() {

    // return true;

    var values = localStorage.getItem("token");
    console.log("TOKEN IN DATA PROVIDER CONSTRUCT " + values);
    if (values == null || values == 'null') {
      return false;
    }
    else {
      return true;
    }
 
  }


  public exportTableElmToExcel(element: ElementRef, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element.nativeElement);
    // generate workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);

  }


  

  // login(data) {
  //   console.log("WHats data??",)
  //   return new Promise((resolve) => {
  //     this.http
  //       .post(this.login_enpoint, data)
  //       .pipe(
  //         timeout(this.timeout_value))
  //       .subscribe(
  //         (res) => {
  //           resolve(res);
  //         }
          
  //       );
  //   });


  // }
  data

  login(data) {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.login_enpoint;
      this.http.post(this.login_enpoint, data).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);
       
        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

  
  verify(data) {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.verification_endpoint;
      this.http.post(this.verification_endpoint, data).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

  all_users(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
         'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_users, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });

     
    });
    return promise;
  }



  create_admin_user(data,token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };
   
      this.http.post(this.create_user, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }



  all_admins(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_admin, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  cardList(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_card_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  cardListlocked(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_card_list_locked, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  

  trendingcardList(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_trending_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  popular_card(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_popular_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  recent_card(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_recent_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  


  display_playlist(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_playlist, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }




  createPlaylist(data, token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.create_playlist, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }



  marketList(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.market, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  retrieveHotpick(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.hotpick_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  



  ///Card Detauls
  cardDetails(token,id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_card_details+id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  // public uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post('/api/v1/image-upload', formData);
  // }




  uploadImage(image: File, url,token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      const formData = new FormData();

      formData.append('photo', image);
      formData.append('link', "https://google.com");

      this.http.post(this.ads_url, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }




  all_ads(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_adverts_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  metrics(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.metrics_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  revenue_list(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.revenue_list_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }
  


  


//Delete Ads
  deleteAds(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.delete(this.delete_ad_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }




  //Update Ads
  updateAds(token, id,status) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      const formData = new FormData();

      formData.append('is_active', status);
     

      this.http.put(this.delete_ad_url + id, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  //Delete Ads
  deleteTracks(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.delete(this.delete_tracks_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }
  


  
  updateCard(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("ID TO PASS " + id);

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.put(this.approve_card_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


 lockCard(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("ID TO PASS " + id);

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.put(this.lock_card_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  verifyUser(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };


      this.http.put(this.verify_user_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  
  disableUser(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     Accept: "application/json",
      //     Authorization: "Bearer " + token,
      //     'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
      //   }),
      // };

      const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', 'Bearer' + token)
        .set('x-api-key', 'fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu');

      
      console.log("CONSTANTSSS::::: " + JSON.stringify(headers));

      this.http.put(this.disable_user_url + id, null, { 'headers': headers }).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }





  topupWallet(token, id,data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("ID TO PASS " + id);

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.topup_url + id, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  record_revenue(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
 

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.record_revenue_url, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  distribute(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };


      this.http.post(this.distribute_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  

 
}






