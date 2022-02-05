const {
    segitigaKanan,
    segitigaKiri,
    trapesiumKanan,
    trapesiumKiri
} = require('./rumusTrapesium');

function Fuzzy_logic_robusta() {
    this.termaSuhuDingin = 0;
    this.termaSuhuNormal = 0;
    this.termaSuhuPanas = 0;
    this.termaKelembabanKering = 0;
    this.termaKelembabanLembab = 0;
    this.termaKelembabanBasah = 0;
    this.termaKeasamanAsam = 0;
    this.termaKeasamanNetral = 0;
    this.termaKeasamanBasa = 0;
    this.termaOutputSubur = 0;
    this.termaOutputKurangSubur = 0;
    this.result = 0;
    this.resultPembilang = 0;
    this.resultPenyebut = 0;
    this.nilaiHasilRule = [];
    this.kondisiHasilRule = [];
};

Fuzzy_logic_robusta.prototype.derajatAnggotaSuhu = function (inputSuhu) {
    if(inputSuhu <= 12){
        //Dingin
        this.termaSuhuDingin = 1;

    }else if(inputSuhu >= 22 && inputSuhu <= 25){
        //Normal
        this.termaSuhuNormal = 1;

    }else if(inputSuhu >= 35){
        //Panas
        this.termaSuhuPanas = 1;

    }else if(inputSuhu > 25 && inputSuhu < 35){
        //this.termaPanas
        this.termaSuhuPanas = trapesiumKiri(25, 35, inputSuhu);
        this.termaSuhuPanas = this.termaSuhuPanas.toFixed(2);

        //this.termaNormal
        this.termaSuhuNormal = trapesiumKanan(35, 25, inputSuhu);
        this.termaSuhuNormal = this.termaSuhuNormal.toFixed(2);

    }else if(inputSuhu > 12 && inputSuhu < 22){
        //this.termaDingin
        this.termaSuhuDingin = trapesiumKanan(22, 12, inputSuhu);
        this.termaSuhuDingin = this.termaSuhuDingin.toFixed(2);;
        
        //this.termaNormal
        this.termaSuhuNormal = trapesiumKiri(12, 22, inputSuhu);
        this.termaSuhuNormal = this.termaSuhuNormal.toFixed(2);;
    }
};

Fuzzy_logic_robusta.prototype.derajatAnggotaKelembaban = function (inputKelembaban) {
    if(inputKelembaban <=30){
        //Kering
        this.termaKelembabanKering = 1;

    }else if(inputKelembaban >= 40 && inputKelembaban <= 70){
        //Lembab
        this.termaKelembabanLembab = 1;

    }else if(inputKelembaban >= 80){
        //Basah
        this.termaKelembabanBasah = 1;

    }else if(inputKelembaban > 70 && inputKelembaban < 80){
        //this.termaLembab
        this.termaKelembabanLembab = trapesiumKanan(80, 70, inputKelembaban);
        this.termaKelembabanLembab = this.termaKelembabanLembab.toFixed(2);

        //this.termaBasah
        this.termaKelembabanBasah = trapesiumKiri(70, 80, inputKelembaban);
        this.termaKelembabanBasah = this.termaKelembabanBasah.toFixed(2);

    }else if(inputKelembaban > 30 && inputKelembaban < 40){
        //this.termaKering
        this.termaKelembabanKering = trapesiumKanan(40, 30, inputKelembaban);
        this.termaKelembabanKering = this.termaKelembabanKering.toFixed(2);

        //this.termaLembab
        this.termaKelembabanLembab = trapesiumKiri(30, 40, inputKelembaban);
        this.termaKelembabanLembab = this.termaKelembabanLembab.toFixed(2);
    }
};

Fuzzy_logic_robusta.prototype.derajatAnggotaKeasaman = function (inputKeasaman) {
    if(inputKeasaman <= 4.5){
        //Asam
        this.termaKeasamanAsam = 1;

    }else if(inputKeasaman >= 5.5 & inputKeasaman <= 6.5){
        //Netral
        this.termaKeasamanNetral = 1;

    }else if(inputKeasaman >= 7.5){
        //Basa
        this.termaKeasamanBasa = 1;

    }else if(inputKeasaman > 6.5 && inputKeasaman < 7.5){
        //this.termaNetral
        this.termaKeasamanNetral = trapesiumKanan(7.5, 6.5, inputKeasaman);
        this.termaKeasamanNetral = this.termaKeasamanNetral.toFixed(2);

        //this.termaBasa
        this.termaKeasamanBasa = trapesiumKiri(6.5, 7.5, inputKeasaman);
        this.termaKeasamanBasa = this.termaKeasamanBasa.toFixed(2);

    }else if(inputKeasaman > 4.5 && inputKeasaman < 5.5){
        //this.termaAsam
        this.termaKeasamanAsam = trapesiumKanan(5.5, 4.5, inputKeasaman);
        this.termaKeasamanAsam = this.termaKeasamanAsam.toFixed(2);

        //this.termaNetral
        this.termaKeasamanNetral = trapesiumKiri(4.5, 5.5, inputKeasaman);
        this.termaKeasamanNetral = this.termaKeasamanNetral.toFixed(2);
    }
};

