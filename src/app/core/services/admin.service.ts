import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminData } from '../interfaces/admin-data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  async getAllAdmins() : Promise<AdminData[]>{
    return await firstValueFrom( this.http.get<AdminData[]>(environment.apiUrl + '/api/admin/all') );
  }

  async getAdminById(id: number) : Promise<AdminData> {
    return await firstValueFrom( this.http.get<AdminData>(environment.apiUrl + '/api/admin/' + id) ); 
  }

  async postAdmin(admin: AdminData) : Promise<AdminData> {
    return await firstValueFrom( this.http.post<AdminData>(environment.apiUrl + '/api/admin', admin) ); 
  }

  async deleteAdmin(id: number) : Promise<AdminData> {
    return await firstValueFrom( this.http.delete<AdminData>(environment.apiUrl + '/api/admin/' + id) ); 
  }
}
