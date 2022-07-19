import axios from 'axios';
import '../css/style.css'

//Funciones
let changeEntity, drawCards, modal, modalHide, redirect;
//cards
let cardCiv, cardUni, cardEst, cardTec

//Controles
//Botones
let btnCiv, btnUni, btnEst, btnTec;
//main
let main, mod, modalS;

//Global vars
let modalData;

btnCiv = document.getElementById('btnCiv');
btnUni = document.getElementById('btnUni');
btnEst = document.getElementById('btnEst');
btnTec = document.getElementById('btnTec');

main = document.getElementById('main');

mod = document.getElementById('modal');
modalS = document.getElementById('modalShadow');


//Program




changeEntity = async (ent) => {
    let data;
    main.innerHTML = `<h3>Please wait...</h3>`

    switch (ent) {
        case 1: //Civi
            try {
                data = await axios.get("/API/civilizations");
                data = data.data;
            } catch (e) {
                data = {}
            }

            break;
        case 2: //Unidad
            try {
                data = await axios.get("/API/units");
                data = data.data;
            } catch (e) {
                data = {}
            }
            break;
        case 3: //Estruct
            try {
                data = await axios.get("/API/structures");
                data = data.data;
            } catch (e) {
                data = {}
            }
            break;
        case 4: //Tec
            try {
                data = await axios.get("/API/technologies");
                data = data.data;
            } catch (e) {
                data = {}
            }
            break;
    }
    main.innerHTML = '';
    drawCards(ent, data);
}

drawCards = (type, data) => {
    switch (type) {
        case 1: //Civi
            data = data.civilizations;
            data.forEach(civ => {
                cardCiv(civ);
            });

            break;
        case 2: //Unidad
            data = data.units;
            data.forEach(uni => {
                cardUni(uni);
            });
            break;
        case 3: //Estruct

            data = data.structures;
            data.forEach(str => {
                cardEst(str);
            });
            break;
        case 4: //Tec
            data = data.technologies;
            data.forEach(tec => {
                cardTec(tec);
            });
            break;
    }
    modalData = data;
}

cardCiv = (data) => {
    let card = document.createElement('div');
    card.innerHTML = `
    <div class="card col-sm-2">
      <div class="card-body">
        <h4 class="card-title">`+ data.name + `</h4>
        <p class="card-text">Expansion: `+ data.expansion + `</p>
        <button type="button" onclick="modal(`+ data.id + `)">Details</button>
      </div>
    </div>
    `;
    main.appendChild(card);
}

cardUni = (data) => {
    let card = document.createElement('div');
    card.innerHTML = `
    <div class="card col-sm-2">
      <div class="card-body">
        <h4 class="card-title">`+ data.name + `</h4>
        <p class="card-text">`+ data.description + `</p>
        <button type="button" onclick="modal(`+ data.id + `)">Details</button>
      </div>
    </div>
    `;
    main.appendChild(card);
}

cardEst = (data) => {
    let card = document.createElement('div');
    card.innerHTML = `
    <div class="card col-sm-2">
      <div class="card-body">
        <h4 class="card-title">`+ data.name + `</h4>
        <p class="card-text">Expansion: `+ data.expansion + `</p>
        <button type="button" onclick="modal(`+ data.id + `)">Details</button>
      </div>
    </div>
    `;
    main.appendChild(card);
}