Fuzzy_logic_robusta.prototype.inferensi = function () {
    let derajatSuhu = [
        this.termaSuhuDingin,
        this.termaSuhuNormal,
        this.termaSuhuPanas
    ];
    
    let derajatKelembaban = [
        this.termaKelembabanKering,
        this.termaKelembabanLembab,
        this.termaKelembabanBasah
    ];
    let derajatKeasaman = [
        this.termaKeasamanAsam,
        this.termaKeasamanNetral,
        this.termaKeasamanBasa
    ];

    let tempCount = 0;
    let rulesCount = 0;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            for(let k = 0; k < 3; k++){
                if(derajatKelembaban[i] > 0 && derajatSuhu[j] > 0 && derajatKeasaman[k] > 0){
                    if(derajatKelembaban[i] <= derajatSuhu[j] && derajatKelembaban[i] <= derajatKeasaman[k]){
                        //kelembapan memiliki nilai min
                        this.nilaiHasilRule[tempCount] = derajatKelembaban[i];

                    }else if(derajatSuhu[j] <= derajatKelembaban[i] && derajatSuhu[j] <= derajatKeasaman[k]){
                        //suhu memiliki nilai min
                        this.nilaiHasilRule[tempCount] = derajatSuhu[j];

                    }else if(derajatKeasaman[k] <= derajatSuhu[j] && derajatKeasaman[k] <= derajatKelembaban[i]){
                        //keasaman memiliki nilai min
                        this.nilaiHasilRule[tempCount] = derajatKeasaman[k];

                    }

                    if(i == 0){
                        //termaKelembabanKering
                        if(j == 0){
                            //termaSuhuDingin
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 1){
                            //termaSuhuNormal
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }

                        }else if(j == 2){
                            //termaSuhuPanas
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }
                    }else if(i == 1){
                        //termaKelembabanLembab
                        if(j == 0){
                            //termaSuhuDingin
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 1){
                            //termaSuhuNormal
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }
                        }else if(j == 2){
                            //termaSuhuPanas
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }
                    }else if(i == 2){
                        //termaKelembabanBasah
                        if(j == 0){
                            //termaSuhuDingin
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 1){
                            //termaSuhuNormal
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 2){
                            //termaSuhuPanas
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }
                    }
                    console.log(`IF Kelembaban = ${derajatKelembaban[i]} dan Suhu = ${derajatSuhu[j]} dan Keasaman = ${derajatKeasaman[k]} dan Kesuburan = ${this.kondisiHasilRule[tempCount]} \( ${this.nilaiHasilRule[tempCount]}\)`)
                    tempCount ++;
                }
                rulesCount++;
            }
        }
    }

    for(let i = 0; i <= tempCount; i++){
        if(this.kondisiHasilRule[i] == "TIDAK COCOK"){
            //kurang subur memiliki nilai max
            if(i == 0){
                this.termaOutputKurangSubur = this.nilaiHasilRule[i];
            }else if(this.nilaiHasilRule[i] > this.termaOutputKurangSubur){
                this.termaOutputKurangSubur = this.nilaiHasilRule[i];
            }
        }else if(this.kondisiHasilRule[i] == "COCOK"){
            //subur memiliki nilai max
            if(i == 0){
                this.termaOutputSubur = this.nilaiHasilRule[i];
            }else if(this.nilaiHasilRule[i] > this.termaOutputSubur){
                this.termaOutputSubur = this.nilaiHasilRule[i];
            }
        }
    }
}

