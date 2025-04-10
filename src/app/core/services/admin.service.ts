import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminData } from '../interfaces/admin-data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  async getAllAdmins() : Promise<AdminData[]>{
    return await firstValueFrom( this.http.get<AdminData[]>('http://192.168.1.72:5000/api/admin/all') );
  }

  async getAdminById(id: number) : Promise<AdminData> {
    return await firstValueFrom( this.http.get<AdminData>('http://192.168.1.72:5000/api/admin/' + id) ); 
  }

  async postAdmin(admin: AdminData) : Promise<AdminData> {
    return await firstValueFrom( this.http.post<AdminData>('http://192.168.1.72:5000/api/admin', admin) ); 
  }

  async deleteAdmin(id: number) : Promise<AdminData> {
    return await firstValueFrom( this.http.delete<AdminData>('http://192.168.1.72:5000/api/admin/' + id) ); 
  }
}
