import request from 'request';
import cheerio from 'cheerio';

const cityscanController = () => {
  // Get Addresses
  const getAddresses = (req, res) => {
    const text = req.query.text;
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
    const zipCode = req.params.zipCode;
    // http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&idq=124758&naturebien=1,2,4
    // http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&cp=75&naturebien=1,2,4
    request(`http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&cp=${zipCode}&naturebien=1,2,4`,
      (error, response, html) => {
        /* if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          res.send($('script'));
          const script = $('script').toArray().find((script) => $(script).html().indexOf('var ava_data = ') > -1);
          if (script) {
            let text = $(script).html();
            res.status(201).json(text);
            text = text.split('ar ava_data = ')[1].trim();
            text = text.split('ava_data.logged ')[0].trim();
            const jsonObj = text.substring(0, text.length - 1);

            // const result = JSON.parse(jsonObj);

            // const prices = result.map((item) => Number(item.prix));
            // const total = prices.reduce((a, b) => (a) + (b), 0) / result.length;

            res.status(201).json(jsonObj);
          }
        } */


        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          let jsonObj;

          const scripts = $('script').filter(function() {
            return $(this).html().indexOf('var ava_data = ') > -1;
          });

          if (scripts.length === 1) {
            let text = $(scripts[0]).html();
            text = text.split('ar ava_data = ')[1].trim();
            text = text.split('ava_data.logged ')[0].trim();
            jsonObj = text.substring(0, text.length - 1);
            const result = JSON.parse(jsonObj).products;

            const prices = result.map((item) => Number(item.prix));
            const total = prices.reduce((a, b) => (a) + (b), 0) / result.length;
            res.status(201).json({ prices, total });
          }
        }
      });
  };

  return {
    getAddresses,
    analyze
  };
};

module.exports = cityscanController;
