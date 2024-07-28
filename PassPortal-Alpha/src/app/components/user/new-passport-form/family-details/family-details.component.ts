import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-family-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
})
export class FamilyDetailsComponent implements OnInit {
  isMinor: boolean = false;
  showGuardianDetails: boolean = false;
  showSpouseDetails: boolean = false;

  ngOnInit(): void {
    this.initializeFormVisibility();
  }

  initializeFormVisibility(): void {
    this.isMinor = false;
    this.showGuardianDetails = false;
    this.showSpouseDetails = false;
  }

  onMinorOrAdultChange(event: any): void {
    const value = event.target.value;
    this.isMinor = value === 'minor';
    if (this.isMinor) {
      this.showGuardianDetails = false;
      this.showSpouseDetails = false;
    }
  }

  onAddGuardianDetailsChange(event: any): void {
    this.showGuardianDetails = event.target.checked;
  }

  onAddSpouseChange(event: any): void {
    this.showSpouseDetails = event.target.checked;
  }
}
