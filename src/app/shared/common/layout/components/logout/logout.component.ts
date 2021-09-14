import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/app-routing/auth-guard.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authGuardService: AuthGuardService, 
    private router: Router) { }

  ngOnInit(): void {
  }

    logout(){
      this.authGuardService.logout();
      this.router.navigate(['/rfreg']);
    }
}
