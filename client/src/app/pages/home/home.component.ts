import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public urlData = {
    url: '',
    captcha: ''
  };
  public warnMsg = '';
  public localUrls = [];
  public captchaResponse = '';
  public isSubmiting = false;

  constructor(public networkService: NetworkService) { }

  ngOnInit() {
    const localData = JSON.parse(localStorage.getItem('local_urls'));
    this.localUrls = localData === null ? [] : localData;
    console.log(this.localUrls);
  }

  public onUrlSubmit(captchaResponse) {
    console.log(captchaResponse);
    this.warnMsg = '';
    if (this.urlData.url.length < 1) {
      this.warnMsg = 'Please provide a URL';
      return;
    }
    this.networkService.newUrl({ destUrl: this.urlData.url, captcha: this.urlData.captcha }).subscribe(
      res => {
        this.warnMsg = '';
        let localData = JSON.parse(localStorage.getItem('local_urls'));
        if (!localData) {
          localData = [];
        }
        localData.push(res);
        localStorage.setItem('local_urls', JSON.stringify(localData));
        this.localUrls = localData;
        this.urlData.url = '';
        this.isSubmiting = false;
      },
      err => {
        this.warnMsg = err.error.error;
        this.isSubmiting = false;
      }
    );
  }
}
