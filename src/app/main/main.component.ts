import { Component } from '@angular/core';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  filesByDirectory: { [directory: string]: string[] } = {};

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
      // 解凍されたファイルを処理する
      zipContent.forEach((relativePath, file) => {
        if (!file.dir) {
          const pathSegments = relativePath.split('/');
          const directory = pathSegments[0];
          const filename = pathSegments[1];

          // ディレクトリごとにファイルをグループ化する
          if (!this.filesByDirectory[directory]) {
            this.filesByDirectory[directory] = [];
          }
          this.filesByDirectory[directory].push(filename);
        }
      });

      // ディレクトリごとにまとめられたファイルの集計結果を表示する
      console.log(this.filesByDirectory);
    });
  }
}
