import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AdminUsersComponent } from './admin-users/admin-users.component';
// import { PlaylistComponent } from './playlist/playlist.component';
import { VerificationComponent } from './verification/verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CardDetailsComponent } from './card-details/card-details.component';
// import { LoaderComponent } from './loader/loader.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PayoutComponent } from './payout/payout.component';
import { SearchComponent } from './search/search.component';
import { AdvertsComponent } from './adverts/adverts.component';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';

import { ReasonsComponent } from './reasons/reasons.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CardsComponent } from './cards/cards.component';
import { TransactionsComponent } from './transactions/transactions.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VirtualTopupComponent } from './virtual-topup/virtual-topup.component';
import { RevenueRecordComponent } from './revenue-record/revenue-record.component';
import { RevenueListComponent } from './revenue-list/revenue-list.component';
// import { Papa } from 'papaparse';
// import * as Papa from 'papaparse';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminUsersComponent,
    // PlaylistComponent,
    VerificationComponent,
    CardDetailsComponent,
    MapsComponent,
    PayoutComponent,
    SearchComponent,
    AdvertsComponent,
    FileUploadsComponent,
    ReasonsComponent,
    MarketplaceComponent,
    PlaylistDetailsComponent,
    UserDetailsComponent,
    UserProfileComponent,
    CardsComponent,
    TransactionsComponent,
    VirtualTopupComponent,
    RevenueRecordComponent,
    RevenueListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgOtpInputModule,
    NgbModule,
    SlickCarouselModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true,
      onSameUrlNavigation: 'reload'
    }),
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    Ng2SearchPipeModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
