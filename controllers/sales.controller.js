const Country = require("../models/country.model");
const request = require('request');

exports.GetCountries = async (req, res) => {
    try {
        let countries = null;
        // If region is given as parameter results are filtered according to region.
        if (req.query.region != null){
            countries = await Country.find({ region: req.query.region }).select('name region -_id');
        }
        // If not all countries are returned.
        else{
            countries = await Country.find({}).select('name region -_id');
        }
        return res.status(200).send(JSON.stringify(countries));
    } catch (error) {
      console.error(`Received error: ${error.message}`);
      return res.status(404).send({message: error.message});
    }
}

exports.GetSalesRep = async (req, res) => {
    try {
        request('http://localhost:3000/countries', { json: true }, (err, resp, body) => {
            if (err) { return console.log(err); }
            let countries = resp.body;
            let regions = {};
            // Counts number of country in each region.
            countries.forEach(country => {
                if (!Object.keys(regions).includes(country.region)){
                    regions[country.region] = 1;
                }
                else {
                    regions[country.region] += 1;
                }
            });
            // Calculates minimum and maximum required number of representatives.
            let result = [];
            Object.keys(regions).forEach(region => {
                result.push({
                    "region": region,
                    "minSalesReq": Math.ceil(regions[region]/7),
                    "maxSalesReq": Math.ceil(regions[region]/3)
                })
            })
            return res.status(200).send(result);
          });
    } catch (error) {
      console.error(`Received error: ${error.message}`);
      return res.status(404).send({message: error.message});
    }
}

exports.GetOptimal = async (req, res) => {
    try {
        request('http://localhost:3000/countries', { json: true }, (err, resp, body) => {
            if (err) { return console.log(err); }
            let countries = resp.body;
            let regions = {};
            // Collects names of countries in each region.
            countries.forEach(country => {
                if (!Object.keys(regions).includes(country.region)){
                    regions[country.region] = [];
                    regions[country.region].push(country.name);
                }
                else {
                    regions[country.region].push(country.name);
                }
            });
            // Calculates optimum country list for the new comer.
            let result = [];
            Object.keys(regions).forEach(region => {
                let minSalesReq = Math.ceil(regions[region].length/7);
                let countryCount = Math.ceil(regions[region].length/(minSalesReq+1));
                result.push({
                    "region": region,
                    "countryList": regions[region].slice(0,countryCount),
                    "countryCount": countryCount
                })
            })
            return res.status(200).send(result);
          });
    } catch (error) {
      console.error(`Received error: ${error.message}`);
      return res.status(404).send({message: error.message});
    }
}


