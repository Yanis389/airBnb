import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService, Location } from 'src/app/services/location.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  location: Location | null = null;
  isLoading: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.getLocationDetails(Number(id)); 
    }
  }

  getLocationDetails(id: number): void {
    this.isLoading = true; 
    this.locationService.getLocation(id).subscribe(
      (data) => {
        this.location = data; 
        this.isLoading = false; 
      },
      (error) => {
        console.error('Erreur lors de la récupération de la location', error);
        this.isLoading = false;
      }
    );
  }

  addLike(): void {
    if (!this.location) return;
    
    this.locationService.likeLocation(this.location.id!).subscribe(
      (updatedLocation) => {
        this.location = updatedLocation; 
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du like', error);
      }
    );
  }

  getLocationImage(location: Location): string {
    if (location.photo) {
      return `${environment.uploadsUrl}/${location.photo}`; 
    }
    return 'assets/placeholder.jpg'; 
  }
}
