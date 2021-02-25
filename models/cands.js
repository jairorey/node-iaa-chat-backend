const Cand = require("./cand");

class Cands {

    constructor() {
        this.cands = [];
    }

    addCand( cand = new Cand() ) {
        this.cands.push( cand );
    }

    getCands() {
        return this.cands;
    }

    deleteCand( id = '') {
        this.cands = this.cands.filter( cand => cand.id !== id);
        return this.cands;
    }

    voteCand( id = '') {
        this.cands = this.cands.map( cand => {

            if(cand.id === id) {

                cand.votes ++;
                return cand;
                
            } else {
                return cand;
            }


        } );
    }


}

module.exports = Cands;