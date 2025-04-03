import { Component, OnInit } from '@angular/core';
import { LocationService, Location } from 'src/app/services/location.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  locationForm: FormGroup;
  searchTerm: string = '';
  minLikes: number | null = null; 

  constructor(private locationService: LocationService, private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      search: [''],
      minLikes: [''] 
    });
  }

  ngOnInit(): void {
    this.getLocations();
  }

  // Récupérer les locations depuis le service
  getLocations() {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
      this.filteredLocations = data;
    });
  }

  // Fonction pour obtenir l'image de la location avec un chemin correct
  getLocationImage(location: Location): string {
    if (location.photo) {
      return `${environment.uploadsUrl}/${location.photo}`; // Utiliser l'URL complète
    }
    return 'assets/placeholder.jpg'; // Image par défaut si la photo est absente
  }

  // Filtrer les locations en fonction de la recherche
  onSearch() {
    const term = this.locationForm.value.search.trim().toLowerCase();
    const minLikes = this.locationForm.value.minLikes;
    
    // Filtrer par nom
    let filtered = this.locations.filter(location =>
      location.name.toLowerCase().includes(term)
    );
    
    // Filtrer par nombre de likes
    if (minLikes !== '') {
      filtered = filtered.filter(location => location.likes >= minLikes);
    }

    this.filteredLocations = filtered;
  }

  // Fonction pour ajouter un like à la location
  addLike(location: Location) {
    this.locationService.likeLocation(location.id!).subscribe(updatedLocation => {
      const index = this.locations.findIndex(loc => loc.id === updatedLocation.id);
      if (index !== -1) {
        this.locations[index] = updatedLocation;
        this.filteredLocations = [...this.locations]; 
      }
    });
  }
}
