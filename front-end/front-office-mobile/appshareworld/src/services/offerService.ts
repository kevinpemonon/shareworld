import NsOffer from '../models/NsOffer';
import config from "./../config.json";


const getOffers = async (params: NsOffer.IOfferConditionsParams): Promise<NsOffer.IOfferResult> => {


    const { search, latitude, longitude, distance, days, page_size, page_number, category, state, sort_by } = params;

    var url_params = '';

    if (search) {
        url_params += `search=${search}&`;
    }
    if (category) {
        url_params += `category=${category}&`;
    }
    if (state && state?.length > 0) {
        state.forEach(e => {
            url_params += `state[]=${e}&`;
        });
    }
    if (latitude && longitude && distance) {
        url_params += `latitude=${latitude}&longitude=${longitude}&distance=${distance}&`;
    }
    if (days) {
        url_params += `days=${days}&`;
    }

    if (page_size && page_number) {
        url_params += `page_size=${page_size}&page_number=${page_number}&`;
    }

    if (sort_by) {
        url_params += `sort_by=${sort_by}`;
    }
    // const url = `http://${config.ip}:${config.port}/offers/search?${url_params}`;
    const url = `http://localhost:3333/offers/search?${url_params}`;

    const fetchResult = await fetch(url);
    const jsonResult: NsOffer.IOfferResult = await fetchResult.json();

    if (!jsonResult) {
        throw Error('call api failed');
    }

    return jsonResult;

}

const postOffer = async (params: NsOffer.IOfferDataIn): Promise<Object> => {

    const { label,
        description,
        display_phone,
        display_mail,
        state,
        exchange_address,
        images,
        is_owner_address,
        category,
        owner
    } = params;

    const formData = new FormData();

    formData.append('label', label);
    formData.append('description', description);
    formData.append('display_phone', display_phone.toString());
    formData.append('display_mail', display_mail.toString());
    formData.append('state', state);
    formData.append('category_id', category.toString());
    formData.append('is_owner_address', is_owner_address.toString());
    formData.append('owner_id', owner.toString());
    formData.append('exchange_address', JSON.stringify(exchange_address));

    //Convert String to blob
    const resultsImages = await Promise.all(

        images.map(async (img) => {

            var base64Response = await fetch(img);
            var blob = await base64Response.blob();
            formData.append('images', blob);
        })

    );

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    const url = `http://localhost:3333/offers`;

    const fetchResult = await fetch(url, requestOptions);
    const jsonResult = await fetchResult.json();

    if (!jsonResult) {
        throw Error('call api failed');
    }

    return jsonResult;

}
export const offerService = { getOffers, postOffer };
