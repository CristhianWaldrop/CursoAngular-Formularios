import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
  { path: 'template', component: TemplatesComponent },
  { path: 'reactivo', component: ReactiveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'template' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
