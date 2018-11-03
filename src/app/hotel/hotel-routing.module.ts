import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelContainerComponent } from './container/hotel.container';

const routes: Routes = [
    {
        path: '',
        component: HotelContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class HotelRoutingModule { }
