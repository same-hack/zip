import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  directories$ = new BehaviorSubject<any>([]);

  updateFile(dir: any) {
    this.directories$.next(dir);
  }
}
