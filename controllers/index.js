const ekspedisi = require('./controller_ekspedisi')
const produk = require('./controller_produk')
const supplier = require('./controller_supplier')
const pengangkutan = require('./controller_pengangkutan')
const konsumer = require('./controller_konsumer')
const _user = require('./controller_user')

module.exports = {
    ekspedisi,
    produk,
    supplier,
    pengangkutan,
    konsumer,
    _user
};
