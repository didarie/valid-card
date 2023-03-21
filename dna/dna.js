// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let randomIndex = Math.floor(Math.random() * this.dna.length);
      console.log(`element's index: ${randomIndex}`);
      let randBase = returnRandBase();
      console.log(`element: ${this.dna[randomIndex]}`);
      while (this.dna[randomIndex] === randBase) {
        randBase = returnRandBase();
      }
      return `mutate element: ${(this.dna[randomIndex] = randBase)}`;
    },
    compareDNA(pAequor) {
      let ret = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          ret++;
        }
      }
      ret = (ret / 15) * 100;
      return `${ret.toFixed() + "%"} DNA in common`;
    },
    willLikelySurvive() {
      let bases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          bases++;

        }
      }
      bases = (bases / 15) * 100;
      if (bases.toFixed() >= 60) {
        return true;
        console.log();
      } else {
        return false;
      }

    },
  };
};

const generator = () => {
  let instances = []
  let i = 1
  let tip = pAequorFactory(i,mockUpStrand())
  while(i <= 30){
    tip = pAequorFactory(i,mockUpStrand())
    if(tip.willLikelySurvive()===true){
      instances.push(tip)
      i++
    }
  }
  return instances
}

const testP = pAequorFactory(1, mockUpStrand());
console.log(testP.specimenNum);
console.log(testP.dna);
console.log(testP.mutate());
console.log(testP.willLikelySurvive());
const testP2 = pAequorFactory(2, mockUpStrand());
console.log(testP2.specimenNum);
console.log(testP2.dna);
console.log(testP2.mutate());
console.log(testP2.willLikelySurvive());
console.log(testP.compareDNA(testP2));
console.log(generator())