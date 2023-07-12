import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  directories: {
    dir: string;
    files: string[];
    isFeature: Boolean;
    code: '';
  }[] = [];

  directories$ = new BehaviorSubject<any>([]);

  setDirectories(dir: any) {
    this.directories$.next([]);
    this.directories$.next(dir);
  }
}
