import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    loadComponent: () => import('./layout/editor/editor.component').then(m => m.EditorComponent) 
  },
  { 
    path: ':id', 
    loadComponent: () => import('./layout/editor/editor.component').then(m => m.EditorComponent) 
  }
];
