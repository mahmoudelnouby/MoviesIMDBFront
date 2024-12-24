import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Film {
  imdbID: string;
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: { id: number; Source: string; Value: string }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  totalSeasons?: string | null;
  Response?: string;
}

@Component({
  selector: 'app-films-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-viewer.component.html',
  styleUrls: ['./film-viewer.component.css']
})
export class FilmsViewerComponent implements OnInit {
  films: Film[] = [];
  selectedImdbIds: string[] = [];  // Array to store selected IMDb IDs
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 5;
  isLoading: boolean = false;
  apiUrl: string = 'http://localhost:8080/api/films';  // API URL to fetch films

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFilms();
  }

  // Fetch films from the API
  fetchFilms(): void {
    this.isLoading = true;
    const params = new HttpParams()
      .set('page', (this.currentPage - 1).toString())
      .set('size', this.pageSize.toString());

    this.http.get<any>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        this.films = response.body?.content || [];
        this.totalPages = response.body?.totalPages || 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching films:', error);
        alert(error.error.errorMessage||error.error.customerMessage);
        this.isLoading = false;
      }
    });
  }

  // Toggle the selection of a film
  toggleSelection(film: Film): void {
    const index = this.selectedImdbIds.indexOf(film.imdbID);
    if (index === -1) {
      this.selectedImdbIds.push(film.imdbID);  // Add IMDb ID to the selected array
    } else {
      this.selectedImdbIds.splice(index, 1);  // Remove IMDb ID from the selected array
    }
  }

  // Delete the selected films by sending their IMDb IDs to the API
  deleteSelectedFilms(): void {
    if (this.selectedImdbIds.length > 0) {
      const url = 'http://localhost:8080/api/admin/films/deleteByTitle';  // Replace with actual delete API URL
      const imdbIdsToDelete = this.selectedImdbIds;  // IMDb IDs to delete

      this.http.post(url, imdbIdsToDelete).subscribe({
        next: (response:any) => {
          console.log('Successfully deleted selected films:', response);
          // Optionally, refresh the film list or remove deleted films from the list
          this.films = this.films.filter(film => !this.selectedImdbIds.includes(film.imdbID));
          this.selectedImdbIds = [];  // Clear the selected IMDb IDs
          alert(response.customerMessage)
        },
        error: (error) => {
          console.error('Error deleting selected films:', error);
          alert(error.error.errorMessage||error.error.customerMessage)
        }
      });
    } else {
      alert('Please select at least one film to delete.');
    }
  }

  // Pagination functions
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchFilms();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchFilms();
    }
  }
}
