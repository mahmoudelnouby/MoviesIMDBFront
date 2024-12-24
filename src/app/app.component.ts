import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FawryTask';
  inLoginPage : boolean = false;
  admin : boolean = false;
  inUserPage : boolean = false;
  constructor( private router: Router) { }

  ngOnInit(){
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.inLoginPage = val.urlAfterRedirects == '/' || val.urlAfterRedirects == ''; 
        this.inUserPage = val.urlAfterRedirects.includes('userView'); 
        // console.log(this.inUserPage);
        
      }
});

  this.admin = localStorage.getItem('userRole') === 'ADMIN';
  // console.log(this.admin);
  
  }

  logout(): void {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');  // Adjust 'authToken' to whatever key your app uses
    localStorage.removeItem('userRole');
    // Navigate to the login page (or home page)
    this.router.navigate(['/login']);  // You can change '/login' to the actual login path
  }
  goToUserPage():void{
    this.router.navigate(['/userView']);
  }
  goToAdminPage():void{
    this.router.navigate(['/films']);
  }
}

