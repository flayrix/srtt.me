import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlData = {
    url: '',
  };
  warnMsg = '';
  localUrls = [];

  constructor(public networkService: NetworkService) { }

  ngOnInit() {
    const localData = JSON.parse(localStorage.getItem('local_urls'));
    this.localUrls = localData === null ? [] : localData;
    console.log(this.localUrls);
  }

  onUrlSubmit() {
    if (this.urlData.url.length < 1) {

    }
    this.networkService.newUrl({ destUrl: this.urlData.url }).subscribe(
      res => {
        this.warnMsg = '';
        let localData = JSON.parse(localStorage.getItem('local_urls'));
        if (!localData) {
          localData = [];
        }
        localData.push(res);
        localStorage.setItem('local_urls', JSON.stringify(localData));
        this.localUrls = localData;
      },
      err => {
        console.log(err);
        this.warnMsg = err.error.error;
      }
    );
  }

}
