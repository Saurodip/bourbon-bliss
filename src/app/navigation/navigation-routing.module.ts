import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'hotel',
        loadChildren: '../hotel/hotel.module#HotelModule'
    },
    {
        path: 'entertainment',
        loadChildren: '../entertainment/entertainment.module#EntertainmentModule'
    },
    {
        path: 'restaurants',
        loadChildren: '../restaurants/restaurants.module#RestaurantsModule'
    },
    {
        path: 'nightlife',
        loadChildren: '../nightlife/nightlife.module#NightlifeModule'
    },
    {
        path: 'amenities',
        loadChildren: '../amenities/amenities.module#AmenitiesModule'
    },
    {
        path: 'casino',
        loadChildren: '../casino/casino.module#CasinoModule'
    },
    {
        path: 'weddings',
        loadChildren: '../weddings/weddings.module#WeddingsModule'
    },
    {
        path: 'offers',
        loadChildren: '../offers/offers.module#OffersModule'
    },
    {
        path: '',
        redirectTo: '/hotel',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class NavigationRoutingModule { }