Fuzzy_logic_robusta.prototype.defuzzifikasi = function (banyakSample) {
    let pengaliTengah = [];
    let titikSampleTengah = [];
    let sampleCountSubur = 0;
    let sampleCountKurangSubur = 0;
    let titikSample = 0;
    let delta = 0;
    let tempCount = 0;
    let hasilPembilang = 0;
    let hasilPenyebut = 0;

    delta = 100 / banyakSample;
    titikSample += delta;

    for(let i = 0; i < banyakSample; i++){
        if(titikSample <= 50){
            //termaOutputKurangSubur
            hasilPembilang += titikSample * this.termaOutputKurangSubur;
            sampleCountKurangSubur += 1;

        }else if(titikSample >= 60){
            //termaOutputSubur
            hasilPembilang += titikSample * this.termaOutputSubur;
            sampleCountSubur += 1;

        }else if(titikSample > 50 && titikSample < 60){
            //pengaliTengah
            if(this.termaOutputKurangSubur > this.termaOutputSubur){
                titikSampleTengah[tempCount] = titikSample;
                pengaliTengah[tempCount] = trapesiumKanan(60, 50, titikSampleTengah[tempCount]);
                hasilPembilang += titikSampleTengah[tempCount] * pengaliTengah[tempCount];

            }else{
                titikSampleTengah[tempCount] = titikSample;
                pengaliTengah[tempCount] = trapesiumKiri(50, 60, titikSampleTengah[tempCount]);
                hasilPembilang += titikSampleTengah[tempCount] * pengaliTengah[tempCount];

            }
            tempCount += 1;

        }
        titikSample += delta;

    }

    hasilPenyebut = (sampleCountSubur * this.termaOutputSubur) + (sampleCountKurangSubur * this.termaOutputKurangSubur);
    for(let i = 0; i < tempCount; i++){
        hasilPenyebut += pengaliTengah[i];
    }
    return hasilPembilang / hasilPenyebut;
}

function Fuzzy_logic_arabica() {
    this.termaSuhuDingin = 0;
    this.termaSuhuNormal = 0;
    this.termaSuhuPanas = 0;
    this.termaKelembabanKering = 0;
    this.termaKelembabanLembab = 0;
    this.termaKelembabanBasah = 0;
    this.termaKeasamanAsam = 0;
    this.termaKeasamanNetral = 0;
    this.termaKeasamanBasa = 0;
    this.termaOutputSubur = 0;
    this.termaOutputKurangSubur = 0;
    this.result = 0;
    this.resultPembilang = 0;
    this.resultPenyebut = 0;
    this.nilaiHasilRule = [];
    this.kondisiHasilRule = [];
};

Fuzzy_logic_arabica.prototype.derajatAnggotaSuhu = function (inputSuhu) {
    if(inputSuhu <= 6){
        //Dingin
        this.termaSuhuDingin = 1;

    }else if(inputSuhu >= 16 && inputSuhu <= 22){
        //Normal
        this.termaSuhuNormal = 1;

    }else if(inputSuhu >= 32){
        //Panas
        this.termaSuhuPanas = 1;

    }else if(inputSuhu > 22 && inputSuhu < 32){
        //this.termaPanas
        this.termaSuhuPanas = trapesiumKiri(25, 35, inputSuhu);
        this.termaSuhuPanas = this.termaSuhuPanas.toFixed(2);

        //this.termaNormal
        this.termaSuhuNormal = trapesiumKanan(35, 25, inputSuhu);
        this.termaSuhuNormal = this.termaSuhuNormal.toFixed(2);

    }else if(inputSuhu > 6 && inputSuhu < 16){
        //this.termaDingin
        this.termaSuhuDingin = trapesiumKanan(22, 12, inputSuhu);
        this.termaSuhuDingin = this.termaSuhuDingin.toFixed(2);;
        
        //this.termaNormal
        this.termaSuhuNormal = trapesiumKiri(12, 22, inputSuhu);
        this.termaSuhuNormal = this.termaSuhuNormal.toFixed(2);;
    }
};

Fuzzy_logic_arabica.prototype.derajatAnggotaKelembaban = function (inputKelembaban) {
    if(inputKelembaban <=30){
        //Kering
        this.termaKelembabanKering = 1;

    }else if(inputKelembaban >= 40 && inputKelembaban <= 70){
        //Lembab
        this.termaKelembabanLembab = 1;

    }else if(inputKelembaban >= 80){
        //Basah
        this.termaKelembabanBasah = 1;

    }else if(inputKelembaban > 70 && inputKelembaban < 80){
        //this.termaLembab
        this.termaKelembabanLembab = trapesiumKanan(80, 70, inputKelembaban);
        this.termaKelembabanLembab = this.termaKelembabanLembab.toFixed(2);

        //this.termaBasah
        this.termaKelembabanBasah = trapesiumKiri(70, 80, inputKelembaban);
        this.termaKelembabanBasah = this.termaKelembabanBasah.toFixed(2);

    }else if(inputKelembaban > 30 && inputKelembaban < 40){
        //this.termaKering
        this.termaKelembabanKering = trapesiumKanan(40, 30, inputKelembaban);
        this.termaKelembabanKering = this.termaKelembabanKering.toFixed(2);

        //this.termaLembab
        this.termaKelembabanLembab = trapesiumKiri(30, 40, inputKelembaban);
        this.termaKelembabanLembab = this.termaKelembabanLembab.toFixed(2);
    }
};

