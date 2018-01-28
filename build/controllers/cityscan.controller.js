'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cityscanController = function cityscanController() {
  // Get Places
  var getPlaces = function getPlaces(req, res) {
    var text = req.query.city;
    _request2.default.get({
      url: 'http://autocomplete.svc.groupe-seloger.com/auto/complete/0/ALL/6?text=' + text,
      json: true
    }, function (error, response) {
      if (!error && response.statusCode == 200) {
        res.status(201).json(response.body);
      }
    });
  };

  var analyze = function analyze(req, res) {
    var zipCode = req.params.zipCode;
    // http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&idq=124758&naturebien=1,2,4
    // http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&cp=75&naturebien=1,2,4
    (0, _request2.default)('http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2&cp=' + zipCode + '&naturebien=1,2,4', function (error, response, html) {
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
        var $ = _cheerio2.default.load(html);

        var jsonObj = void 0;

        var scripts = $('script').filter(function () {
          return $(this).html().indexOf('var ava_data = ') > -1;
        });

        if (scripts.length === 1) {
          var text = $(scripts[0]).html();
          text = text.split('ar ava_data = ')[1].trim();
          text = text.split('ava_data.logged ')[0].trim();
          jsonObj = text.substring(0, text.length - 1);
          var result = JSON.parse(jsonObj).products;

          var products = result.map(function (product) {
            var item = {};
            item.price = product.prix;
            item.size = product.surface;
            item.zipcode = product.codepostal;
            item.productType = product.typedebien;
            item.transactionType = product.typedetransaction;
            item.heatingType = product.idtypechauffage;
            item.kitchenType = product.idtypecuisine;
            item.hasBalcony = !!product.si_balcon;
            item.nbBedrooms = product.nb_chambres;
            item.nbRooms = product.nb_pieces;
            item.hasBathroom = !!product.si_sdEau;
            item.hasShoweroom = !!product.si_sdbain;
            item.floor = !!product.etage;
            return item;
          });

          var prices = result.map(function (item) {
            return Number(item.prix);
          });
          var avgPrice = prices.reduce(function (a, b) {
            return a + b;
          }, 0) / result.length;
          res.status(201).json({ products: products, avgPrice: avgPrice });
        }
      }
    });
  };

  return {
    getPlaces: getPlaces,
    analyze: analyze
  };
};

module.exports = cityscanController;