cardTec = (data) => {
    let card = document.createElement('div');
    card.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">`+ data.name + `</h4>
        <p class="card-text">`+ data.description + `</p>
        <button type="button" onclick="modal(`+ data.id + `)">Details</button>
      </div>
    </div>
    `;
    main.appendChild(card);
}

//Modal

modal = (id) => {
    let data = modalData[id - 1];

    document.body.style.overflow = 'hidden'

    if (!!data) {
        delete data.id;
        let keys = Object.keys(data);
        let vals = Object.values(data);
        mod.innerHTML = `<div id='modalHeader'><button onclick="modalHide()">X</button></div>`;
        for (let i = 0; i < keys.length; i++) {
            keys[i] = keys[i].split('_').join(' ');
            switch (typeof vals[i]) {
                case 'string':
                    if (vals[i].includes('ttps://age-of-empires-2')) {
                        vals[i] = vals[i].split('_').join(' ');
                        vals[i] = vals[i].split('/');
                        vals[i] = [vals[i].pop(), vals[i].pop()];
                        vals[i] = vals[i].reverse();
                        mod.innerHTML += `<div class='row'><h3>` + keys[i] + `:</h3>` + `<button onclick="redirect('` + vals[i][0] + `','` + vals[i][1] + `')">` + vals[i][1] + `</button>` + `</div><br>`;
                    } else
                        mod.innerHTML += `<div class='row'><h3>` + keys[i] + `:</h3>` + vals[i] + `</div><br>`;

                    break;
                case 'object':
                    mod.innerHTML += `<div class='row'><h3>` + keys[i] + `</h3>`;
                    if (!!vals[i].length) {
                        mod.innerHTML += `<ul>`
                        vals[i].forEach(val => {
                            if (val.includes('ttps://age-of-empires-2')) {
                                val = val.split('_').join(' ');
                                val = val.split('/');
                                val = [val.pop(), val.pop()];
                                val = val.reverse();
                                mod.innerHTML += `<button onclick="redirect('` + val[0] + `','` + val[1] + `')">` + val[1] + `</button>`
                            } else
                                mod.innerHTML += `<li>` + val + `</li>`

                        });
                        mod.innerHTML += `</ul>`
                    } else {

                        let keys2 = Object.keys(vals[i]);
                        let vals2 = Object.values(vals[i]);
                        for (let j = 0; j < keys2.length; j++)
                            mod.innerHTML += `<p> ` + `<b>` + keys2[j] + ` : </b>` + vals2[j] + `</p>`
                    }
                    mod.innerHTML += `</div><br>`;
                    break;

            }

        }
        mod.className = '';
        modalS.className = '';
    }



}

modalHide = () => {
    mod.innerHTML = '';
    mod.className = 'hidden';
    modalS.className = 'hidden';
    document.body.style.overflow = 'scroll'
}


//Redirect

redirect = async (ent, name) => {
    let id;
    mod.innerHTML = `<h2>Please Wait...</h2>`
    switch (ent) {
        case 'civilization':
            await changeEntity(1);
            btnCiv.className = 'active'
            btnUni.className = ''
            btnEst.className = ''
            btnTec.className = ''
            break;
        case 'unit':
            await changeEntity(2);
            btnCiv.className = ''
            btnUni.className = 'active'
            btnEst.className = ''
            btnTec.className = ''
            break;
        case 'structure':
            await changeEntity(3);
            btnCiv.className = ''
            btnUni.className = ''
            btnEst.className = 'active'
            btnTec.className = ''
            break;
        case 'technology':
            await changeEntity(4);
            btnCiv.className = ''
            btnUni.className = ''
            btnEst.className = ''
            btnTec.className = 'active'
            break;
    }
    name = name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

    id = modalData.findIndex((data)=>data.name == name);
    modal(id+1);
}





//setup
btnCiv.onclick = () => {
    changeEntity(1);
    btnCiv.className = 'active'
    btnUni.className = ''
    btnEst.className = ''
    btnTec.className = ''
}
btnUni.onclick = () => {
    changeEntity(2);
    btnCiv.className = ''
    btnUni.className = 'active'
    btnEst.className = ''
    btnTec.className = ''
}

btnEst.onclick = () => {
    changeEntity(3);
    btnCiv.className = ''
    btnUni.className = ''
    btnEst.className = 'active'
    btnTec.className = ''
}

btnTec.onclick = () => {
    changeEntity(4);
    btnCiv.className = ''
    btnUni.className = ''
    btnEst.className = ''
    btnTec.className = 'active'
}

modal.className = 'hidden'
modalS.className = 'hidden'
