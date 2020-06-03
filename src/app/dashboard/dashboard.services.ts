import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {environment} from "../../environments/environment";

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los usuarios activos del sistema
   * @returns {Promise<any>}
   */
  getDashboard(): Observable<any> {
    return this.http.get(environment.apiUrl + "/dashboard/1");
  }
}
