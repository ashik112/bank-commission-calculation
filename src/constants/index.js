const USER_TYPES = {
  juridical: 'juridical',
  natural: 'natural',
};

Object.freeze(USER_TYPES);

const TRANSACTION_TYPE = {
  cash_in: 'cash_in',
  cash_out: 'cash_out',
};

Object.freeze(TRANSACTION_TYPE);

module.exports = {
  USER_TYPES,
  TRANSACTION_TYPE,
};