Fuzzy_logic_arabica.prototype.derajatAnggotaKeasaman = function (inputKeasaman) {
    if(inputKeasaman <= 4.5){
        //Asam
        this.termaKeasamanAsam = 1;

    }else if(inputKeasaman >= 5.5 & inputKeasaman <= 6.5){
        //Netral
        this.termaKeasamanNetral = 1;

    }else if(inputKeasaman >= 7.5){
        //Basa
        this.termaKeasamanBasa = 1;

    }else if(inputKeasaman > 6.5 && inputKeasaman < 7.5){
        //this.termaNetral
        this.termaKeasamanNetral = trapesiumKanan(7.5, 6.5, inputKeasaman);
        this.termaKeasamanNetral = this.termaKeasamanNetral.toFixed(2);

        //this.termaBasa
        this.termaKeasamanBasa = trapesiumKiri(6.5, 7.5, inputKeasaman);
        this.termaKeasamanBasa = this.termaKeasamanBasa.toFixed(2);

    }else if(inputKeasaman > 4.5 && inputKeasaman < 5.5){
        //this.termaAsam
        this.termaKeasamanAsam = trapesiumKanan(5.5, 4.5, inputKeasaman);
        this.termaKeasamanAsam = this.termaKeasamanAsam.toFixed(2);

        //this.termaNetral
        this.termaKeasamanNetral = trapesiumKiri(4.5, 5.5, inputKeasaman);
        this.termaKeasamanNetral = this.termaKeasamanNetral.toFixed(2);
    }
};

Fuzzy_logic_arabica.prototype.inferensi = function () {
    let derajatSuhu = [
        this.termaSuhuDingin,
        this.termaSuhuNormal,
        this.termaSuhuPanas
    ];
    
    let derajatKelembaban = [
        this.termaKelembabanKering,
        this.termaKelembabanLembab,
        this.termaKelembabanBasah
    ];
    let derajatKeasaman = [
        this.termaKeasamanAsam,
        this.termaKeasamanNetral,
        this.termaKeasamanBasa
    ];

    let tempCount = 0;
    let rulesCount = 0;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            for(let k = 0; k < 3; k++){
                if(derajatKelembaban[i] > 0 && derajatSuhu[j] > 0 && derajatKeasaman[k] > 0){
                    if(derajatKelembaban[i] <= derajatSuhu[j] && derajatKelembaban[i] <= derajatKeasaman[k]){
                        //kelembapan memiliki nilai min
                        this.nilaiHasilRule[tempCount] = derajatKelembaban[i];

                    }else if(derajatSuhu[j] <= derajatKelembaban[i] && derajatSuhu[j] <= derajatKeasaman[k]){
                        //suhu memiliki nilai min
                        this.nilaiHasilRule[tempCount] = derajatSuhu[j];

                    }else if(derajatKeasaman[k] <= derajatSuhu[j] && derajatKeasaman[k] <= derajatKelembaban[i]){
                        //keasaman memiliki nilai min
                        this.nilaiHasilRule[tempCount] = derajatKeasaman[k];

                    }

                    if(i == 0){
                        //termaKelembabanKering
                        if(j == 0){
                            //termaSuhuDingin
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 1){
                            //termaSuhuNormal
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }

                        }else if(j == 2){
                            //termaSuhuPanas
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }
                    }else if(i == 1){
                        //termaKelembabanLembab
                        if(j == 0){
                            //termaSuhuDingin
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 1){
                            //termaSuhuNormal
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }
                        }else if(j == 2){
                            //termaSuhuPanas
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }
                    }else if(i == 2){
                        //termaKelembabanBasah
                        if(j == 0){
                            //termaSuhuDingin
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 1){
                            //termaSuhuNormal
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }else if(j == 2){
                            //termaSuhuPanas
                            if(k == 0){
                                //termaKeasamanAsam
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 1){
                                //termaKeasamanNetral
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }else if(k == 2){
                                //termaKeasamanBasa
                                this.kondisiHasilRule[tempCount] = "TIDAK COCOK";
                            }
                        }
                    }
                    console.log(`IF Kelembaban = ${derajatKelembaban[i]} dan Suhu = ${derajatSuhu[j]} dan Keasaman = ${derajatKeasaman[k]} dan Kesuburan = ${this.kondisiHasilRule[tempCount]} \( ${this.nilaiHasilRule[tempCount]}\)`)
                    tempCount ++;
                }
                rulesCount++;
            }
        }
    }

    for(let i = 0; i <= tempCount; i++){
        if(this.kondisiHasilRule[i] == "TIDAK COCOK"){
            //kurang subur memiliki nilai max
            if(i == 0){
                this.termaOutputKurangSubur = this.nilaiHasilRule[i];
            }else if(this.nilaiHasilRule[i] > this.termaOutputKurangSubur){
                this.termaOutputKurangSubur = this.nilaiHasilRule[i];
            }
        }else if(this.kondisiHasilRule[i] == "COCOK"){
            //subur memiliki nilai max
            if(i == 0){
                this.termaOutputSubur = this.nilaiHasilRule[i];
            }else if(this.nilaiHasilRule[i] > this.termaOutputSubur){
                this.termaOutputSubur = this.nilaiHasilRule[i];
            }
        }
    }
}

