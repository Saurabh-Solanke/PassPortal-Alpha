import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css'],
  standalone: true,
})
export class OtherDetailsComponent implements OnInit {
  ngOnInit() {
    const sections = [
      { name: 'criminal_proceedings_1', detailsId: 'proceedings_details' },
      { name: 'criminal_proceedings_2', detailsId: 'summons_details' },
      { name: 'criminal_proceedings_3', detailsId: 'arrest_warrant_details' },
      { name: 'criminal_proceedings_4', detailsId: 'departure_order_details' },
      { name: 'criminal_convictions', detailsId: 'conviction_details' },
      { name: 'refused_passport_1', detailsId: 'refused_passport_details' },
      { name: 'refused_passport_2', detailsId: 'impounded_details' },
      { name: 'refused_passport_3', detailsId: 'revoked_details' },
      {
        name: 'granted_citizenship_1',
        detailsId: 'citizenship_granted_details',
      },
      { name: 'granted_citizenship_2', detailsId: 'held_passport_details' },
      {
        name: 'granted_citizenship_3',
        detailsId: 'surrendered_passport_details',
      },
      { name: 'granted_citizenship_4', detailsId: 'renunciation_details' },
      { name: 'surrendered_passport_1', detailsId: 'returned_ec_details' },
      { name: 'surrendered_passport_2', detailsId: 'deported_details' },
      { name: 'surrendered_passport_3', detailsId: 'repatriated_details' },
    ];

    sections.forEach((section) => {
      document
        .querySelectorAll(`input[name="${section.name}"]`)
        .forEach((elem) => {
          elem.addEventListener('change', () => {
            const details = document.getElementById(section.detailsId);
            const inputElem = elem as HTMLInputElement;
            if (inputElem.id.endsWith('_yes') && inputElem.checked) {
              details?.classList.remove('d-none');
            } else {
              details?.classList.add('d-none');
            }
          });
        });
    });
  }
}
