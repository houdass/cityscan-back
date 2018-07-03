import request from 'request-promise';
import cheerio from 'cheerio';
import userAgentGenerator from 'user-agent-string-generator';
import { isEmpty, round } from 'lodash';

// Set data from seloger info formatted data.
export const setData = (data, images, hrefs) => {
  let index = 0;
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
      item.pricePerSquareMeter = round(parseFloat(product.prix)/parseFloat(product.surface), 2);
    }
    item.image = images && images[index] && JSON.parse(images[index]).url;
    item.href = hrefs && hrefs[index];
    index++;
    return item;
  });
  return products;
};

// Algo for scraping seloger.
export const scrap = (url, qs) => {
  const userAgent = userAgentGenerator();
  const headers = {
    'User-Agent': userAgent
  };

  return request({ url, qs, headers }).then((html) => {
    const $ = cheerio.load(html);
    let jsonObj;
    const script = $('script').toArray().find((script) => $(script).html().indexOf('var ava_data = ') > -1);
    if (script) {
      let text = $(script).html();

      const hrefs = [];
      $('div.slideContent').each(function() {
        hrefs.push($(this).children('a').attr('href'));
      });

      const images = [];
      $('div.slideContent').each(function() {
        images.push($(this).find('div[data-lazy]').attr('data-lazy'));
      });

      text = text.split('ar ava_data = ')[1].trim();
      text = text.split('ava_data.logged ')[0].trim();

      jsonObj = text.substring(0, text.length - 1);
      // const regex = /\,(?!\s*?[\{\[\"\'\w])/g;
      const regex = /,(?!\s*?[{["'\w])/g;
      jsonObj = jsonObj.replace(regex, ''); // remove all trailing commas
      const result = JSON.parse(jsonObj).products;
      const products = setData(result, images, hrefs);
      return { products };
    }
  });
};

// Get the last page number of seloger page.
export const getLastPage = ($) => {
  const paginationBloc2 = $('.pagination-bloc2').text().trim();
  if (paginationBloc2 === '') {
    const anchor = $('.pagination-number a[href*="LISTING-LISTpg="]').last();
    return anchor.text();
  } else {
    const anchor = $('.pagination-bloc2 a[href*="LISTING-LISTpg="]').last();
    return anchor.text().replace('+', '');
  }
};
