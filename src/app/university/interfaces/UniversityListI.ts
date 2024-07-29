export interface UniversitiesApiResponseI {
    data: UniversityListI[];
    status: number;
}

export interface UniversityListI {
    alpha_two_code:   string;
    name:             string;
    domains:          string[];
    web_pages:        string[];
    country:          string;
}

export interface CountrysApiResponseI {
    data: CountrysI[];
    status: number
  }
  
  export interface CountrysI {
    name: string;
    code: string
  }

  export interface MoviesAPIResponseI {
    data: MoviesI[];
    status: number;
  }

  export interface MoviesI {
  genres:       string[];
  _id:          string;
  id:           number;
  url:          string;
  name:         string;
  type:         string;
  language:     string;
  status:       string;
  runtime:      number;
  premiered:    Date;
  officialSite: string;
  schedule:     Schedule;
  rating:       Rating;
  weight:       number;
  network:      Network;
  webChannel:   null;
  externals:    Externals;
  image:        Image;
  summary:      string;
  updated:      number;
  _links:       Links;
}

export interface Links {
  self:            Previousepisode;
  previousepisode: Previousepisode;
}

export interface Previousepisode {
  href: string;
}

export interface Externals {
  tvrage:  number;
  thetvdb: number;
  imdb:    string;
}

export interface Image {
  medium:   string;
  original: string;
}

export interface Network {
  id:      number;
  name:    string;
  country: Country;
}

export interface Country {
  name:     string;
  code:     string;
  timezone: string;
}

export interface Rating {
  average: number;
}

export interface Schedule {
  time: string;
  days: string[];
}
