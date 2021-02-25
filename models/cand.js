const { v4: uuidV4 } = require('uuid');

class Cand {

    constructor(name = 'no-name', votes = 0) {
        this.id = uuidV4(); // identificador unico
        this.name = name;
        this.votes = votes;
    }
}

module.exports = Cand;