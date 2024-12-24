import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Film {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  selected?: boolean;
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  selectedFilms: Film[] = []; // To track selected films
  searchTitle: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  disabledNextBtn: boolean = true;
  disableSaveFilmBtn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.fetchFilms();
    
  }
  
  
  // Fetch films from the API
  fetchFilms(): void {
    const url = `http://localhost:8080/api/admin/films/getAll`; // Replace with your API endpoint
    const params = {
      title: this.searchTitle || '',
      page: this.currentPage.toString()
    };
    // const token=localStorage.getItem('authToken');
    // let headers=new HttpHeaders();
    // if(token)
    // {
    //   headers=headers.set('Authorization',`${token}`);
      
    // }
    // else
    // {
    //   console.log("no token found!");
    // }
    this.http.get<any>(url, { params }).subscribe({
      next: (response) => {
        if (response.body == null) {
          this.disabledNextBtn = true;
          this.films = [];
        } else {
          this.disabledNextBtn = false;
          this.films = [...response.body]; // Assuming the body contains the array of films
        }
      },
      error: (error) => {
        console.error('Error fetching films:', error);
        alert(error.error.errorMessage||error.error.customerMessage)
      }
    });
  }

  // Search for films based on title
  onSearch(): void {
    this.currentPage = 1; // Reset to the first page on a new search
    this.fetchFilms();
  }

  // Navigate to another page to view films from the database
  navigateToDatabasePage(): void {
    this.router.navigate(['/films-database']);
  }

  // Pagination
  nextPage(): void {
    this.currentPage++;
    this.fetchFilms();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchFilms();
    }
  }

  // Track the selection of a film
  toggleSelection(film: Film): void {
    this.disableSaveFilmBtn = false;
    this.films.map((f: Film) => {
      if (f.imdbID === film.imdbID) {
        f.selected = !f.selected;
      }
      if (f.selected) {
        this.disableSaveFilmBtn = true;
      }
      return f;
    });
  }

  // Send the selected films to another API
  saveSelectedFilms(): void {
    if (this.films.length > 0) {
      const url = 'http://localhost:8080/api/admin/films/saveFilm'; // Replace with your actual save API endpoint
      const selectedFilms = this.films.filter((film: Film) => film.selected);

      this.http.put(url, selectedFilms).subscribe({
        next: (response:any) => {
          console.log('Successfully saved selected films', response);
          // Reset selected films
          this.films.forEach((film) => (film.selected = false));
          this.selectedFilms = [];
          this.disableSaveFilmBtn = false;
          alert(response.customerMessage)
        },
        error: (error) => {
          console.error('Error saving selected films:', error);
          alert(error.error.errorMessage||error.error.customerMessage)
        }
      });
    } else {
      alert('Please select at least one film to save.');
    }
  }
}
