var chain = require('./chain');
var compose = require('./compose');
var map = require('./map');


/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @see R.composeK
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (m a -> m z)
 * @param {...Function}
 * @return {Function}
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
 *      //=> Just('NY')
 *      getStateCode(Maybe.of('[Invalid JSON]'));
 *      //=> Nothing()
 */
module.exports = function pipeK() {
  var fs = map(chain, arguments);
  fs.reverse();
  return compose.apply(this, fs);
};