Fuzzy_logic_arabica.prototype.defuzzifikasi = function (banyakSample) {
    let pengaliTengah = [];
    let titikSampleTengah = [];
    let sampleCountSubur = 0;
    let sampleCountKurangSubur = 0;
    let titikSample = 0;
    let delta = 0;
    let tempCount = 0;
    let hasilPembilang = 0;
    let hasilPenyebut = 0;

    delta = 100 / banyakSample;
    titikSample += delta;

    for(let i = 0; i < banyakSample; i++){
        if(titikSample <= 50){
            //termaOutputKurangSubur
            hasilPembilang += titikSample * this.termaOutputKurangSubur;
            sampleCountKurangSubur += 1;

        }else if(titikSample >= 60){
            //termaOutputSubur
            hasilPembilang += titikSample * this.termaOutputSubur;
            sampleCountSubur += 1;

        }else if(titikSample > 50 && titikSample < 60){
            //pengaliTengah
            if(this.termaOutputKurangSubur > this.termaOutputSubur){
                titikSampleTengah[tempCount] = titikSample;
                pengaliTengah[tempCount] = trapesiumKanan(60, 50, titikSampleTengah[tempCount]);
                hasilPembilang += titikSampleTengah[tempCount] * pengaliTengah[tempCount];

            }else{
                titikSampleTengah[tempCount] = titikSample;
                pengaliTengah[tempCount] = trapesiumKiri(50, 60, titikSampleTengah[tempCount]);
                hasilPembilang += titikSampleTengah[tempCount] * pengaliTengah[tempCount];

            }
            tempCount += 1;

        }
        titikSample += delta;

    }

    hasilPenyebut = (sampleCountSubur * this.termaOutputSubur) + (sampleCountKurangSubur * this.termaOutputKurangSubur);
    for(let i = 0; i < tempCount; i++){
        hasilPenyebut += pengaliTengah[i];
    }
    return hasilPembilang / hasilPenyebut;
}

const proseFuzzy = (request, h) => {
    const { PH, Temperature, Humidity_soil } = request.payload;

    /*
    const robusta = new Fuzzy_logic_robusta();
    robusta.derajatAnggotaSuhu(Temperature);
    robusta.derajatAnggotaKelembaban(Humidity_soil);
    robusta.derajatAnggotaKeasaman(PH);
    robusta.inferensi();
    let keluarrobusta = robusta.defuzzifikasi(10);
    
    const arabica = new Fuzzy_logic_arabica();
    arabica.derajatAnggotaSuhu(Temperature);
    arabica.derajatAnggotaKelembaban(Humidity_soil);
    arabica.derajatAnggotaKeasaman(PH);
    arabica.inferensi();
    let keluararabica = arabica.defuzzifikasi(10);

    if(keluararabica > keluarrobusta){
        return h.response({
            status: 'Bisa Arabica',
            data: {
                persenRobusta: keluarrobusta,
                persenArabica: keluararabica,
            },
        })
        .code(200);
    }else if(keluararabica < keluarrobusta){
        return h.response({
            status: 'Bisa Robusta',
            data: {
                persen_robusta: keluarrobusta,
                persen_arabica: keluararabica,
            },
        })
        .code(200);
    }

    return h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    })
    .code(500);
    */
   
};

module.exports = {
    proseFuzzy,
}