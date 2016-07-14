'use strict';
var json2csv = require('json2csv');
var moment = require('moment');
var fs = require('fs');

var args = process.argv.slice(2);

// read data from a JSON file

fs.readFile(args[0], 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
    // convert the json to CSV

    var cleanData = JSON.parse(data).event.map( i => {
        return {
            //timestamp: moment(parseInt(i.query.id[0].timestamp_usec)).format(),
            timestamp: parseInt(i.query.id[0].timestamp_usec),
            //time_est:
            query_text: i.query.query_text,
            //origin: args[0]
        }
    })

    json2csv({
        data: cleanData
    }, function(err, csv) {
        if (err) console.log(err);
        console.log(csv);
        fs.writeFile('file.csv', csv, function(err, res) {
            if (err) throw err;
            console.log('file saved');
            process.exit(0);
          })

        });


});
