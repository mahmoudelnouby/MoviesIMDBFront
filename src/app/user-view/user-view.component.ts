import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-view',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  movies: any[] = [];
  // filteredMovies :any[]= [];
  selectedMovie: any = null;
  showDetailsPopup: boolean = false;
  currentPage: number = 0;
  totalPages: number = 1;
  searchQuery = '';
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(page: number = 0): void {
    this.movieService.getMovies(page).subscribe(response => {
      this.movies = response.body.content;
      this.totalPages = response.body.totalPages; // totalPages from API response
      this.currentPage = page;
    });
  }

  openDetails(movie: any): void {
    this.selectedMovie = movie;
    this.showDetailsPopup = true;
  }

  closeDetails(): void {
    this.showDetailsPopup = false;
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadMovies(page);
    }
  }

  submitRating(movie: any, i:number): void {
    if (movie.userRating >= 1 && movie.userRating <= 10) {

      this.movieService.saveRating(movie.imdbID, movie.userRating)
      .subscribe((res:any)=>{
        console.log(res);
        this.movies[i].Ratings.push(
          {
            "id": null,
            "Source": "Fawry Task",
            "Value": movie.userRating
        }
        );
        alert(res.body.body)
      },(error:any)=>{
        console.log(error);
        alert(error.error.errorMessage||error.error.customerMessage);
    
      });
    } else{
      alert('Rate Value Should be In Scale Of 10');
    }
  }

  onSearch(): void {
    this.movieService.searchMovie(this.searchQuery).subscribe((res:any)=>{
      console.log(res);
      this.movies = res.body;
      
    }, (err:any)=>{
      console.log(err);
      
    })
  }


}
