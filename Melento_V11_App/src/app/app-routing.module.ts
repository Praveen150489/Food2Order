import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { AdminComponent } from './component/admin/admin.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AdminGuard } from './guards/adminguard';
import { UserViewDetailsComponent } from './component/user-view-details/user-view-details.component';
import { HomeComponent } from './component/home/home.component';
import { MenuComponent } from './component/menu/menu.component';
import { OutputComponent } from './component/output/output.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OwnerRestaurantsComponent } from './component/owner-restaurants/owner-restaurants.component';
import { CourseComponent } from './component/course/course.component';


const routes: Routes = [
  {path:'restaurants',component:RestaurantsComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'admin',component:AdminComponent,canActivate:[AdminGuard]},              // ,canActivate:[AdminGuard]
  {path:'aboutus',component:AboutUsComponent},
  {path:'',component:HomeComponent},
  {path:'users/:id',component:UserViewDetailsComponent,canActivate:[AdminGuard]},   // ,canActivate:[AdminGuard]
  {path:'menu/:id', component:MenuComponent},
  {path:'output', component:OutputComponent},
  {path:'ownerRestaurants', component:OwnerRestaurantsComponent},
  {path:'course', component:CourseComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*,{enableTracing: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
