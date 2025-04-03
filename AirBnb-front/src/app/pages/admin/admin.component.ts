import { Component, OnInit } from '@angular/core';
import { LocationService, Location } from 'src/app/services/location.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  locations: Location[] = [];
  locationForm: FormGroup;
  selectedLocation: Location | null = null;

  defaultImages = [
    'assets/img1.png',
    'assets/img2.png',
    'assets/img3.png'
  ];

  constructor(private locationService: LocationService, private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      name: [''],
      description: [''],
      photo: [null] 
    });
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }

  addLocation() {
    const formValues = this.locationForm.value;
    const location: Location = {
      name: formValues.name,
      description: formValues.description,
      photo: formValues.photo ? formValues.photo : this.defaultImages[0], 
      likes: 0
    };
    this.locationService.addLocation(location, formValues.photo).subscribe(() => { 
      this.getLocations();
      this.locationForm.reset();
    });
  }
  
  selectLocation(location: Location) {
    this.selectedLocation = location;
    this.locationForm.patchValue({
      name: location.name,
      description: location.description
    });
  }


  updateLocation() {
    if (!this.selectedLocation) return;

    const formValues = this.locationForm.value;
    const updatedLocation: Location = {
      ...this.selectedLocation,
      name: formValues.name,
      description: formValues.description,
      photo: formValues.photo ? formValues.photo : this.selectedLocation.photo 
    };

    this.locationService.updateLocation(this.selectedLocation.id!, updatedLocation).subscribe(() => {
      this.getLocations();
      this.selectedLocation = null;
      this.locationForm.reset();
    });
  }

  deleteLocation(id: number) {
    this.locationService.deleteLocation(id).subscribe(() => {
      this.getLocations();
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.locationForm.patchValue({ photo: file });
  }

  getLocationImage(location: Location): string {
    if (location.photo instanceof File) {
      return URL.createObjectURL(location.photo);
    }
    return location.photo ? location.photo : this.defaultImages[0];  
  }
    
  addLike(location: Location) {
    this.locationService.likeLocation(location.id!).subscribe(updatedLocation => {
      const index = this.locations.findIndex(loc => loc.id === updatedLocation.id);
      if (index !== -1) {
        this.locations[index] = updatedLocation;
      }
    });
  }
}
