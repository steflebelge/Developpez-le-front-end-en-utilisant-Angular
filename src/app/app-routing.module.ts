import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {DetailsComponent} from "./pages/details/details.component";

// Définitions des routes disponibles via leur path et leurs components lié
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details/:idPays',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
