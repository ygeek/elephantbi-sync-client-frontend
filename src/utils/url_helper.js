import { Seq } from 'immutable';
import qs from 'qs';
import _ from 'lodash';

//remove empty value params attribute
function filterParams(params) {
  return Seq(params)
    .filter((item) => {
      return item !== null;
    }).toObject();
}

function jsonToQuery(params) {
  const query = qs.stringify(
    filterParams(_.pickBy(params)),
    { arrayFormat: 'repeat' }
  );
  return query ? `?${query}` : null
}

export default jsonToQuery;