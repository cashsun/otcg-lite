'use strict'

var customFunctions = require('./../../app/scripts/components/customFunctions');
require('./../utils/specUtils');

describe('customFunctions', function(){
  it('generateDate works', function(done){
    var line = 'generateDate(20-may-2015, 5, y) oh yeah';


    customFunctions.evaluate([line]).should.eventually.equal('\"20-May-2020\" oh yeah')
    .notify(done);
  });
});
