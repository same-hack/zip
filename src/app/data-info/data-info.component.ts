import { Component } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-data-info',
  templateUrl: './data-info.component.html',
  styleUrls: ['./data-info.component.scss'],
})
export class DataInfoComponent {
  directories: any = [];

  constructor(public service: FileService) {
    this.service.directories$.subscribe((res) => {
      this.directories = res;
    });
  }

  toBeforePage() {
    this.service.showFileUpload();
  }
  toNextPage() {
    // ここでサービスのファイルを更新
    console.log('this.directories', this.directories);
    this.service.setDirectories(this.directories);
    this.service.showResult();
  }
}
