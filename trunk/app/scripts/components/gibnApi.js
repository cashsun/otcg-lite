/**
 * Created by cashsun on 15/5/7.
 */
'use strict';

module.exports = {
  getDefinitionByType: function (type) {
    if (type === "a") {
      return {
        map1: 123,
        map2: 'a',
        map3: ['c', 'd', 'e'],
        map4: {
          map5: 'b'
        },
        map6: [
          {map7: [1, 2, 3]}
        ]

      }
    }

  }
};
