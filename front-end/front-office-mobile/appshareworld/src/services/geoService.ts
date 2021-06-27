import NsGeo from '../models/NsGeo';

const geocodage = async (search: string): Promise<NsGeo.IGeocodage[]> => {

    var url_params = '';

    if (search && search.length > 0) {
        const aSearch = search.trim().replace(',', '').split(' ');
        aSearch.forEach((e, i, a) => {
            if (i === a.length - 1) {
                url_params += `${e}`;
            } else {
                url_params += `${e}+`;
            }
        });
    } else {
        url_params += '000';
    }


    const url = `https://api-adresse.data.gouv.fr/search/?q=${url_params}&type=housenumber&limit=10`;

    // Call api Geocodage
    const fetchResult = await fetch(url);
    const jsonResult: NsGeo.IResultGeocodage = await fetchResult.json();

    if (!jsonResult) {
        throw Error('call api failed');
    }

    //Filter results
    const result = jsonResult.features.filter((a) => a.properties.housenumber);

    return result;

}

export const geoService = { geocodage };
