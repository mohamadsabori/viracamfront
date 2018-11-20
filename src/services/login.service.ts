/**
 * Created by Mohammad on 8/4/2017.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {CallBack} from "./CallBack";

@Injectable()
export class LoginService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private _http: Http) {

  }

  public login(email: string, password: string): Observable<CallBack> {
    var data = {email: email, password: password};
    var requestoptions = new RequestOptions({
      // method: RequestMethod.Get,
      // url: this.baseUrl + '/login',
      headers: this.getHeaders()
      // body: JSON.stringify(data)
    });
    return this._http.post(this.baseUrl + '/login', data, requestoptions)
      .map(res => res.json());
/*
    return this._http.get(this.baseUrl + '/login')
      .map(res => res.json());
*/
  }

  private getHeaders() {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    return headers;
  }

  public register(email: string, password: string) {
    var data = {email: email, password: password};
    var requestoptions = new RequestOptions({
      headers: this.getHeaders()
    });
    return this._http.post(this.baseUrl + '/register', data, requestoptions)
      .map(res => res.json());
  }
}
