import visa from "./assets/visa.svg";
import mastercard from "./assets/mastercard.svg";

const SITE_PADDING_X = "200px";

const USER_COUNTRIES = [
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "BE", name: "Belgium" },
  { code: "CA", name: "Canada" },
  { code: "ES", name: "Spain" },
  { code: "CH", name: "Switzerland" },
  { code: "DE", name: "Germany" },
  { code: "DK", name: "Denmark" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
];

// const TRANSFER_COUNTRIES = [
//   { code: "AD", name: "Andorra" },
//   { code: "AE", name: "United Arab Emirates" },
//   { code: "AF", name: "Afghanistan" },
//   { code: "AG", name: "Antigua and Barbuda" },
//   { code: "AI", name: "Anguilla" },
//   { code: "AL", name: "Albania" },
//   { code: "AM", name: "Armenia" },
//   { code: "AN", name: "Netherlands Antilles" },
//   { code: "AO", name: "Angola" },
//   { code: "AQ", name: "Antarctica" },
//   { code: "AR", name: "Argentina" },
//   { code: "AS", name: "American Samoa" },
//   { code: "AT", name: "Austria" },
//   { code: "AU", name: "Australia" },
//   { code: "AW", name: "Aruba" },
//   { code: "AX", name: "Åland Islands" },
//   { code: "AZ", name: "Azerbaijan" },
//   { code: "BA", name: "Bosnia and Herzegovina" },
//   { code: "BB", name: "Barbados" },
//   { code: "BD", name: "Bangladesh" },
//   { code: "BE", name: "Belgium" },
//   { code: "BF", name: "Burkina Faso" },
//   { code: "BG", name: "Bulgaria" },
//   { code: "BH", name: "Bahrain" },
//   { code: "BI", name: "Burundi" },
//   { code: "BJ", name: "Benin" },
//   //   { code: "BL", name: "Saint Barthélemy" },
//   { code: "BM", name: "Bermuda" },
//   { code: "BN", name: "Brunei Darussalam" },
//   { code: "BO", name: "Bolivia" },
//   //   { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
//   { code: "BR", name: "Brazil" },
//   { code: "BS", name: "Bahamas" },
//   { code: "BT", name: "Bhutan" },
//   //   { code: "BV", name: "Bouvet Island" },
//   { code: "BW", name: "Botswana" },
//   { code: "BY", name: "Belarus" },
//   { code: "BZ", name: "Belize" },
//   { code: "CA", name: "Canada" },
//   { code: "CC", name: "Cocos (Keeling) Islands" },
//   { code: "CD", name: "Democratic Republic of Congo" },
//   { code: "CF", name: "Central African Republic" },
//   { code: "CG", name: "Congo" },
//   { code: "CH", name: "Switzerland" },
//   { code: "CI", name: "Côte D'Ivoire" },
//   { code: "CK", name: "Cook Islands" },
//   { code: "CL", name: "Chile" },
//   { code: "CM", name: "Cameroon" },
//   { code: "CN", name: "China" },
//   { code: "CO", name: "Colombia" },
//   { code: "CR", name: "Costa Rica" },
//   { code: "CU", name: "Cuba" },
//   { code: "CV", name: "Cape Verde" },
//   { code: "CW", name: "Curaçao" },
//   { code: "CX", name: "Christmas Island" },
//   { code: "CY", name: "Cyprus" },
//   { code: "CZ", name: "Czech Republic" },
//   { code: "DE", name: "Germany" },
//   { code: "DJ", name: "Djibouti" },
//   { code: "DK", name: "Denmark" },
//   { code: "DM", name: "Dominica" },
//   { code: "DO", name: "Dominican Republic" },
//   { code: "DZ", name: "Algeria" },
//   { code: "EC", name: "Ecuador" },
//   { code: "EE", name: "Estonia" },
//   { code: "EG", name: "Egypt" },
//   { code: "EH", name: "Western Sahara" },
//   { code: "ER", name: "Eritrea" },
//   { code: "ES", name: "Spain" },
//   { code: "ET", name: "Ethiopia" },
//   //   { code: "EU", name: "European Union" },
//   { code: "FI", name: "Finland" },
//   { code: "FJ", name: "Fiji" },
//   { code: "FK", name: "Falkland Islands (Malvinas)" },
//   { code: "FM", name: "Micronesia, Federated States Of" },
//   { code: "FO", name: "Faroe Islands" },
//   { code: "FR", name: "France" },
//   { code: "GA", name: "Gabon" },
//   { code: "GB", name: "United Kingdom" },
//   { code: "GD", name: "Grenada" },
//   { code: "GE", name: "Georgia" },
//   //   { code: "GF", name: "French Guiana" },
//   { code: "GG", name: "Guernsey" },
//   { code: "GH", name: "Ghana" },
//   { code: "GI", name: "Gibraltar" },
//   { code: "GL", name: "Greenland" },
//   { code: "GM", name: "Gambia" },
//   { code: "GN", name: "Guinea" },
//   { code: "GP", name: "Guadeloupe" },
//   { code: "GQ", name: "Equatorial Guinea" },
//   { code: "GR", name: "Greece" },
//   //   { code: "GS", name: "South Georgia and the South Sandwich Islands" },
//   { code: "GT", name: "Guatemala" },
//   { code: "GU", name: "Guam" },
//   { code: "GW", name: "Guinea-Bissau" },
//   { code: "GY", name: "Guyana" },
//   { code: "HK", name: "Hong Kong" },
//   //   { code: "HM", name: "Heard and McDonald Islands" },
//   { code: "HN", name: "Honduras" },
//   { code: "HR", name: "Croatia" },
//   { code: "US", name: "United States" },
// ];

