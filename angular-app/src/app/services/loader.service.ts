import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  url = '../../../../assets/js/atlantis.min.js';

  loadJsFile() {
    let node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
