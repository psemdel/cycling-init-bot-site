interface Nationality {
  value: string;
  viewValue: string;
}

export const nationalities: Nationality[] = [
    {value: 'BEL', viewValue: 'Belgium'},
    {value: 'ITA', viewValue: 'Italy'},
    {value: 'FRA', viewValue: 'France'},
    {value: 'COL', viewValue: 'Colombia'},
    {value: 'NED', viewValue: 'Netherlands'},
    {value: 'GER', viewValue: 'Germany'},
    {value: 'SLO', viewValue: 'Slovenia'},
    {value: 'AUS', viewValue: 'Australia'},
    {value: 'ESP', viewValue: 'Spain'},
    {value: 'DEN', viewValue: 'Danemark'},
    {value: 'GBR', viewValue: 'Great-Britain'},
    {value: 'NOR', viewValue: 'Norway'},
    {value: 'SUI', viewValue: 'Switzerland'},
    {value: 'RUS', viewValue: 'Russia'},
    {value: 'AUS', viewValue: 'Austria'},
    {value: 'IRL', viewValue: 'Ireland'},
    {value: 'KAZ', viewValue: 'Kazakhstan'},
    {value: 'POL', viewValue: 'Poland'},
    {value: 'ECU', viewValue: 'Ecuador'},
    {value: 'SVK', viewValue: 'Slovakia'},
    {value: 'CAN', viewValue: 'Canada'},
    {value: 'POR', viewValue: 'Portugal'},
    {value: 'RSA', viewValue: 'South-Africa'},
    {value: 'CZE', viewValue: 'Czech Republic'},
    {value: 'USA', viewValue: 'USA'},
    {value: 'EST', viewValue: 'Estonia'},
    {value: 'ERI', viewValue: 'Eritrea'},
    {value: 'ALG', viewValue: 'Algeria'},
    {value: 'NZL', viewValue: 'New-Zealand'},
    {value: 'LAT', viewValue: 'Latvia'},
    {value: 'TUR', viewValue: 'Turkey'},
    {value: 'BLR', viewValue: 'Belarus'},
    {value: 'LUX', viewValue: 'Luxembourg'},
    {value: 'UKR', viewValue: 'Ukraine'},
    {value: 'CRC', viewValue: 'Costa Rica'},
    {value: 'JAP', viewValue: 'Japan'},
    {value: 'GRE', viewValue: 'Greece'},
    {value: 'ROM', viewValue: 'Romania'},
    {value: 'HUN', viewValue: 'Hungary'},
    {value: 'MOC', viewValue: 'Morocco'}, //to check
    {value: 'ARG', viewValue: 'Argentina'},
    {value: 'BRA', viewValue: 'Brasil'},
    {value: 'CUB', viewValue: 'Cuba'},
    {value: 'CRO', viewValue: 'Croatia'},
    {value: 'VEN', viewValue: 'Venezuela'},
    {value: "LTU", viewValue: 'Lithuania'}
  ];

interface Gender {
  value: string;
  viewValue: string;
}

export const genders: Gender[] = [
    {value: 'man', viewValue: 'Man'},
    {value: 'woman', viewValue: 'Woman'},
  ];
  
interface Category {
  value: string;
  viewValue: string;
}

export const categories: Category[] = [
    {value: 'man', viewValue: 'Man Elite'},
    {value: 'woman', viewValue: 'Woman Elite'},
    {value: 'manU', viewValue: 'Man U23 (not implemented yet)'},
    {value: 'womanU', viewValue: 'Woman U23 (not implemented yet)'},   
    {value: 'manJ', viewValue: 'Man juniors (not implemented yet)'},
    {value: 'womanJ', viewValue: 'Woman juniors (not implemented yet)'},  
    {value: 'all', viewValue: 'All (not implemented yet)'},   
    {value: 'both', viewValue: 'Man and Woman Elite'},     
  ];  
  

interface RaceType {
  value: boolean;
  viewValue: string;
}
  
export const race_types: RaceType[] = [
    {value: false, viewValue: 'Single day race'},
    {value: true, viewValue: 'Stage race'},
];

interface Yesno {
  value: boolean;
  viewValue: string;
}

export const yesnos: Yesno[] = [
{value: true, viewValue: 'yes'},
{value: false, viewValue: 'no'},
];
  
interface RaceClass {
  value: string;
  viewValue: string;
}
  
export const race_1x_classes: RaceClass[] = [
    {value: "1.HC", viewValue: 'UCI 1.HC'},
    {value: "1.1", viewValue: 'UCI 1.1'},
    {value: "1.2", viewValue: 'UCI 1.2'},
    {value: "UWT.1", viewValue: 'UWT 1'},
    {value: "WWT.1", viewValue: 'WWT 1'},
  ];
  
export const race_2x_classes: RaceClass[] = [
    {value: "2.HC", viewValue: 'UCI 2.HC'},
    {value: "2.1", viewValue: 'UCI 2.1'},
    {value: "2.2", viewValue: 'UCI 2.2'},
    {value: "UWT.2", viewValue: 'UWT 2'},
    {value: "WWT.2", viewValue: 'WWT 2'},
  ];
  
export const list_of_routines: string[] = [
    'create_rider',
    'import_classification',
    'national_all_champs',
    'national_one_champ',
    'start_list',
    'race',
    'stages',
    'team',
    'UCIranking',
    'sort_date',
    'sort_name'
]
