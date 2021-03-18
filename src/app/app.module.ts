import { RegistrationComponent } from './registration/registration.component';
import { DetailsComponent } from './details/details.component';
import { AngularmaterialModule } from './shared/modules/angularmaterial/angularmaterial.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent} from './shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { EditComponent } from './details/edit/edit.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DetailsComponent,
    RegistrationComponent,
    EditComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularmaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
