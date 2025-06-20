import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HeaderComponent} from "./header/header.component";
import {PieChartComponent} from "./pages/home/pie-chart/pie-chart.component";

@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    NotFoundComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    PieChartComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
