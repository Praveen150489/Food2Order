import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { ManualComponent } from './component/manualcomponent/manualcomponent.component';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import { DishComponent } from './component/dish/dish.component';
import { UserComponent } from './component/user/user.component';
import { UserViewComponent } from './component/user/user-view/user-view.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './component/admin/admin.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserAddComponent } from './component/user/user-add/user-add.component';
import { RestaurantViewComponent } from './component/restaurants/restaurant-view/restaurant-view.component';
import { RestaurantAddComponent } from './component/restaurants/restaurant-add/restaurant-add.component';
import { RestaurantUpdateComponent } from './component/restaurants/restaurant-update/restaurant-update.component';
import { AdminGuard } from './guards/adminguard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './component/forms/forms.component';
import { DemoFormComponent } from './component/forms/demo-form/demo-form.component';
import { Demo2FormComponent } from './component/forms/demo2-form/demo2-form.component';
import { RegisterFormComponent } from './component/forms/register-form/register-form.component';
import { CustomValidationComponent } from './component/forms/custom-validation/custom-validation.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { UserViewDetailsComponent } from './component/user-view-details/user-view-details.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { CardComponent } from './component/card/card.component';
import { HomeComponent } from './component/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './component/menu/menu.component';
import { ViewOrderComponent } from './component/view-order/view-order.component';
import { AddOrderComponent } from './component/add-order/add-order.component';
import { OutputComponent, SingleComponent } from './component/output/output.component';
import { UpdateOrderComponent } from './component/update-order/update-order.component';
import { HighlightDirective } from './directives/highlight.directive';
import { OpacityDirective } from './directives/opacity.directive';
import { PipeExampleComponent } from './component/pipe-example/pipe-example.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { PinLatinPipe } from './pin-latin.pipe';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { GreyDishDirective } from './directives/grey-dish.directive';
import { OwnerRestaurantsComponent } from './component/owner-restaurants/owner-restaurants.component';
import { ViewOwnerRestaurantsComponent } from './component/owner-restaurants/view-owner-restaurants/view-owner-restaurants.component';
import { AddOwnerRestaurantsComponent } from './component/owner-restaurants/add-owner-restaurants/add-owner-restaurants.component';
import { UpdateOwnerRestaurantsComponent } from './component/owner-restaurants/update-owner-restaurants/update-owner-restaurants.component';
import { CourseComponent } from './component/course/course.component';



@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    ManualComponent,
    RestaurantsComponent,
    DishComponent,
    UserComponent,
    UserViewComponent,
    ContactsComponent,
    AdminComponent,
    AboutUsComponent,
    UserAddComponent,
    RestaurantViewComponent,
    RestaurantAddComponent,
    RestaurantUpdateComponent,
    FormsComponent,
    DemoFormComponent,
    Demo2FormComponent,
    RegisterFormComponent,
    CustomValidationComponent,
    UserUpdateComponent,
    UserViewDetailsComponent,
    CardComponent,
    HomeComponent,
    MenuComponent,
    ViewOrderComponent,
    AddOrderComponent,
    OutputComponent,
    SingleComponent,
    UpdateOrderComponent,
    HighlightDirective,
    OpacityDirective,
    PipeExampleComponent,
    ExponentialStrengthPipe,
    PinLatinPipe,
    NotFoundComponent,
    GreyDishDirective,
    OwnerRestaurantsComponent,
    ViewOwnerRestaurantsComponent,
    AddOwnerRestaurantsComponent,
    UpdateOwnerRestaurantsComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
