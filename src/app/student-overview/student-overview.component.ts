import { Component, inject, signal } from '@angular/core';
import { TableComponent } from './table/table.component';
import { VehicleService } from '../commons/services/api/vehicle.service';
import { VehiclesResponseI } from '../Vehicle/Models/VehiclesI';

@Component({
  selector: 'app-student-overview',
  standalone: true,
  imports: [TableComponent],
  template: `

    



    @defer (when isLoading()) {
      <app-table [tableData]="response().Results" (dropDownSelection)=dropDownSelection($event)/>
    } @loading {
      <div>Loading...</div>
    }
  `,
  styleUrl: './student-overview.component.scss'
})
export class StudentOverviewComponent {

  isLoading = signal<boolean>(false);
  response = signal<VehiclesResponseI>({ Count: null, Message: '', SearchCriteria: '', Results: [] });
  vehicleService = inject(VehicleService);
  countryList: string[] = [
    "Brazil",
    "United Kingdom",
    "France",
    "Uganda",
    "United Arab Emirates",
    "Ukraine",
    "Chile",
    "China",
    "United States",
    "India",
    "Canada"
];

  constructor() {
    this.isLoading.set(true);
    this.#getVehiclesData('ford');
    this.extractCountries();
  }

  #getVehiclesData(vehicleType: string) {
    this.vehicleService.getVehicleData(vehicleType)
      .subscribe({
        next: (resp: VehiclesResponseI) => this.handleSuccess(resp),
        error: (err) => this.handleError(err)
      });
  }

  handleSuccess(resp: VehiclesResponseI) {
    this.response.set(resp);
    this.isLoading.set(false);

  }

  handleError(error) {
    console.log(error);
    this.isLoading.set(false);
  }

  dropDownSelection(event) {
    this.#getVehiclesData(event);
  }





 

  extractCountries() {
    this.uniList.forEach((univ) => {
      if (this.countryList.indexOf(univ.country) < 0) {
        this.countryList.push(univ.country)
      }

    })
    console.log(this.countryList)
  }



 uniList = [
    
    
  {
    "name": "Universidade Comunitária da Região de Chapecó - Unochapecó",
    "domains": [
        "unochapeco.edu.br"
    ],
    "state-province": null,
    "country": "Brazil",
    "web_pages": [
        "https://unochapeco.edu.br"
    ],
    "alpha_two_code": "BR"
},
    {
        "country": "India",
        "name": "Greater Kolkata College of Engineering & Management",
        "alpha_two_code": "IN",
        "state-province": null,
        "domains": [
            "gkcem.ac.in"
        ],
        "web_pages": [
            "https://www.gkcem.ac.in/"
        ]
    },
    {
        "country": "India",
        "name": "Chandil Polytechnic School",
        "alpha_two_code": "IN",
        "state-province": null,
        "domains": [
            "chandilpolytechnic.org"
        ],
        "web_pages": [
            "https://www.chandilpolytechnic.org/"
        ]
    },
    {
        "country": "India",
        "name": "Gola Polytechnic School",
        "alpha_two_code": "IN",
        "state-province": null,
        "domains": [
            "golapolytechnic.org"
        ],
        "web_pages": [
            "https://golapolytechnic.org/"
        ]
    },
    {
        "country": "India",
        "name": "Asansol Engineering College",
        "alpha_two_code": "IN",
        "state-province": null,
        "domains": [
            "aecwb.edu.in"
        ],
        "web_pages": [
            "http://www.aecwb.edu.in/"
        ]
    },
    {
        "country": "United States",
        "name": "Claremont Colleges",
        "alpha_two_code": "US",
        "state-province": null,
        "domains": [
            "claremont.edu"
        ],
        "web_pages": [
            "http://www.claremont.edu/"
        ]
    },
    {
        "country": "United States",
        "name": "Rowan College at Burlington County",
        "alpha_two_code": "US",
        "state-province": null,
        "domains": [
            "rcbc.edu"
        ],
        "web_pages": [
            "http://www.rcbc.edu/"
        ]
    }
]

}

