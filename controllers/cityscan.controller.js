import request from 'request';
import cheerio from 'cheerio';

const cityscanController = () => {
  // Get Addresses
  const getAddresses = (req, res) => {
    const text = req.query.text;
    request
    .get({
      url: `http://autocomplete.sc.groupe-seloger.com/auto/complete/0/ALL/6?text=${text}`,
      json: true
    }, (error, response) => {
      if (!error && response.statusCode == 200) {
        res.status(201).json(response.body);
      }
    });
  };

  const analyze = (req, res) => {
    const zipCode = req.params.zipCode;
    request(`http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&cp=${zipCode}&naturebien=1,2,4`,
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          const script = $('script').toArray().find((script) => $(script).html().indexOf('var ava_data = ') > -1);
          res.status(201).json(script);
          if (script) {
            let text = $(script).html();
            res.status(201).json(text);
            text = text.split('ar ava_data = ')[1].trim();
            text = text.split('ava_data.logged ')[0].trim();
            const jsonObj = text.substring(0, text.length - 1);

            const result = JSON.parse(jsonObj).products;

            const prices = result.map((item) => Number(item.prix));
            const total = prices.reduce((a, b) => (a) + (b), 0) / result.length;

            res.status(201).json(JSON.parse({ jsonObj, total }));
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
