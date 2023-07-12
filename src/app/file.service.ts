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
  DIALOG_KEY = {
    fileUpload: 'fileUpload',
    dataInfo: 'dataInfo',
    result: 'result',
  };

  directories$ = new BehaviorSubject<any>([]);

  dialog$ = new BehaviorSubject<string>(this.DIALOG_KEY.fileUpload);

  showFileUpload() {
    this.dialog$.next(this.DIALOG_KEY.fileUpload);
  }

  showDataInfo() {
    this.dialog$.next(this.DIALOG_KEY.dataInfo);
  }

  showResult() {
    this.dialog$.next(this.DIALOG_KEY.result);
  }

  setDirectories(dir: any) {
    // 一旦クリアする
    this.directories$.next([]);
    this.directories$.next(dir);
  }
}
