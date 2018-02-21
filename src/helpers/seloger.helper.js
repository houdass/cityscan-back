import request from 'request-promise';
import cheerio from 'cheerio';
import { isEmpty } from 'lodash';

// Set data from seloger info formatted data.
export const setData = (data) => {
  const products = data.map((product) => {
    const item = {};
    item.price = product.prix;
    item.size = product.surface;
    item.zipcode = product.codepostal;
    item.productType = product.typedebien;
    item.transactionType = !isEmpty(product.typedetransaction) && product.typedetransaction[0];
    item.heatingType = product.idtypechauffage;
    item.kitchenType = product.idtypecuisine;
    item.hasBalcony = !!product.si_balcon;
    item.nbBedrooms = product.nb_chambres;
    item.nbRooms = product.nb_pieces;
    item.hasBathroom = !!product.si_sdEau;
    item.hasShoweroom = !!product.si_sdbain;
    item.floor = !!product.etage;
    if (product.surface && product.surface != 0 && product.prix && product.prix != 0) {
      item.pricePerSquareMeter = parseFloat(product.prix)/parseFloat(product.surface);
    }
    return item;
  });
  return products;
};

// Algo for scraping seloger.
export const scrap = (url, qs, headers) => request({ url, qs, headers }).then((html) => {
  const $ = cheerio.load(html);
  let jsonObj;
  const script = $('script').toArray().find((script) => $(script).html().indexOf('var ava_data = ') > -1);
  if (script) {
    let text = $(script).html();
    text = text.split('ar ava_data = ')[1].trim();
    text = text.split('ava_data.logged ')[0].trim();

    jsonObj = text.substring(0, text.length - 1);
    // const regex = /\,(?!\s*?[\{\[\"\'\w])/g;
    const regex = /,(?!\s*?[{["'\w])/g;
    jsonObj = jsonObj.replace(regex, ''); // remove all trailing commas
    const result = JSON.parse(jsonObj).products;
    const products = setData(result);
    return { products };
  }
});
