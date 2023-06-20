import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: 'cards', title: 'Cards', icon:'nc-badge',    class: '' },
    { path: 'playlist',          title: 'Playlist',              icon:'nc-note-03',      class: '' },
    { path: '/maps', title: 'Our Collection', icon: 'nc-favourite-28', class: '' },
    { path: '/marketplace', title: 'Marketplace', icon: 'nc-cart-simple', class: '' },
    { path: '/adverts', title: 'Upload Adverts', icon: 'nc-cloud-upload-94', class: '' },
    
    { path: 'search',          title: 'Transactions',      icon:'nc-box',  class: '' }, 
    { path: '/revenue_list', title: 'Card Revenues', icon: 'nc-money-coins', class: '' },
    { path: '/table', title: 'App Users', icon: 'nc-single-02', class: '' },
    
    // { path: '/upgrade',       title: 'Audio Player',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
