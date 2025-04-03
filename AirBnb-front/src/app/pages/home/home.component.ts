import { Component, OnInit } from '@angular/core';
import { LocationService, Location } from 'src/app/services/location.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  getLocations() {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
      this.filteredLocations = data;
    });
  }

  onSearch() {
    const term = this.locationForm.value.search.trim().toLowerCase();
    const minLikes = this.locationForm.value.minLikes;
    
    // Filtrer par nom
    let filtered = this.locations.filter(location =>
      location.name.toLowerCase().includes(term)
    );
    
    if (minLikes !== '') {
      filtered = filtered.filter(location => location.likes >= minLikes);
    }

    this.filteredLocations = filtered;
  }

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