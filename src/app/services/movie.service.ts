import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// export interface SaveRating{

// }
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8080/api'; // replace with your actual API URL

  constructor(private http: HttpClient) { }

  getMovies(page: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
    return this.http.get<any>(this.apiUrl + `/films`, { params });
  }

  saveRating(imdbId: string, rating: string) {
    const params = new HttpParams()
      .set('imdbId', imdbId)
      .set('rating', rating)
    return this.http.get<any>(this.apiUrl + `/user/films/addRating`, { params });

  }
  searchMovie(title: string) {
    return this.http.get<any>(this.apiUrl + `/user/films/findByTitle?title=${title}`);

  }
}
