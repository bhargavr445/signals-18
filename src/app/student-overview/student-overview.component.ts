import { Component, inject, signal } from '@angular/core';
import { TableComponent } from './table/table.component';
import { VehicleService } from '../Vehicle/Services/vehicle.service';
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
    "name": "West Herts College",
    "domains": [
        "student.westherts.ac.uk",
        "westherts.ac.uk"
    ],
    "state-province": null,
    "country": "United Kingdom",
    "web_pages": [
        "https://westherts.ac.uk"
    ],
    "alpha_two_code": "GB"
},
{
    "name": "National Institute of Applied Sciences of Toulouse",
    "domains": [
        "insa-toulouse.fr"
    ],
    "state-province": null,
    "country": "France",
    "web_pages": [
        "https://insa-toulouse.fr"
    ],
    "alpha_two_code": "FR"
},
{
    "name": "Bugema University",
    "domains": [
        "bugemauniv.ac.ug"
    ],
    "state-province": "Luweero",
    "country": "Uganda",
    "web_pages": [
        "https://bugemauniv.ac.ug/"
    ],
    "alpha_two_code": "UG"
},
{
    "name": "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
    "domains": [
        "mbzuai.ac.ae"
    ],
    "state-province": "Abu Dhabi",
    "country": "United Arab Emirates",
    "web_pages": [
        "https://mbzuai.ac.ae/"
    ],
    "alpha_two_code": "AE"
},
{
    "name": "Centro Universitário de Brasília, UNICEUB",
    "domains": [
        "sempreceub.com",
        "uniceub.br"
    ],
    "state-province": null,
    "country": "Brazil",
    "web_pages": [
        "https://www.uniceub.br"
    ],
    "alpha_two_code": "BR"
},
{
    "name": "Kharkiv National University",
    "domains": [
        "student.karazin.ua",
        "karazin.ua"
    ],
    "state-province": null,
    "country": "Ukraine",
    "web_pages": [
        "https://karazin.ua"
    ],
    "alpha_two_code": "UA"
},
{
    "name": "Universidad Técnica Federico Santa María",
    "domains": [
        "usm.cl"
    ],
    "state-province": null,
    "country": "Chile",
    "web_pages": [
        "https://usm.cl"
    ],
    "alpha_two_code": "CL"
},
{
    "name": "IÉSEG School of Management",
    "domains": [
        "ieseg.fr"
    ],
    "state-province": null,
    "country": "France",
    "web_pages": [
        "https://ieseg.fr"
    ],
    "alpha_two_code": "FR"
},
{
    "name": "Sun Yat-Sen University",
    "domains": [
        "mail2.sysu.edu.cn",
        "mail.sysu.edu.cn"
    ],
    "state-province": null,
    "country": "China",
    "web_pages": [
        "https://sysu.edu.cn"
    ],
    "alpha_two_code": "CN"
},
{
    "name": "Royal Holloway University of London",
    "domains": [
        "rhul.ac.uk"
    ],
    "state-province": null,
    "country": "United Kingdom",
    "web_pages": [
        "https://rhul.ac.uk"
    ],
    "alpha_two_code": "GB"
},
{
    "name": "Hunan University",
    "domains": [
        "hnu.edu.cn",
        "www-en.hnu.edu.cn"
    ],
    "state-province": null,
    "country": "China",
    "web_pages": [
        "https://www.hnu.edu.cn",
        "http://www-en.hnu.edu.cn"
    ],
    "alpha_two_code": "CN"
},
{
    "name": "University of Portsmouth",
    "domains": [
        "myport.ac.uk",
        "myport.port.ac.uk"
    ],
    "state-province": null,
    "country": "United Kingdom",
    "web_pages": [
        "https://myport.port.ac.uk"
    ],
    "alpha_two_code": "GB"
},
{
    "country": "France",
    "name": "Académie de Paris",
    "alpha_two_code": "FR",
    "state-province": null,
    "domains": [
        "ac-paris.fr"
    ],
    "web_pages": [
        "https://www.ac-paris.fr/"
    ]
},
{
    "country": "France",
    "name": "Académie d'Aix-Marseille",
    "alpha_two_code": "FR",
    "state-province": null,
    "domains": [
        "ac-aix-marseille.fr"
    ],
    "web_pages": [
        "https://www.ac-aix-marseille.fr/"
    ]
},
{
    "country": "France",
    "name": "Académie de Créteil",
    "alpha_two_code": "FR",
    "state-province": null,
    "domains": [
        "ac-creteil.fr"
    ],
    "web_pages": [
        "https://www.ac-creteil.fr/"
    ]
},
{
    "country": "United States",
    "name": "Marywood University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "marywood.edu"
    ],
    "web_pages": [
        "http://www.marywood.edu"
    ]
},
{
    "country": "India",
    "name": "University of Petroleum and Energy Studies",
    "alpha_two_code": "IN",
    "state-province": "Dehradun",
    "domains": [
        "upes.ac.in"
    ],
    "web_pages": [
        "https://www.upes.ac.in/"
    ]
},
{
    "country": "India",
    "name": "Ashoka University",
    "alpha_two_code": "IN",
    "state-province": "Haryana",
    "domains": [
        "ashoka.edu.in"
    ],
    "web_pages": [
        "https://www.ashoka.edu.in"
    ]
},
{
    "country": "India",
    "name": "Indian Institute of Information Technology Sri City",
    "alpha_two_code": "IN",
    "state-province": "Chittoor",
    "domains": [
        "iiits.in"
    ],
    "web_pages": [
        "https://www.iiits.ac.in/"
    ]
},
{
    "country": "Canada",
    "name": "Cégep de Saint-Jérôme",
    "alpha_two_code": "CA",
    "state-province": "Quebec",
    "domains": [
        "cstj.qc.ca"
    ],
    "web_pages": [
        "https://www.cstj.qc.ca",
        "https://ccmt.cstj.qc.ca",
        "https://ccml.cstj.qc.ca"
    ]
},
{
    "country": "United States",
    "name": "Lindenwood University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "lindenwood.edu"
    ],
    "web_pages": [
        "http://www.lindenwood.edu/"
    ]
},
{
    "country": "India",
    "name": "DAV Institute of Engineering & Technology",
    "alpha_two_code": "IN",
    "state-province": "Punjab",
    "domains": [
        "davietjal.org"
    ],
    "web_pages": [
        "http://www.davietjal.org/"
    ]
},
{
    "country": "India",
    "name": "Lovely Professional University",
    "alpha_two_code": "IN",
    "state-province": "Punjab",
    "domains": [
        "lpu.in"
    ],
    "web_pages": [
        "http://www.lpu.in/"
    ]
},
{
    "country": "United States",
    "name": "Sullivan University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "sullivan.edu"
    ],
    "web_pages": [
        "https://sullivan.edu/"
    ]
},
{
    "country": "United States",
    "name": "Florida State College at Jacksonville",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "fscj.edu"
    ],
    "web_pages": [
        "https://www.fscj.edu/"
    ]
},
{
    "country": "United States",
    "name": "Xavier University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "xavier.edu"
    ],
    "web_pages": [
        "https://www.xavier.edu/"
    ]
},
{
    "country": "United States",
    "name": "Tusculum College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "tusculum.edu"
    ],
    "web_pages": [
        "https://home.tusculum.edu/"
    ]
},
{
    "country": "United States",
    "name": "Claremont School of Theology",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "cst.edu"
    ],
    "web_pages": [
        "https://cst.edu/"
    ]
},
{
    "country": "India",
    "name": "Somaiya Vidyavihar",
    "alpha_two_code": "IN",
    "state-province": null,
    "domains": [
        "somaiya.edu"
    ],
    "web_pages": [
        "https://somaiya.edu/"
    ]
},
{
    "country": "United States",
    "name": "Columbia College (SC)",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "columbiasc.edu"
    ],
    "web_pages": [
        "https://www.columbiasc.edu/"
    ]
},
{
    "country": "United States",
    "name": "Chabot-Las Positas Community College District",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "clpccd.edu"
    ],
    "web_pages": [
        "http://www.clpccd.edu/"
    ]
},
{
    "country": "United States",
    "name": "Keller Graduate School of Management",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "keller.edu"
    ],
    "web_pages": [
        "https://www.keller.edu/"
    ]
},
{
    "country": "United States",
    "name": "Monroe College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "monroecollege.edu"
    ],
    "web_pages": [
        "https://monroecollege.edu/"
    ]
},
{
    "country": "United States",
    "name": "San Mateo County Community College District",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "smccd.edu"
    ],
    "web_pages": [
        "https://smccd.edu/"
    ]
},
{
    "country": "United States",
    "name": "Los Rios Community College District",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "losrios.edu"
    ],
    "web_pages": [
        "http://losrios.edu/"
    ]
},
{
    "country": "United States",
    "name": "DigiPen Institute of Technology",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "digipen.edu"
    ],
    "web_pages": [
        "https://www.digipen.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Pittsburgh Medical Center",
    "alpha_two_code": "US",
    "state-province": "Pennsylvania",
    "domains": [
        "upmc.edu",
        "upmc.com"
    ],
    "web_pages": [
        "https://www.upmc.com/"
    ]
},
{
    "country": "United States",
    "name": "Claremont Graduate University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "cgu.edu"
    ],
    "web_pages": [
        "https://www.cgu.edu/"
    ]
},
{
    "country": "United States",
    "name": "The University of Texas at Rio Grande Valley",
    "alpha_two_code": "US",
    "state-province": "Texas",
    "domains": [
        "utrgv.edu"
    ],
    "web_pages": [
        "https://www.utrgv.edu/"
    ]
},
{
    "country": "United States",
    "name": "College of Mount Saint Vincent",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "mountsaintvincent.edu"
    ],
    "web_pages": [
        "https://mountsaintvincent.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Arkansas System eVersity",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "uasys.edu"
    ],
    "web_pages": [
        "https://www.uasys.edu/"
    ]
},
{
    "country": "United States",
    "name": "ECPI University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "ecpi.edu"
    ],
    "web_pages": [
        "https://www.ecpi.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Mary Washington",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "umw.edu"
    ],
    "web_pages": [
        "https://www.umw.edu/"
    ]
},
{
    "country": "United States",
    "name": "Baldwin Wallace University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "bw.edu"
    ],
    "web_pages": [
        "https://www.bw.edu/"
    ]
},
{
    "country": "United States",
    "name": "California State University Channel Islands",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "csuci.edu"
    ],
    "web_pages": [
        "https://www.csuci.edu/"
    ]
},
{
    "country": "United States",
    "name": "Brandman University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "brandman.edu"
    ],
    "web_pages": [
        "https://www.brandman.edu/"
    ]
},
{
    "country": "United States",
    "name": "United States Coast Guard Academy",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "uscga.edu"
    ],
    "web_pages": [
        "http://www.uscga.edu/"
    ]
},
{
    "country": "United States",
    "name": "Athens State University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "athens.edu"
    ],
    "web_pages": [
        "http://www.athens.edu/"
    ]
},
{
    "country": "United States",
    "name": "The Scripps Research Institute",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "scripps.edu"
    ],
    "web_pages": [
        "https://scripps.edu/"
    ]
},
{
    "country": "United States",
    "name": "Eastern Florida State College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "easternflorida.edu"
    ],
    "web_pages": [
        "http://www.easternflorida.edu/"
    ]
},
{
    "country": "United States",
    "name": "Western New England University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "wne.edu"
    ],
    "web_pages": [
        "http://www1.wne.edu/"
    ]
},
{
    "country": "United States",
    "name": "King University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "king.edu"
    ],
    "web_pages": [
        "https://king.edu/"
    ]
},
{
    "country": "United States",
    "name": "Georgia Gwinnett College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "ggc.edu"
    ],
    "web_pages": [
        "https://ggc.edu/"
    ]
},
{
    "country": "United States",
    "name": "Trident University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "trident.edu"
    ],
    "web_pages": [
        "https://www.trident.edu/"
    ]
},
{
    "country": "United States",
    "name": "Alliant International University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "alliant.edu"
    ],
    "web_pages": [
        "https://www.alliant.edu/"
    ]
},
{
    "country": "United States",
    "name": "Mississippi Valley State University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "mvsu.edu"
    ],
    "web_pages": [
        "https://mvsu.edu/"
    ]
},
{
    "country": "United States",
    "name": "Roosevelt University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "roosevelt.edu"
    ],
    "web_pages": [
        "https://www.roosevelt.edu/"
    ]
},
{
    "country": "United States",
    "name": "ITT Technical Institute",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "itt-tech.info",
        "itt-tech.edu"
    ],
    "web_pages": [
        "http://itt-tech.info/"
    ]
},
{
    "country": "United States",
    "name": "Illinois Eastern Community Colleges",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "iecc.edu"
    ],
    "web_pages": [
        "https://iecc.edu/"
    ]
},
{
    "country": "United States",
    "name": "Park University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "park.edu"
    ],
    "web_pages": [
        "https://park.edu/"
    ]
},
{
    "country": "United States",
    "name": "Icahn School of Medicine at Mount Sinai",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "mssm.edu"
    ],
    "web_pages": [
        "http://icahn.mssm.edu/"
    ]
},
{
    "country": "United States",
    "name": "Utah Valley University",
    "alpha_two_code": "US",
    "state-province": "Utah",
    "domains": [
        "uvu.edu"
    ],
    "web_pages": [
        "https://uvu.edu/"
    ]
},
{
    "country": "United States",
    "name": "Wisconsin Lutheran College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "wlc.edu"
    ],
    "web_pages": [
        "http://www.wlc.edu/"
    ]
},
{
    "country": "United States",
    "name": "Riverside Community College District",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "rccd.edu"
    ],
    "web_pages": [
        "http://www.rccd.edu/"
    ]
},
{
    "country": "United States",
    "name": "Wake Forest Baptist Health",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "wakehealth.edu"
    ],
    "web_pages": [
        "http://www.wakehealth.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Massachusetts Boston",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "umb.edu"
    ],
    "web_pages": [
        "https://www.umb.edu/"
    ]
},
{
    "country": "United States",
    "name": "Florida Polytechnic University",
    "alpha_two_code": "US",
    "state-province": "Florida",
    "domains": [
        "floridapoly.edu"
    ],
    "web_pages": [
        "https://floridapoly.edu/"
    ]
},
{
    "country": "United States",
    "name": "Wagner College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "wagner.edu"
    ],
    "web_pages": [
        "https://wagner.edu/"
    ]
},
{
    "country": "United States",
    "name": "Wilmington University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "wilmu.edu"
    ],
    "web_pages": [
        "https://www.wilmu.edu/"
    ]
},
{
    "country": "United States",
    "name": "International Technological University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "itu.edu"
    ],
    "web_pages": [
        "https://itu.edu/"
    ]
},
{
    "country": "United States",
    "name": "Young Harris College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "yhc.edu"
    ],
    "web_pages": [
        "https://www.yhc.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Findlay",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "findlay.edu"
    ],
    "web_pages": [
        "https://www.findlay.edu/"
    ]
},
{
    "country": "United States",
    "name": "Philadelphia College of Osteopathic Medicine",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "pcom.edu"
    ],
    "web_pages": [
        "https://www.pcom.edu/"
    ]
},
{
    "country": "United States",
    "name": "Yosemite Community College District",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "yosemite.edu"
    ],
    "web_pages": [
        "https://www.yosemite.edu/"
    ]
},
{
    "country": "United States",
    "name": "Coastal Alabama Community College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "coastalalabama.edu"
    ],
    "web_pages": [
        "http://www.coastalalabama.edu/"
    ]
},
{
    "country": "United States",
    "name": "Purdue University Northwest",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "pnw.edu"
    ],
    "web_pages": [
        "https://www.pnw.edu/"
    ]
},
{
    "country": "United States",
    "name": "Columbia Basin College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "columbiabasin.edu"
    ],
    "web_pages": [
        "http://www.columbiabasin.edu/"
    ]
},
{
    "country": "United States",
    "name": "Seattle Colleges",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "seattlecolleges.edu"
    ],
    "web_pages": [
        "https://www.seattlecolleges.edu/"
    ]
},
{
    "country": "United States",
    "name": "Lipscomb University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "lipscomb.edu"
    ],
    "web_pages": [
        "https://www.lipscomb.edu/"
    ]
},
{
    "country": "United States",
    "name": "Tiffin University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "tiffin.edu"
    ],
    "web_pages": [
        "http://www.tiffin.edu/"
    ]
},
{
    "country": "India",
    "name": "NorthCap University",
    "alpha_two_code": "IN",
    "state-province": "Haryana",
    "domains": [
        "ncuindia.edu"
    ],
    "web_pages": [
        "http://www.ncuindia.edu/"
    ]
},
{
    "country": "United States",
    "name": "Troy University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "troy.edu"
    ],
    "web_pages": [
        "https://troy.edu/"
    ]
},
{
    "country": "United States",
    "name": "42 US",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "student.42.us.org"
    ],
    "web_pages": [
        "http://www.42.us.org/"
    ]
},
{
    "country": "United States",
    "name": "California Baptist University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "calbaptist.edu"
    ],
    "web_pages": [
        "http://www.calbaptist.edu/"
    ]
},
{
    "country": "United States",
    "name": "Stevenson University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "stevenson.edu"
    ],
    "web_pages": [
        "http://www.stevenson.edu/"
    ]
},
{
    "country": "United States",
    "name": "Marine Biological Laboratory",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "mbl.edu"
    ],
    "web_pages": [
        "http://www.mbl.edu/"
    ]
},
{
    "country": "United States",
    "name": "Maryville University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "maryville.edu"
    ],
    "web_pages": [
        "http://www.maryville.edu/"
    ]
},
{
    "country": "United States",
    "name": "The Art Institutes",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "aii.edu"
    ],
    "web_pages": [
        "http://www.aii.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Mississippi Medical Center",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "umc.edu"
    ],
    "web_pages": [
        "http://www.umc.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of Central Oklahoma",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "uco.edu"
    ],
    "web_pages": [
        "http://www.uco.edu/"
    ]
},
{
    "country": "United States",
    "name": "Hallmark University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "hallmarkuniversity.edu"
    ],
    "web_pages": [
        "http://www.hallmarkuniversity.edu/"
    ]
},
{
    "country": "United States",
    "name": "Keiser University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "keiseruniversity.edu"
    ],
    "web_pages": [
        "http://www.keiseruniversity.edu/"
    ]
},
{
    "country": "United States",
    "name": "St. Johns River State College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "sjrstate.edu"
    ],
    "web_pages": [
        "http://www.sjrstate.edu/"
    ]
},
{
    "country": "United States",
    "name": "Indian River State College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "irsc.edu"
    ],
    "web_pages": [
        "http://www.irsc.edu/"
    ]
},
{
    "country": "United States",
    "name": "Barnard College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "barnard.edu"
    ],
    "web_pages": [
        "http://www.barnard.edu/"
    ]
},
{
    "country": "United States",
    "name": "California Southern University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "calsouthern.edu"
    ],
    "web_pages": [
        "http://www.calsouthern.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of La Verne",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "laverne.edu"
    ],
    "web_pages": [
        "http://www.laverne.edu/"
    ]
},
{
    "country": "United States",
    "name": "Washington & Jefferson College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "washjeff.edu"
    ],
    "web_pages": [
        "http://www.washjeff.edu/"
    ]
},
{
    "country": "United States",
    "name": "University of the People",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "uopeople.edu"
    ],
    "web_pages": [
        "http://www.uopeople.edu/"
    ]
},
{
    "country": "United States",
    "name": "Touro College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "touro.edu"
    ],
    "web_pages": [
        "http://www.touro.edu/"
    ]
},
{
    "country": "United States",
    "name": "New Jersey City University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "njcu.edu"
    ],
    "web_pages": [
        "http://www.njcu.edu/"
    ]
},
{
    "country": "United States",
    "name": "Lander University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "lander.edu"
    ],
    "web_pages": [
        "http://www.lander.edu/"
    ]
},
{
    "country": "United States",
    "name": "SUNY Maritime College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "sunymaritime.edu"
    ],
    "web_pages": [
        "http://www.sunymaritime.edu/"
    ]
},
{
    "country": "United States",
    "name": "Lesley University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "lesley.edu"
    ],
    "web_pages": [
        "http://www.lesley.edu/"
    ]
},
{
    "country": "United States",
    "name": "Laurus College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "lauruscollege.edu"
    ],
    "web_pages": [
        "http://www.lauruscollege.edu/"
    ]
},
{
    "country": "United States",
    "name": "National Park College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "np.edu"
    ],
    "web_pages": [
        "http://www.np.edu/"
    ]
},
{
    "country": "United States",
    "name": "Oklahoma Christian University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "oc.edu"
    ],
    "web_pages": [
        "http://www.oc.edu/"
    ]
},
{
    "country": "United States",
    "name": "San Diego Christian College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "sdcc.edu"
    ],
    "web_pages": [
        "http://www.sdcc.edu/"
    ]
},
{
    "country": "United States",
    "name": "SANS Technology Institute",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "sans.edu"
    ],
    "web_pages": [
        "http://www.sans.edu/"
    ]
},
{
    "country": "United States",
    "name": "Pasco-Hernando State College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "phsc.edu"
    ],
    "web_pages": [
        "http://www.phsc.edu/"
    ]
},
{
    "country": "United States",
    "name": "New College of Florida",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "ncf.edu"
    ],
    "web_pages": [
        "http://www.ncf.edu/"
    ]
},
{
    "country": "United States",
    "name": "Grand Canyon University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "gcu.edu"
    ],
    "web_pages": [
        "http://www.gcu.edu/"
    ]
},
{
    "country": "United States",
    "name": "Cold Spring Harbor Laboratory",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "cshl.edu"
    ],
    "web_pages": [
        "http://www.cshl.edu/"
    ]
},
{
    "country": "United States",
    "name": "Albany State University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "asurams.edu"
    ],
    "web_pages": [
        "http://www.asurams.edu/"
    ]
},
{
    "country": "United States",
    "name": "Lasell College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "lasell.edu"
    ],
    "web_pages": [
        "http://www.lasell.edu/"
    ]
},
{
    "country": "United States",
    "name": "Contra Costa Community College District",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "4cd.edu"
    ],
    "web_pages": [
        "http://www.4cd.edu/"
    ]
},
{
    "country": "United States",
    "name": "Mount St. Mary's University",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "msmary.edu"
    ],
    "web_pages": [
        "http://www.msmary.edu/"
    ]
},
{
    "country": "United States",
    "name": "Robert Morris University Illinois",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "robertmorris.edu"
    ],
    "web_pages": [
        "http://www.robertmorris.edu/"
    ]
},
{
    "country": "United States",
    "name": "Northwest Florida State College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "nwfsc.edu"
    ],
    "web_pages": [
        "http://www.nwfsc.edu/"
    ]
},
{
    "country": "United States",
    "name": "West Virginia Wesleyan College",
    "alpha_two_code": "US",
    "state-province": null,
    "domains": [
        "wvwc.edu"
    ],
    "web_pages": [
        "http://www.wvwc.edu/"
    ]
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

