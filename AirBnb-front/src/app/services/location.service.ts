import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface Location {
likes: any;
  id?: number;
  name: string;
  description: string;
  photo?: File | string; 
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = `${environment.apiUrl}/locations`; 

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }

  addLocation(location: Location, photo?: File): Observable<Location> {
    const formData = new FormData();
    formData.append('name', location.name);
    formData.append('description', location.description);
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.post<Location>(this.apiUrl, formData);
  }

  updateLocation(id: number, location: Location, photo?: string): Observable<Location> {
    const formData = new FormData();
    formData.append('name', location.name);
    formData.append('description', location.description);
    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.put<Location>(`${this.apiUrl}/${id}`, formData);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  likeLocation(id: number): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/${id}/like`, {});
  }
  
}
