import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    private http: HttpClient
  ) { }

  get<T>(data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
    const params = new HttpParams().append('data', JSON.stringify(data))
    return this.http.get<T>(`${apiUrl}${endpointUrl}`, { headers, params })
  }

  post<T>(data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    const params = JSON.stringify(data)
    return this.http.post<T>(`${apiUrl}${endpointUrl}`, params, { headers })
  }

  put<T>(data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    const params = JSON.stringify(data)
    return this.http.put<T>(`${apiUrl}${endpointUrl}`, params, { headers })
  }

  patch<T>(data: object, endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
    const params = JSON.stringify(data)
    return this.http.patch<T>(`${apiUrl}${endpointUrl}`, params, { headers })
  }

  delete<T>(endpointUrl: string = '', apiUrl: string = environment.apiUrl): Observable<T> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<T>(`${apiUrl}${endpointUrl}`);
  }
}
