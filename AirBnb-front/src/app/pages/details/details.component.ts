import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService, Location } from 'src/app/services/location.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  location: Location | null = null; // Stocker les détails de la location
  isLoading: boolean = false; // Pour afficher l'état de chargement

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de la location à partir de l'URL
    if (id) {
      this.getLocationDetails(Number(id)); // Récupérer les détails de la location
    }
  }

  // Récupérer les détails d'une location
  getLocationDetails(id: number): void {
    this.isLoading = true; // Activer l'état de chargement
    this.locationService.getLocation(id).subscribe(
      (data) => {
        this.location = data; // Charger les données de la location
        this.isLoading = false; // Désactiver l'état de chargement
      },
      (error) => {
        console.error('Erreur lors de la récupération de la location', error);
        this.isLoading = false;
      }
    );
  }

  // Fonction pour ajouter un like à la location
  addLike(): void {
    if (!this.location) return;
    
    // Incrémente le nombre de likes dans la location
    this.locationService.likeLocation(this.location.id!).subscribe(
      (updatedLocation) => {
        this.location = updatedLocation; // Met à jour la location avec les nouveaux likes
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du like', error);
      }
    );
  }
}
