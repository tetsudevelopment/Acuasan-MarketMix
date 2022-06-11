var app = new Vue({
  el: "#app",
  data() {
    return {
      watch: 1,
      data: [],
      sub: 0,
      stratum: "",
      meters: 0,
      priceMeters: 0,
      name: "Brayan",
      id: 0,
      total: 0,
      fixedCharge: 0,
      counter1: 0,
      counter2: 0,
      counter3: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      promMeter1: 0,
      promMeter2: 0,
      promMeter3: 0,
    };
  },

  methods: {
    agregar: function () {
      this.total = 0;
      if (this.stratum === "" || this.name==="") {
        return alert("Escriba En los espacios Vacios");
      } else if (this.stratum === "1") {
        this.sub = 0.4;
        this.fixedCharge = 2300;
        this.priceMeters = 250;
        this.total = ((this.fixedCharge - (this.fixedCharge * this.sub)) + (this.meters * this.priceMeters));
      } else if (this.stratum === "2") {
        this.sub = 0.3;
        this.fixedCharge = 3200;
        this.priceMeters = 350;
        this.total = ((this.fixedCharge - (this.fixedCharge * this.sub)) + (this.meters * this.priceMeters));
      } else {
        this.sub = 0.1;
        this.fixedCharge = 3900;
        this.priceMeters = 460;
        this.total = ((this.fixedCharge - (this.fixedCharge * this.sub)) + (this.meters * this.priceMeters));
      }
      if (this.stratum !== "") {
        this.data.unshift({
          id: this.id++,
          name: this.name,
          meters: this.meters,
          total: this.total,
          sub: this.sub,
          fixedCharge: this.fixedCharge,
          stratum: this.stratum,
          priceMeters: this.priceMeters,
        });
      } else {
        console.log('Seleccione un estrato');
      }
       
    },
    deleteItem: function (index) {
      this.data.splice(index, 1);
      this.id--;
    },
    invoice: function (item) {
      this.watch = 2;
      const invoice = [];
      const array = this.data.find((objeto) => objeto.id === item.id);
      invoice.push(array)
      this.name = array.name;
      this.stratum = array.stratum;
      this.fixedCharge = array.fixedCharge;
      this.meters = array.meters; 
      this.priceMeters = array.priceMeters;
      this.total = array.total;
      if (array.stratum === "1") {
        this.sub="40%"
      } else if (array.stratum === "2") {
        this.sub = "30%";
      } else {
        this.sub = "10%";
      } 
        
        console.log(invoice);
    },
    registry: function () {
      this.watch = 1;
    },
    report: function () {
      this.watch = 3;
      this.counter1 = 0;
      this.counter2 = 0;
      this.counter3 = 0;
      this.promMeter1 = 0;
      this.promMeter2 = 0;
      this.promMeter3 = 0;
      this.total = 0;
      this.total1 = 0;
      this.total2 = 0;
      this.total3 = 0;
      let prom = this.data.filter(element => element.stratum ==="1");
      prom.forEach(element => {
        this.counter1++;
        this.promMeter1 += parseInt(element.meters);
        this.total1 += parseInt(element.total);
        if (this.counter1 === prom.length) {
          this.promMeter1 /= prom.length
          console.log(this.counter1+' contador');
          console.log(prom.length +' longitud');
        } else {
          console.log('no funciona');
        }
      });
      prom = this.data.filter((element) => element.stratum ==="2");
      prom.forEach(element => {
        this.counter2++;
        this.promMeter2 += parseInt(element.meters);
        this.total2 += parseInt(element.total);
        if (this.counter2 === prom.length) {
          this.promMeter2 /= prom.length;
          console.log(this.counter2+' contador');
          console.log(prom.length +' longitud');
        } else {
          console.log('no funciona');
        }
      });
      prom = this.data.filter((element) => element.stratum ==="3");
        prom.forEach((element) => {
          this.counter3++;
          this.promMeter3 += parseInt(element.meters);
          this.total3 += parseInt(element.total);
          if (this.counter3 === prom.length) {
            this.promMeter3 /= prom.length;
            console.log(this.counter3 + " contador");
            console.log(prom.length + " longitud");
          } else {
            console.log("no funciona");
          }
        });
      this.total = this.total1 + this.total2 + this.total3;
      console.log(this.total);
    },
  },
}); 