const TRANSFER_COUNTRIES = [
  { code: "AD", name: "Andorra" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AF", name: "Afghanistan" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AI", name: "Anguilla" },
  { code: "AL", name: "Albania" },
  { code: "AM", name: "Armenia" },
  { code: "AN", name: "Netherlands Antilles" },
  { code: "AO", name: "Angola" },
  // { code: "AQ", name: "Antarctica" },
  { code: "AR", name: "Argentina" },
  // { code: "AS", name: "American Samoa" },
  { code: "AT", name: "Austria" },
  { code: "AU", name: "Australia" },
  { code: "AW", name: "Aruba" },
  // { code: "AX", name: "Åland Islands" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BB", name: "Barbados" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BG", name: "Bulgaria" },
  { code: "BH", name: "Bahrain" },
  { code: "BI", name: "Burundi" },
  { code: "BJ", name: "Benin" },
  // { code: "BL", name: "Saint Barthélemy" },
  { code: "BM", name: "Bermuda" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BO", name: "Bolivia" },
  // { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BR", name: "Brazil" },
  { code: "BS", name: "Bahamas" },
  { code: "BT", name: "Bhutan" },
  // { code: "BV", name: "Bouvet Island" },
  { code: "BW", name: "Botswana" },
  { code: "BY", name: "Belarus" },
  { code: "BZ", name: "Belize" },
  { code: "CA", name: "Canada" },
  // { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CD", name: "Congo, The Democratic Republic Of The" },
  { code: "CF", name: "Central African Republic" },
  // { code: "CG", name: "Congo" },
  { code: "CH", name: "Switzerland" },
  { code: "CI", name: "Côte D'Ivoire" },
  { code: "CK", name: "Cook Islands" },
  { code: "CL", name: "Chile" },
  { code: "CM", name: "Cameroon" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "CU", name: "Cuba" },
  { code: "CV", name: "Cape Verde" },
  // { code: "CW", name: "Curaçao" },
  { code: "CX", name: "Christmas Island" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DE", name: "Germany" },
  { code: "DJ", name: "Djibouti" },
  { code: "DK", name: "Denmark" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "DZ", name: "Algeria" },
  { code: "EC", name: "Ecuador" },
  { code: "EE", name: "Estonia" },
  { code: "EG", name: "Egypt" },
  // { code: "EH", name: "Western Sahara" },
  { code: "ER", name: "Eritrea" },
  { code: "ES", name: "Spain" },
  { code: "ET", name: "Ethiopia" },
  // { code: "EU", name: "European Union" },
  { code: "FI", name: "Finland" },
  { code: "FJ", name: "Fiji" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FM", name: "Micronesia, Federated States Of" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GB", name: "United Kingdom" },
  { code: "GD", name: "Grenada" },
  { code: "GE", name: "Georgia" },
  // { code: "GF", name: "French Guiana" },
  { code: "GG", name: "Guernsey" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GL", name: "Greenland" },
  { code: "GM", name: "Gambia" },
  { code: "GN", name: "Guinea" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "GR", name: "Greece" },
  // { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "GT", name: "Guatemala" },
  { code: "GU", name: "Guam" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HK", name: "Hong Kong" },
  // { code: "HM", name: "Heard and McDonald Islands" },
  { code: "HN", name: "Honduras" },
  { code: "HR", name: "Croatia" },
  { code: "HT", name: "Haiti" },
  { code: "HU", name: "Hungary" },
  { code: "IC", name: "Canary Islands" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IM", name: "Isle of Man" },
  { code: "IN", name: "India" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "IQ", name: "Iraq" },
  { code: "IR", name: "Iran, Islamic Republic Of" },
  { code: "IS", name: "Iceland" },
  { code: "IT", name: "Italy" },
  { code: "JE", name: "Jersey" },
  { code: "JM", name: "Jamaica" },
  { code: "JO", name: "Jordan" },
  { code: "JP", name: "Japan" },
  { code: "KE", name: "Kenya" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "KH", name: "Cambodia" },
  { code: "KI", name: "Kiribati" },
  { code: "KM", name: "Comoros" },
  { code: "KN", name: "Saint Kitts And Nevis" },
  { code: "KP", name: "Korea, Democratic People's Republic Of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KY", name: "Cayman Islands" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LB", name: "Lebanon" },
  { code: "LC", name: "Saint Lucia" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LK", name: "Sri Lanka" },
  { code: "LR", name: "Liberia" },
  { code: "LS", name: "Lesotho" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "LV", name: "Latvia" },
  { code: "LY", name: "Libya" },
  { code: "MA", name: "Morocco" },
  { code: "MC", name: "Monaco" },
  { code: "MD", name: "Moldova, Republic of" },
  { code: "ME", name: "Montenegro" },
  { code: "MF", name: "Saint Martin" },
  { code: "MG", name: "Madagascar" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MK", name: "Macedonia, the Former Yugoslav Republic Of" },
  { code: "ML", name: "Mali" },
  { code: "MM", name: "Myanmar" },
  { code: "MN", name: "Mongolia" },
  { code: "MO", name: "Macao" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MS", name: "Montserrat" },
  { code: "MT", name: "Malta" },
  { code: "MU", name: "Mauritius" },
  { code: "MV", name: "Maldives" },
  { code: "MW", name: "Malawi" },
  { code: "MX", name: "Mexico" },
  { code: "MY", name: "Malaysia" },
  { code: "MZ", name: "Mozambique" },
  { code: "NA", name: "Namibia" },
  { code: "NC", name: "New Caledonia" },
  { code: "NE", name: "Niger" },
  { code: "NF", name: "Norfolk Island" },
  { code: "NG", name: "Nigeria" },
  { code: "NI", name: "Nicaragua" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "NP", name: "Nepal" },
  { code: "NR", name: "Nauru" },
  { code: "NU", name: "Niue" },
  { code: "NZ", name: "New Zealand" },
  { code: "OM", name: "Oman" },
  { code: "PA", name: "Panama" },
  { code: "PE", name: "Peru" },
  { code: "PF", name: "French Polynesia" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "PL", name: "Poland" },
  { code: "PM", name: "Saint Pierre And Miquelon" },
  { code: "PN", name: "Pitcairn" },
  { code: "PR", name: "Puerto Rico" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PT", name: "Portugal" },
  { code: "PW", name: "Palau" },
  { code: "PY", name: "Paraguay" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SC", name: "Seychelles" },
  { code: "SD", name: "Sudan" },
  { code: "SE", name: "Sweden" },
  { code: "SG", name: "Singapore" },
  { code: "SH", name: "Saint Helena" },
  { code: "SI", name: "Slovenia" },
  { code: "SJ", name: "Svalbard And Jan Mayen" },
  { code: "SK", name: "Slovakia" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SM", name: "San Marino" },
  { code: "SN", name: "Senegal" },
  { code: "SO", name: "Somalia" },
  { code: "SR", name: "Suriname" },
  { code: "SS", name: "South Sudan" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SV", name: "El Salvador" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "SZ", name: "Eswatini" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TD", name: "Chad" },
  { code: "TF", name: "French Southern Territories" },
  { code: "TG", name: "Togo" },
  { code: "TH", name: "Thailand" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TK", name: "Tokelau" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TN", name: "Tunisia" },
  { code: "TO", name: "Tonga" },
  { code: "TR", name: "Turkey" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TV", name: "Tuvalu" },
  { code: "TW", name: "Taiwan, Province Of China" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "UA", name: "Ukraine" },
  { code: "UG", name: "Uganda" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VA", name: "Holy See (Vatican City State)" },
  { code: "VC", name: "Saint Vincent And The Grenadines" },
  { code: "VE", name: "Venezuela, Bolivarian Republic of" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "VN", name: "Vietnam" },
  { code: "VU", name: "Vanuatu" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "WS", name: "Samoa" },
  { code: "YE", name: "Yemen" },
  { code: "YT", name: "Mayotte" },
  { code: "ZA", name: "South Africa" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
];

const CURRENCIES = {
  AD: { code: "EUR", name: "Euro" },
  AE: { code: "AED", name: "United Arab Emirates Dirham" },
  AF: { code: "AFN", name: "Afghan Afghani" },
  AG: { code: "XCD", name: "East Caribbean Dollar" },
  AI: { code: "XCD", name: "East Caribbean Dollar" },
  AL: { code: "ALL", name: "Albanian Lek" },
  AM: { code: "AMD", name: "Armenian Dram" },
  AN: { code: "ANG", name: "Netherlands Antillean Guilder" },
  AO: { code: "AOA", name: "Angolan Kwanza" },
  // AQ: { code: "None", name: "No Matching Currency" },
  AR: { code: "ARS", name: "Argentine Peso" },
  // AS: { code: "None", name: "No Matching Currency" },
  AT: { code: "EUR", name: "Euro" },
  AU: { code: "AUD", name: "Australian Dollar" },
  AW: { code: "AWG", name: "Aruban Florin" },
  // AX: { code: "None", name: "No Matching Currency" },
  AZ: { code: "AZN", name: "Azerbaijani Manat" },
  BA: { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
  BB: { code: "BBD", name: "Barbadian Dollar" },
  BD: { code: "BDT", name: "Bangladeshi Taka" },
  BE: { code: "EUR", name: "Euro" },
  BF: { code: "XOF", name: "CFA Franc BCEAO" },
  BG: { code: "BGN", name: "Bulgarian Lev" },
  BH: { code: "BHD", name: "Bahraini Dinar" },
  BI: { code: "BIF", name: "Burundian Franc" },
  BJ: { code: "XOF", name: "CFA Franc BCEAO" },
  // BL: { code: "None", name: "No Matching Currency" },
  BM: { code: "BMD", name: "Bermudan Dollar" },
  BN: { code: "BND", name: "Brunei Dollar" },
  BO: { code: "BOB", name: "Bolivian Boliviano" },
  // BQ: { code: "None", name: "No Matching Currency" },
  BR: { code: "BRL", name: "Brazilian Real" },
  BS: { code: "BSD", name: "Bahamian Dollar" },
  BT: { code: "BTN", name: "Bhutanese Ngultrum" },
  // BV: { code: "None", name: "No Matching Currency" },
  BW: { code: "BWP", name: "Botswanan Pula" },
  BY: { code: "BYN", name: "New Belarusian Ruble" },
  BZ: { code: "BZD", name: "Belize Dollar" },
  CA: { code: "CAD", name: "Canadian Dollar" },
  // CC: { code: "None", name: "No Matching Currency" },
  CD: { code: "CDF", name: "Congolese Franc" },
  CF: { code: "XAF", name: "CFA Franc BEAC" },
  // CG: { code: "None", name: "No Matching Currency" },
  CH: { code: "CHF", name: "Swiss Franc" },
  CI: { code: "XOF", name: "CFA Franc BCEAO" },
  CK: { code: "NZD", name: "New Zealand Dollar" },
  CL: { code: "CLP", name: "Chilean Peso" },
  CM: { code: "XAF", name: "CFA Franc BEAC" },
  CN: { code: "CNY", name: "Chinese Yuan" },
  CO: { code: "COP", name: "Colombian Peso" },
  CR: { code: "CRC", name: "Costa Rican Colón" },
  CU: { code: "CUP", name: "Cuban Peso" },
  CV: { code: "CVE", name: "Cape Verdean Escudo" },
  // CW: { code: "None", name: "No Matching Currency" },
  CX: { code: "AUD", name: "Australian Dollar" },
  CY: { code: "EUR", name: "Euro" },
  CZ: { code: "CZK", name: "Czech Republic Koruna" },
  DE: { code: "EUR", name: "Euro" },
  DJ: { code: "DJF", name: "Djiboutian Franc" },
  DK: { code: "DKK", name: "Danish Krone" },
  DM: { code: "XCD", name: "East Caribbean Dollar" },
  DO: { code: "DOP", name: "Dominican Peso" },
  DZ: { code: "DZD", name: "Algerian Dinar" },
  EC: { code: "USD", name: "United States Dollar" },
  EE: { code: "EUR", name: "Euro" },
  EG: { code: "EGP", name: "Egyptian Pound" },
  // EH: { code: "None", name: "No Matching Currency" },
  ER: { code: "ERN", name: "Eritrean Nakfa" },
  ES: { code: "EUR", name: "Euro" },
  ET: { code: "ETB", name: "Ethiopian Birr" },
  EU: { code: "EUR", name: "Euro" },
  FI: { code: "EUR", name: "Euro" },
  FJ: { code: "FJD", name: "Fijian Dollar" },
  FK: { code: "FKP", name: "Falkland Islands Pound" },
  FM: { code: "USD", name: "United States Dollar" },
  FO: { code: "DKK", name: "Danish Krone" },
  GA: { code: "XAF", name: "CFA Franc BEAC" },
  GB: { code: "GBP", name: "British Pound Sterling" },
  GD: { code: "XCD", name: "East Caribbean Dollar" },
  GE: { code: "GEL", name: "Georgian Lari" },
  GF: { code: "EUR", name: "Euro" },
  GG: { code: "GGP", name: "Guernsey Pound" },
  GH: { code: "GHS", name: "Ghanaian Cedi" },
  GI: { code: "GIP", name: "Gibraltar Pound" },
  GL: { code: "DKK", name: "Danish Krone" },
  GM: { code: "GMD", name: "Gambian Dalasi" },
  GN: { code: "GNF", name: "Guinean Franc" },
  GP: { code: "EUR", name: "Euro" },
  GQ: { code: "XAF", name: "CFA Franc BEAC" },
  GR: { code: "EUR", name: "Euro" },
  // GS: { code: null, name: "South Georgia and the South Sandwich Islands" },
  GT: { code: "GTQ", name: "Guatemalan Quetzal" },
  GU: { code: "USD", name: "United States Dollar" },
  GW: { code: "XOF", name: "CFA Franc BCEAO" },
  GY: { code: "GYD", name: "Guyanaese Dollar" },
  HK: { code: "HKD", name: "Hong Kong Dollar" },
  // HM: { code: null, name: "Heard and McDonald Islands" },
  HN: { code: "HNL", name: "Honduran Lempira" },
  HR: { code: "HRK", name: "Croatian Kuna" },
  HT: { code: "HTG", name: "Haitian Gourde" },
  HU: { code: "HUF", name: "Hungarian Forint" },
  IC: { code: "EUR", name: "Euro" },
  ID: { code: "IDR", name: "Indonesian Rupiah" },
  IE: { code: "EUR", name: "Euro" },
  IL: { code: "ILS", name: "Israeli New Shekel" },
  IM: { code: "GBP", name: "British Pound Sterling" },
  IN: { code: "INR", name: "Indian Rupee" },
  IO: { code: "USD", name: "United States Dollar" },
  IQ: { code: "IQD", name: "Iraqi Dinar" },
  IR: { code: "IRR", name: "Iranian Rial" },
  IS: { code: "ISK", name: "Icelandic Króna" },
  IT: { code: "EUR", name: "Euro" },
  JE: { code: "GBP", name: "British Pound Sterling" },
  JM: { code: "JMD", name: "Jamaican Dollar" },
  JO: { code: "JOD", name: "Jordanian Dinar" },
  JP: { code: "JPY", name: "Japanese Yen" },
  KE: { code: "KES", name: "Kenyan Shilling" },
  KG: { code: "KGS", name: "Kyrgyzstani Som" },
  KH: { code: "KHR", name: "Cambodian Riel" },
  KI: { code: "AUD", name: "Australian Dollar" },
  KM: { code: "KMF", name: "Comorian Franc" },
  KN: { code: "XCD", name: "East Caribbean Dollar" },
  KP: { code: "KPW", name: "North Korean Won" },
  KR: { code: "KRW", name: "South Korean Won" },
  KW: { code: "KWD", name: "Kuwaiti Dinar" },
  KY: { code: "KYD", name: "Cayman Islands Dollar" },
  KZ: { code: "KZT", name: "Kazakhstani Tenge" },
  LA: { code: "LAK", name: "Laotian Kip" },
  LB: { code: "LBP", name: "Lebanese Pound" },
  LC: { code: "XCD", name: "East Caribbean Dollar" },
  LI: { code: "CHF", name: "Swiss Franc" },
  LK: { code: "LKR", name: "Sri Lankan Rupee" },
  LR: { code: "LRD", name: "Liberian Dollar" },
  LS: { code: "LSL", name: "Lesotho Loti" },
  LT: { code: "EUR", name: "Euro" },
  LU: { code: "EUR", name: "Euro" },
  LV: { code: "EUR", name: "Euro" },
  LY: { code: "LYD", name: "Libyan Dinar" },
  MA: { code: "MAD", name: "Moroccan Dirham" },
  MC: { code: "EUR", name: "Euro" },
  MD: { code: "MDL", name: "Moldovan Leu" },
  ME: { code: "EUR", name: "Euro" },
  MF: { code: "EUR", name: "Euro" },
  MG: { code: "MGA", name: "Malagasy Ariary" },
  MH: { code: "USD", name: "United States Dollar" },
  MK: { code: "MKD", name: "Macedonian Denar" },
  ML: { code: "XOF", name: "CFA Franc BCEAO" },
  MM: { code: "MMK", name: "Myanmar Kyat" },
  MN: { code: "MNT", name: "Mongolian Tugrik" },
  MO: { code: "MOP", name: "Macanese Pataca" },
  MP: { code: "USD", name: "United States Dollar" },
  MQ: { code: "EUR", name: "Euro" },
  MR: { code: "MRU", name: "Mauritanian Ouguiya" },
  MS: { code: "XCD", name: "East Caribbean Dollar" },
  MT: { code: "EUR", name: "Euro" },
  MU: { code: "MUR", name: "Mauritian Rupee" },
  MV: { code: "MVR", name: "Maldivian Rufiyaa" },
  MW: { code: "MWK", name: "Malawian Kwacha" },
  MX: { code: "MXN", name: "Mexican Peso" },
  MY: { code: "MYR", name: "Malaysian Ringgit" },
  MZ: { code: "MZN", name: "Mozambican Metical" },
  NA: { code: "NAD", name: "Namibian Dollar" },
  NC: { code: "XPF", name: "CFP Franc" },
  NE: { code: "XOF", name: "CFA Franc BCEAO" },
  NF: { code: "AUD", name: "Australian Dollar" },
  NG: { code: "NGN", name: "Nigerian Naira" },
  NI: { code: "NIO", name: "Nicaraguan Córdoba" },
  NL: { code: "EUR", name: "Euro" },
  NO: { code: "NOK", name: "Norwegian Krone" },
  NP: { code: "NPR", name: "Nepalese Rupee" },
  NR: { code: "AUD", name: "Australian Dollar" },
  NU: { code: "NZD", name: "New Zealand Dollar" },
  NZ: { code: "NZD", name: "New Zealand Dollar" },
  OM: { code: "OMR", name: "Omani Rial" },
  PA: { code: "PAB", name: "Panamanian Balboa" },
  PE: { code: "PEN", name: "Peruvian Nuevo Sol" },
  PF: { code: "XPF", name: "CFP Franc" },
  PG: { code: "PGK", name: "Papua New Guinean Kina" },
  PH: { code: "PHP", name: "Philippine Peso" },
  PK: { code: "PKR", name: "Pakistani Rupee" },
  PL: { code: "PLN", name: "Polish Złoty" },
  PM: { code: "EUR", name: "Euro" },
  PN: { code: "NZD", name: "New Zealand Dollar" },
  PR: { code: "USD", name: "United States Dollar" },
  PS: { code: "ILS", name: "Israeli New Shekel" },
  PT: { code: "EUR", name: "Euro" },
  PW: { code: "USD", name: "United States Dollar" },
  PY: { code: "PYG", name: "Paraguayan Guarani" },
  QA: { code: "QAR", name: "Qatari Rial" },
  RE: { code: "EUR", name: "Euro" },
  RO: { code: "RON", name: "Romanian Leu" },
  RS: { code: "RSD", name: "Serbian Dinar" },
  RU: { code: "RUB", name: "Russian Ruble" },
  RW: { code: "RWF", name: "Rwandan Franc" },
  SA: { code: "SAR", name: "Saudi Riyal" },
  SB: { code: "SBD", name: "Solomon Islands Dollar" },
  SC: { code: "SCR", name: "Seychellois Rupee" },
  SD: { code: "SDG", name: "Sudanese Pound" },
  SE: { code: "SEK", name: "Swedish Krona" },
  SG: { code: "SGD", name: "Singapore Dollar" },
  SH: { code: "SHP", name: "Saint Helena Pound" },
  SI: { code: "EUR", name: "Euro" },
  SJ: { code: "NOK", name: "Norwegian Krone" },
  SK: { code: "EUR", name: "Euro" },
  SL: { code: "SLL", name: "Sierra Leonean Leone" },
  SM: { code: "EUR", name: "Euro" },
  SN: { code: "XOF", name: "CFA Franc BCEAO" },
  SO: { code: "SOS", name: "Somali Shilling" },
  SR: { code: "SRD", name: "Surinamese Dollar" },
  SS: { code: "SSP", name: "South Sudanese Pound" },
  ST: { code: "STN", name: "São Tomé and Príncipe Dobra" },
  SV: { code: "USD", name: "United States Dollar" },
  SX: { code: "ANG", name: "Netherlands Antillean Guilder" },
  SY: { code: "SYP", name: "Syrian Pound" },
  SZ: { code: "SZL", name: "Swazi Lilangeni" },
  TC: { code: "USD", name: "United States Dollar" },
  TD: { code: "XAF", name: "CFA Franc BEAC" },
  TF: { code: "EUR", name: "Euro" },
  TG: { code: "XOF", name: "CFA Franc BCEAO" },
  TH: { code: "THB", name: "Thai Baht" },
  TJ: { code: "TJS", name: "Tajikistani Somoni" },
  TK: { code: "NZD", name: "New Zealand Dollar" },
  TL: { code: "USD", name: "United States Dollar" },
  TM: { code: "TMT", name: "Turkmenistani Manat" },
  TN: { code: "TND", name: "Tunisian Dinar" },
  TO: { code: "TOP", name: "Tongan Pa'anga" },
  TR: { code: "TRY", name: "Turkish Lira" },
  TT: { code: "TTD", name: "Trinidad and Tobago Dollar" },
  TV: { code: "AUD", name: "Australian Dollar" },
  TW: { code: "TWD", name: "New Taiwan Dollar" },
  TZ: { code: "TZS", name: "Tanzanian Shilling" },
  UA: { code: "UAH", name: "Ukrainian Hryvnia" },
  UG: { code: "UGX", name: "Ugandan Shilling" },
  UM: { code: "USD", name: "United States Dollar" },
  US: { code: "USD", name: "United States Dollar" },
  UY: { code: "UYU", name: "Uruguayan Peso" },
  UZ: { code: "UZS", name: "Uzbekistan Som" },
  VA: { code: "EUR", name: "Euro" },
  VC: { code: "XCD", name: "East Caribbean Dollar" },
  VE: { code: "VES", name: "Venezuelan Bolívar" },
  VG: { code: "USD", name: "United States Dollar" },
  VI: { code: "USD", name: "United States Dollar" },
  VN: { code: "VND", name: "Vietnamese Đồng" },
  VU: { code: "VUV", name: "Vanuatu Vatu" },
  WF: { code: "XPF", name: "CFP Franc" },
  WS: { code: "WST", name: "Samoan Tala" },
  YE: { code: "YER", name: "Yemeni Rial" },
  YT: { code: "EUR", name: "Euro" },
  ZA: { code: "ZAR", name: "South African Rand" },
  ZM: { code: "ZMW", name: "Zambian Kwacha" },
  ZW: { code: "ZWL", name: "Zimbabwean Dollar" },
};

const THIRD_PARTY_CHARGES = {
  card: 0.03,
  bankAccount: 0.015,
};

const CARD_BRAND_IMG = {
  visa,
  mastercard,
};

export {
  SITE_PADDING_X,
  USER_COUNTRIES,
  TRANSFER_COUNTRIES,
  LANGUAGES,
  CURRENCIES,
  THIRD_PARTY_CHARGES,
  CARD_BRAND_IMG,
};
