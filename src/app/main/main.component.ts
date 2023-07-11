import { Component } from '@angular/core';
import * as JSZip from 'jszip';
import { FileService } from '../file.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  directories: { dir: string; files: string[]; isFeature: Boolean }[] = [];

  constructor(public service: FileService) {}

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
          const directoryEntry = this.directories.find(
            (d) => d.dir === directory
          );
          if (directoryEntry) {
            directoryEntry.files.push(relativePath);
          } else {
            this.service.addFile({
              dir: directory,
              files: [relativePath],
              isFeature: true,
              code: '',
            });
            array.push({
              dir: directory,
              files: [relativePath],
              isFeature: true,
              code: '',
            });
          }
        }
      });

      // 指定された形式に変換する
      const result = array.map((d: any) => ({
        dir: d.dir,
        files: d.files,
      }));

      // 変換結果を表示する
      console.log(result);
    });
  }
}
