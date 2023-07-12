import { Component } from '@angular/core';
import { FileService } from '../file.service';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(public service: FileService) {
    this.service.directories$.subscribe((res) => {
      console.log('res', res);
    });
  }

  handleFileDrop(event: any) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    // ファイルの処理を行う（アップロードなど）
    for (var i = 0; i < files.length; i++) {
      console.log('アップロードするファイル: ' + files[i].name);
      // ここにファイルのアップロード処理を追加する
    }
  }

  handleDragOver(event: any) {
    event.preventDefault();
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.unzipFile(file);
    }
  }

  unzipFile(file: File): void {
    const directories: any = [];
    const zip = new JSZip();

    // ファイルを読み込む
    zip.loadAsync(file).then((zipContent) => {
      const array: any = [];
      // 解凍されたファイルを処理する
      zipContent.forEach((relativePath, file) => {
        if (!file.dir) {
          const pathSegments = relativePath.split('/');
          const directory = pathSegments[0];
          const filename = pathSegments[1];

          // ディレクトリごとにファイルをグループ化する
          const directoryEntry = directories.find(
            (d: any) => d.dir === directory
          );
          if (directoryEntry) {
            directoryEntry.files.push(relativePath);
          } else {
            directories.push({
              dir: directory,
              files: [relativePath],
              isFeature: true,
              code: '',
            });
          }
        }
      });

      this.service.setDirectories(directories);
    });
  }

  toNextPage() {
    this.service.showDataInfo();
  }
}
