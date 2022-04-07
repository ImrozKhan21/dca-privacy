export const SearchBy = [
  {name: 'Country', code: 'Country'}
];

export const MappedCombinedCountryKey = 'Combine Country'

export const RegionSearch = {name: 'Region', code: 'Region'};


export const PAGE_SIZE = 8;
export const SEPARATE_PAGE_SIZE = 12;


export const SearchByLaw = [
  {name: 'Law', code: 'Law'},
  {name: 'Sector', code: 'Sector'},
  {name: 'Class', code: 'Class'},
  {name: 'Subject Area', code: 'Tags'}
]

export interface ICommunityDetails {
  sidebarLabel: string;
  id: string;
  sidebarIcon: string;
  sidebarRoute: string;
  header: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  sidebarIconDesc: string;
}
