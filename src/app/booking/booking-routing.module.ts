import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingContainerComponent } from './booking.container';

const routes: Routes = [
    {
        path: '',
        component: BookingContainerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class BookingRoutingModule { }
