import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoAlbumService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getPhotosAlbum(albumId: number): Observable<any[]> {
    const url = `${this.apiUrl}?albumId=${albumId}`;
    return this.http.get<any[]>(url);
  }
}