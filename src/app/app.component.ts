import {Component, ElementRef, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import {User} from "./shared/models/user";
import {UserService} from "./shared/services/user.service";
import {AdminService} from "./shared/services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;
  isAdmin: boolean=false;
  title: any;
  user?: User;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private adminService: AdminService,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
      this.authService.isUserLoggedIn().subscribe(user => {
        console.log(user);
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        localStorage.setItem('admin', JSON.stringify(null));
        this.isAdmin=false;
        this.getUser();
        this.getAdmin();
      }, error => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify(null));
        localStorage.setItem('admin', JSON.stringify(null));
      });
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#303030';
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully.');
    }).catch(error => {
      console.error(error);
    });
  }

  getUser(){
    if(this.loggedInUser) {
      const obs = this.userService.getById(this.loggedInUser.uid).subscribe(user => {
        obs.unsubscribe();
        this.user = user;
      });
    }
  }

  getAdmin(){
    console.log("[getAdmin()]: "+this.loggedInUser?.uid);
    const obs=this.adminService.getByUid(this.loggedInUser?.uid as string).subscribe(data=>{
      obs.unsubscribe();
      console.log("[getAdmin()]: "+data[0].uid);
      if(data[0]){
        this.isAdmin=true;
        localStorage.setItem('admin', JSON.stringify({admin: true}));
      }else{
        localStorage.setItem('admin', JSON.stringify(null));
      }
    });
  }
}
