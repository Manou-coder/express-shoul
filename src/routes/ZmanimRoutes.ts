import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { Request, Response } from 'express'

import UserService from '@src/services/UserService'
import { IUser } from '@src/models/User'
import { IReq, IRes } from './types/express/misc'
import ZmanimService from '@src/services/ZmanimService'
import { Options } from 'kosher-zmanim'
import { getZmaneiAyom } from '@src/lib/kosher-zmanim'
import { TimezoneId } from '@src/types/kosher-zmanim'

// **** Functions **** //

/**
 * Get all zmanim.
 */
function getAll(req: Request, res: Response) {
  const {
    date: dt,
    locationName: locName,
    latitude: lat,
    longitude: long,
    timeZoneId: tzId,
    elevation: elev,
    complexZmanim: cplxZman,
  } = req.query
  console.log('req.query: ', req.query)
  if (!req.query || !lat || !long || !tzId) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Missing required query parameters' })
  }
  const locationName = typeof locName === 'string' ? locName : ''
  const latitude = typeof lat === 'string' ? Number(lat) : null
  const longitude = typeof long === 'string' ? Number(long) : null
  const elevation = typeof elev === 'string' ? Number(elev) : undefined
  const complexZmanim = cplxZman === 'false' ? false : Boolean(cplxZman)
  const timeZoneId =
    typeof tzId === 'string' && timeZoneIdList.includes(tzId) ? tzId : ''
  if (latitude === null || longitude === null || elevation === null) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Type errors with query parameters hello' })
  }

  console.log('complexZmanim: ', complexZmanim)
  const zmanim = getZmaneiAyom({
    date: dt,
    locationName,
    longitude,
    latitude,
    timeZoneId,
    elevation,
    complexZmanim,
  })
  return res.status(HttpStatusCodes.OK).json({ zmanim })
}

// /**
//  * Get all users.
//  */
// async function getAll(_: IReq, res: IRes) {
//   const users = await UserService.getAll();
//   return res.status(HttpStatusCodes.OK).json({ users });
// }

/**
 * Add one user.
 */
async function add(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body
  await UserService.addOne(user)
  return res.status(HttpStatusCodes.CREATED).end()
}

/**
 * Update one user.
 */
