import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routerAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerAnimation],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  title = 'kyc-angular';

  ngOnInit() {
    // // tracking
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((params: any) =>
    //     gtag('config', environment.gtagId, { page_path: params.url })
    //   );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
