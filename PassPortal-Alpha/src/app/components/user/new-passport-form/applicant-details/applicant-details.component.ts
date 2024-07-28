import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicant-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css'],
})
export class ApplicantDetailsComponent implements OnInit {
  states: string[] = [];
  districts: { [key: string]: string[] } = {};
  selectedState: string = '';
  selectedDistricts: string[] = [];
  aliasesVisible: boolean = false;
  previousNameVisible: boolean = false;
  showOrganizationName: boolean = false;

  ngOnInit(): void {
    this.fetchStateDistrictData();
  }

  fetchStateDistrictData(): void {
    fetch('/assets/states_districts.json')
      .then((response) => {
        console.log('Fetch response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched:', data);
        this.states = data.states;
        this.districts = data.districts;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  onStateChange(event: any): void {
    this.selectedState = event.target.value;
    this.selectedDistricts = this.districts[this.selectedState] || [];
  }

  onEmploymentTypeChange(event: any): void {
    const employmentType = event.target.value;
    this.showOrganizationName =
      employmentType === 'psu' ||
      employmentType === 'government' ||
      employmentType === 'statutory_body';
  }

  toggleAliases(visible: boolean): void {
    this.aliasesVisible = visible;
  }

  togglePreviousName(visible: boolean): void {
    this.previousNameVisible = visible;
  }

  goToFamilyDetails(): void {
    document.getElementById('familyDetails-tab')?.click();
    document
      .getElementById('familyDetails')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
