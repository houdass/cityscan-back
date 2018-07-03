import Preference from '../models/preference';

const preferenceController = () => {
  // POST Preference
  const add = (req, res, next) => {
    const language = req.body.language;

    // Return error if no preference language provided
    if (!language) {
      return res.status(422).send({
        error: 'You must enter a preference language.'
      });
    }

    Preference.findOne({ language }, (err, preference) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (preference) {
          res.status(422).json({ error: 'This preference already exists.' });
        } else {
          const preference = new Preference({
            language
          });

          preference.save((err, preferenceResponse) => {
            if (err) {
              return next(err);
            }

            res.status(201).json(preferenceResponse);
          });
        }
      }
    });
  };

  // PUT Preference
  const edit = (req, res) => {
    req.preference.language = req.body.language;
    req.preference.save((err, preference) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(preference);
      }
    });
  };

  // GET Preference
  const find = (req, res) => {
    res.json(req.preference);
  };

  // GET Preferences
  const findAll = (req, res) => {
    Preference.find({}, (err, preferences) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(preferences);
      }
    });
  };

  // Preference Middleware
  const middleware = (req, res, next) => {
    Preference.findById(req.params.id, (err, preference) => {
      if (err) {
        res.status(500).send(err);
      } else if (preference) {
        req.preference = preference;
        next();
      } else {
        res.status(404).send('No preference found');
      }
    });
  };

  // DELETE Preference
  const remove = (req, res) => {
    req.preference.remove((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Successfully removed');
      }
    });
  };

  return {
    add,
    edit,
    find,
    findAll,
    middleware,
    remove
  };
};

module.exports = preferenceController;
