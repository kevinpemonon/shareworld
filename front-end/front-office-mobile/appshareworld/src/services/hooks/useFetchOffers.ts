/* import NsOffer from '../../models/NsOffer';

export function useFetchOffers<Data = NsOffer.IOfferResult, Error = any>(params: NsOffer.IOfferConditionsParams) {


    const { latitude, longitude, distance, days, page_size, page_number, sort_by } = params;

    var url_params = '';

    if (latitude && longitude && distance) {
        url_params += `latitude=${latitude}&longitude=${longitude}&distance=${distance}`;
    }
    if (days) {
        url_params += `&days=${days}`;
    }

    if (page_size && page_number) {
        url_params += `&page_size=${page_size}&page_number=${page_number}`;
    }

    if (sort_by) {
        url_params += `&sort_by=${sort_by}`;
    }
    const url = `http://localhost:3333/offers/search?${url_params}`;

    const url = `http://192.168.1.140:3333/offers/search?${url_params}`;

    const { data, error } = useSWR<Data, Error>(url, async (url) => {

        const fetchResult = await fetch(url);
        const jsonResult = await fetchResult.json();
        return jsonResult;
    });



    return { data, error };
} */