async function update(req: IReq<{ user: IUser }>, res: IRes) {
  const { user } = req.body
  await UserService.updateOne(user)
  return res.status(HttpStatusCodes.OK).end()
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id
  await UserService.delete(id)
  return res.status(HttpStatusCodes.OK).end()
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const

export const timeZoneIdList: string[] = [
  'America/Tijuana',
  'America/Vancouver',
  'Pacific/Pitcairn',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Edmonton',
  'America/Mazatlan',
  'America/Phoenix',
  'America/Belize',
  'America/Chicago',
  'America/Costa_Rica',
  'America/El_Salvador',
  'America/Guatemala',
  'America/Managua',
  'America/Mexico_City',
  'America/Regina',
  'America/Tegucigalpa',
  'America/Winnipeg',
  'Pacific/Easter',
  'Pacific/Galapagos',
  'America/Bogota',
  'America/Cayman',
  'America/Grand_Turk',
  'America/Guayaquil',
  'America/Havana',
  'America/Indianapolis',
  'America/Jamaica',
  'America/Lima',
  'America/Montreal',
  'America/Nassau',
  'America/New_York',
  'America/Panama',
  'America/Port-au-Prince',
  'America/Porto_Acre',
  'America/Rio_Branco',
  'America/Anguilla',
  'America/Antigua',
  'America/Aruba',
  'America/Asuncion',
  'America/Barbados',
  'America/Caracas',
  'America/Cuiaba',
  'America/Curacao',
  'America/Dominica',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guyana',
  'America/Halifax',
  'America/La_Paz',
  'America/Manaus',
  'America/Martinique',
  'America/Montserrat',
  'America/Port_of_Spain',
  'America/Puerto_Rico',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Thule',
  'America/Tortola',
  'Antarctica/Palmer',
  'Atlantic/Bermuda',
  'Atlantic/Stanley',
  'America/St_Johns',
  'America/Buenos_Aires',
  'America/Cayenne',
  'America/Fortaleza',
  'America/Godthab',
  'America/Miquelon',
  'America/Montevideo',
  'America/Paramaribo',
  'America/Sao_Paulo',
  'America/Noronha',
  'Atlantic/South_Georgia',
  'America/Scoresbysund',
  'Atlantic/Azores',
  'Atlantic/Cape_Verde',
  'Atlantic/Jan_Mayen',
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Casablanca',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Freetown',
  'Africa/Lome',
  'Africa/Monrovia',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Sao_Tome',
  'Africa/Timbuktu',
  'Atlantic/Canary',
  'Atlantic/Faeroe',
  'Atlantic/Reykjavik',
  'Atlantic/St_Helena',
  'Europe/Dublin',
  'Europe/Lisbon',
  'Europe/London',
  'Africa/Algiers',
  'Africa/Bangui',
  'Africa/Douala',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Luanda',
  'Africa/Malabo',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Porto-Novo',
  'Africa/Tunis',
  'Africa/Windhoek',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Brussels',
  'Europe/Budapest',
  'Europe/Copenhagen',
  'Europe/Gibraltar',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Monaco',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Prague',
  'Europe/Rome',
  'Europe/Stockholm',
  'Europe/Tirane',
  'Europe/Vaduz',
  'Europe/Vienna',
  'Europe/Warsaw',
  'Europe/Zurich',
  'Africa/Blantyre',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Kigali',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Tripoli',
  'Asia/Amman',
  'Asia/Beirut',
  'Asia/Damascus',
  'Asia/Jerusalem',
  'Asia/Nicosia',
  'Europe/Athens',
  'Europe/Bucharest',
  'Europe/Chisinau',
  'Europe/Helsinki',
  'Europe/Istanbul',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Minsk',
  'Europe/Riga',
  'Europe/Simferopol',
  'Europe/Sofia',
  'Europe/Tallinn',
  'Europe/Vilnius',
  'Africa/Addis_Ababa',
  'Africa/Asmera',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Mogadishu',
  'Africa/Nairobi',
  'Asia/Aden',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Kuwait',
  'Asia/Qatar',
  'Asia/Riyadh',
  'Europe/Moscow',
  'Indian/Antananarivo',
  'Indian/Comoro',
  'Indian/Mayotte',
  'Asia/Tehran',
  'Asia/Aqtau',
  'Asia/Baku',
  'Asia/Dubai',
  'Asia/Muscat',
  'Asia/Tbilisi',
  'Asia/Yerevan',
  'Europe/Samara',
  'Indian/Mahe',
  'Indian/Mauritius',
  'Indian/Reunion',
  'Asia/Kabul',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Ashkhabad',
  'Asia/Bishkek',
  'Asia/Dushanbe',
  'Asia/Karachi',
  'Asia/Tashkent',
  'Asia/Yekaterinburg',
  'Indian/Chagos',
  'Indian/Kerguelen',
  'Indian/Maldives',
  'Asia/Calcutta',
  'Asia/Katmandu',
  'Antarctica/Mawson',
  'Asia/Almaty',
  'Asia/Colombo',
  'Asia/Dacca',
  'Asia/Dhaka',
  'Asia/Novosibirsk',
  'Asia/Thimbu',
  'Asia/Thimphu',
  'Asia/Rangoon',
  'Indian/Cocos',
  'Asia/Bangkok',
  'Asia/Jakarta',
  'Asia/Krasnoyarsk',
  'Asia/Phnom_Penh',
  'Asia/Saigon',
  'Asia/Vientiane',
  'Indian/Christmas',
  'Antarctica/Casey',
  'Asia/Brunei',
  'Asia/Hong_Kong',
  'Asia/Irkutsk',
  'Asia/Kuala_Lumpur',
  'Asia/Macao',
  'Asia/Manila',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Taipei',
  'Asia/Ujung_Pandang',
  'Asia/Ulaanbaatar',
  'Asia/Ulan_Bator',
  'Australia/Perth',
  'Asia/Jayapura',
  'Asia/Pyongyang',
  'Asia/Seoul',
  'Asia/Tokyo',
  'Asia/Yakutsk',
  'Pacific/Palau',
  'Australia/Adelaide',
  'Australia/Broken_Hill',
  'Australia/Darwin',
  'Antarctica/DumontDUrville',
  'Asia/Vladivostok',
  'Australia/Brisbane',
  'Australia/Hobart',
  'Australia/Sydney',
  'Pacific/Guam',
  'Pacific/Port_Moresby',
  'Pacific/Saipan',
  'Pacific/Truk',
  'Australia/Lord_Howe',
  'Asia/Magadan',
  'Pacific/Efate',
  'Pacific/Guadalcanal',
  'Pacific/Kosrae',
  'Pacific/Noumea',
  'Pacific/Ponape',
  'Pacific/Norfolk',
  'Antarctica/McMurdo',
  'Asia/Anadyr',
  'Asia/Kamchatka',
  'Pacific/Auckland',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Majuro',
  'Pacific/Nauru',
  'Pacific/Tarawa',
  'Pacific/Wake',
  'Pacific/Wallis',
  'Pacific/Chatham',
  'Pacific/Enderbury',
  'Pacific/Tongatapu',
  'Pacific/Kiritimati',
]
