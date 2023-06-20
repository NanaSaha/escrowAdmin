import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AuthguardGuard } from "../../services/authguard.guard";
import { AdminUsersComponent } from '../../admin-users/admin-users.component';
import { PlaylistComponent } from '../../playlist/playlist.component';
import { CardDetailsComponent } from '../../card-details/card-details.component';
import { VerificationComponent } from '../../verification/verification.component';
import { LoaderComponent } from '../../loader/loader.component';

import { PayoutComponent } from '../../payout/payout.component';
import { SearchComponent } from '../../search/search.component';
import { AdvertsComponent } from '../../adverts/adverts.component';
import { FileUploadsComponent } from '../../file-uploads/file-uploads.component';
import { MarketplaceComponent } from '../../marketplace/marketplace.component';

import { PlaylistDetailsComponent } from '../../playlist-details/playlist-details.component';
import { UserDetailsComponent } from '../../user-details/user-details.component';

import { CardsComponent } from '../../cards/cards.component';
import { TransactionsComponent } from '../../transactions/transactions.component';
import { VirtualTopupComponent } from '../../virtual-topup/virtual-topup.component';
import { RevenueRecordComponent } from '../../revenue-record/revenue-record.component';
import { RevenueListComponent } from '../../revenue-list/revenue-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthguardGuard] },
    
    { path: 'table', component: TableComponent, canActivate: [AuthguardGuard] },
    { path: 'typography', component: TypographyComponent, canActivate: [AuthguardGuard] },
    { path: 'icons', component: IconsComponent, canActivate: [AuthguardGuard] },
    { path: 'maps', component: MapsComponent, canActivate: [AuthguardGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthguardGuard] },
    { path: 'admin-users', component: AdminUsersComponent, canActivate: [AuthguardGuard] },
    // { path: 'verification', component: VerificationComponent, canActivate: [AuthguardGuard] },
    { path: 'playlist', component: PlaylistComponent, canActivate: [AuthguardGuard] },
    { path: 'card-details', component: CardDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'pay', component: PayoutComponent, canActivate: [AuthguardGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthguardGuard] },
    { path: 'adverts', component: AdvertsComponent, canActivate: [AuthguardGuard] },
    { path: 'fileuploads', component: FileUploadsComponent, canActivate: [AuthguardGuard] },
    { path: 'marketplace', component: MarketplaceComponent, canActivate: [AuthguardGuard] },
    { path: 'playlistdetails', component: PlaylistDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'userdetails', component: UserDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'cards', component: CardsComponent, canActivate: [AuthguardGuard] },
    { path: 'transactions', component: TransactionsComponent, canActivate: [AuthguardGuard] },
    { path: 'topup', component: VirtualTopupComponent, canActivate: [AuthguardGuard] },
    { path: 'revenue', component: RevenueRecordComponent, canActivate: [AuthguardGuard] },
    { path: 'revenue_list', component: RevenueListComponent, canActivate: [AuthguardGuard] },
    
    
    
    

    
    
    // { path: 'loader', component: LoaderComponent, canActivate: [AuthguardGuard] },
];
