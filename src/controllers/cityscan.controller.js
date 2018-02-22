import request from 'request-promise';
import cheerio from 'cheerio';
import ejs from 'ejs';
import fs from 'fs';
// import i18n from 'i18n';
import { setData, scrap } from '../helpers/seloger.helper';

const cityscanController = () => {
  // Get Places
  const getPlaces = (req, res) => {
    /* i18n.setLocale(req.query.city);
    console.log('=>', i18n.__('common.title')); */
    const text = req.query.city;
    request
    .get({
      url: `http://autocomplete.svc.groupe-seloger.com/auto/complete/0/ALL/6?text=${text}`,
      json: true
    }, (error, response) => {
      if (!error && response.statusCode == 200) {
        res.status(201).json(response.body);
      }
    });
  };

  const analyze = (req, res) => {
    let qs;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    };

    // TODO : refacto
    if (req.body.cp) {
      qs = { cp: req.body.cp };
    } else if (req.body.ci) {
      qs = { ci: req.body.ci };
    } else {
      qs = { idq: req.body.idq };
    }
    qs.idtypebien = req.body.productTypeId;
    const url = 'http://www.seloger.com/list.htm?tri=initial&idtt=2&naturebien=1,2,4';
    request({ url, qs, headers }).then((html) => {
      // =======
      let until = 0;
      const $ = cheerio.load(html);
      let jsonObj;

      const paginationBloc2 = $('.pagination-bloc2').text().trim();
      if (paginationBloc2 === '') {
        const anchor = $('.pagination-number a[href*="LISTING-LISTpg="]').last();
        until = anchor.text();
      } else {
        const anchor = $('.pagination-bloc2 a[href*="LISTING-LISTpg="]').last();
        until = anchor.text().replace('+', '');
      }

      let allData = [];
      const promises = [];
      if (2 <= until) {
        for (let i = 2; i <= until; i++) {
          const url = `http://www.seloger.com/list.htm?tri=initial&idtt=2&naturebien=1,2,4&LISTING-LISTpg=${i}`;
          promises.push(scrap(url, qs, headers));
        }
      }
      Promise.all(promises).then((responses) => {
        for (const response of responses) {
          allData = allData.concat(response.products);
        }

        const script = $('script').toArray().find((script) => $(script).html().indexOf('var ava_data = ') > -1);
        if (script) {
          let text = $(script).html();
          text = text.split('ar ava_data = ')[1].trim();
          text = text.split('ava_data.logged ')[0].trim();

          jsonObj = text.substring(0, text.length - 1);
          // let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
          const regex = /,(?!\s*?[{["'\w])/g;
          jsonObj = jsonObj.replace(regex, ''); // remove all trailing commas

          const result = JSON.parse(jsonObj).products;
          const products = setData(result);
          allData = allData.concat(products);
          const prices = allData.filter((item) => item.pricePerSquareMeter && !isNaN(item.pricePerSquareMeter))
                                                      .map((item) => Number(item.pricePerSquareMeter));
          const avgPricePerSquareMeter = prices.reduce((a, b) => (a) + (b), 0) / prices.length;
          const nbResults = allData.length;
          res.status(201).json({ allData, avgPricePerSquareMeter, nbResults });
        }
      });
    });
  };

  const pdf = (req, res) => {
    const backgroundColor = [
      '#2ecc71',
      '#3498db',
      '#95a5a6',
      '#9b59b6',
      '#f1c40f',
      '#e74c3c',
      '#34495e'
    ];
    const chartsVisibilities = {
      pie: true,
      bar: true,
      bubble: true
    };
    const compiled = ejs.compile(fs.readFileSync(`${__dirname}/chart.ejs`, 'utf8'));

    const pie = ejs.compile(fs.readFileSync(`${__dirname}/charts/pie.ejs`, 'utf8'));
    const pieFn = pie({ backgroundColor });

    const bar = ejs.compile(fs.readFileSync(`${__dirname}/charts/bar.ejs`, 'utf8'));
    const barFn = bar();

    const bubble = ejs.compile(fs.readFileSync(`${__dirname}/charts/bubble.ejs`, 'utf8'));
    const bubbleFn = bubble();

    const style = ejs.compile(fs.readFileSync(`${__dirname}/charts/style.ejs`, 'utf8'));
    const styleFn = style();


    const html = compiled({ style: styleFn, chartsVisibilities, pie: pieFn, bar: barFn, bubble: bubbleFn });

    res.pdfFromHTML({
      filename: 'generated.pdf',
      htmlContent: html,
      options: {
        renderDelay: 100,
        quality: '100',
        dpi: 300
      }
    });
  };

  return {
    getPlaces,
    analyze,
    pdf
  };
};

module.exports = cityscanController;
