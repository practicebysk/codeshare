import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class storageService {
  constructor() { }

  setItem(key: string, value: any): void {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      sessionStorage.setItem(key, data);
    } catch (error) {
      console.error('SessionStorageService setItem error:', error);
    }
  }
}
