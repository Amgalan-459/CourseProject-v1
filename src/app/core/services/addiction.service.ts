import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddictionService {

  constructor(private http: HttpClient) { }

  async forgotPassword(email: string) :  Promise<number> {
    return await firstValueFrom( this.http.post<number>(environment.apiUrl + '/api/forgetpassword/' + email, null) );
  }
}