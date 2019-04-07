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
        loadChildren: '../restaurant/restaurant.module#RestaurantModule'
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
        path: 'wedding',
        loadChildren: '../wedding/wedding.module#WeddingModule'
    },
    {
        path: 'offers',
        loadChildren: '../offers/offers.module#OffersModule'
    },
    {
        path: 'booking',
        loadChildren: '../booking/booking.module#BookingModule'
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
