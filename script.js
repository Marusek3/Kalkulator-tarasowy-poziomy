document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    var wysokosc = Number(document.getElementById("wysokosc").value);
    var szerokosc = Number(document.getElementById("szerokosc").value);
    var lewy_bok = document.getElementById("lewy_bok").value;
    var prawy_bok = document.getElementById("prawy_bok").value;
    var gora = document.getElementById("gora").value;
    var kolor = document.querySelector("input[name=kolor]:checked").value;
    let metr_biezacy;

    let [cena, deska_dlugosc, wysokosc_pozostala, slupki_dzielace] = szerokosc_oblicz(szerokosc, prawy_bok, lewy_bok, gora, wysokosc);
    let [luz, m5, m4, m3, m2] = wysokosc_oblicz(wysokosc_pozostala);

    cena += (190 * (m3 + m4 + m5) + 95 * m2) * (slupki_dzielace + 1);

    metr_biezacy = (m2 * 2 + m3 * 3 + m4 * 4 + m5 * 5) * deska_dlugosc / 100;
    if (kolor == "drewnopodobne") {
        cena += metr_biezacy * 45;
    } else {
        cena += metr_biezacy * 40;
    }
    cena = Math.round(cena / 10) * 10
    document.getElementById("cena").innerHTML = cena + " zł";
});

function wysokosc_oblicz(wysokosc) {
    let m2 = 0, m3 = 0, m4 = 0, m5 = 0;
    while (wysokosc > 47) {
        wysokosc -= 47;
        m5 += 1;
    }
    while (wysokosc > 37.5) {
        wysokosc -= 37.5;
        m4 += 1;
    }
    while (wysokosc > 27.5) {
        wysokosc -= 27.5;
        m3 += 1;
    }
    while (wysokosc > 18.5) {
        wysokosc -= 18.5;
        m2 += 1;
    }
    return [wysokosc, m5, m4, m3, m2]; // Return an object
}
function szerokosc_oblicz(szerokosc, prawy_bok, lewy_bok, gora, wysokosc) {
    let cena = 0;
    let deska_dlugosc;
    let slupki_dzielace = 0;

    if (szerokosc > 200) {
        slupki_dzielace += 1;
        if (lewy_bok == "slupek" && prawy_bok == "slupek") { //WARIANT 3
            if (gora == "nic") {
                wysokosc -= 6;
                cena += 300;
            }
            cena += 300; // słupek dzielący
            deska_dlugosc = ((szerokosc - 6) / 2 - 6.5) * 2;//DZIAŁA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        } else if (lewy_bok == "elewacja" && prawy_bok == "elewacja") { //WARIANT 4   DZIAŁA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            deska_dlugosc = ((szerokosc - 18) / 2 - 6.5) * 2;
            wysokosc -= 6;
            cena += 1200;
        }

    } else {
        if (lewy_bok == "slupek" && prawy_bok == "slupek") {//WARIANT 1
            deska_dlugosc = szerokosc - 6.5;
        } else {//WARIANT 2 // DZIAŁA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {
                cena += 300
                deska_dlugosc = szerokosc - 12.5;
            }
        }
    }
    return [cena, deska_dlugosc, wysokosc, slupki_dzielace];
}
function toggleTooltip() {
    var tooltip = document.getElementById("tooltip");
    if (tooltip.style.display === "block") {
        tooltip.style.display = "none";
    } else {
        tooltip.style.display = "block";
    }
}

function hideTooltip() {
    document.getElementById("tooltip").style.display = "none";
}
