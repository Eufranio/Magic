let cardsURL = "https://api.magicthegathering.io/v1/cards";
let requestCards = new XMLHttpRequest();
requestCards.open('GET', cardsURL);
requestCards.responseType = 'json';
requestCards.send();

let cardsList = [];


function showCard(jsonObj, id) {

  //pega carta em portugues
  let curCard = jsonObj[id];
    let options = curCard['foreignNames'];
    
    let cardBr;
    for(let i = 0; i < options.length; i+=1){
      let curOption = options[i];
      if(curOption['language'] == 'Portuguese (Brazil)'){
        cardBr = curOption;
        break;
      }
    }

  let content = document.getElementById("cardsList");
  
  let cardname = jsonObj[id]['name'].replace(/\s+/g, ''); 
  //cardname = cardname.replace("," , ''); 
  cardname = cardname.replace(/'/g,''); 

  let cardImg = document.createElement("img");
  cardImg.id = cardname + '.img';
  imgUrl = cardBr['imageUrl'];
  cardImg.src = imgUrl;
  cardImg.className += "image-width img-fluid";
  
  let modalfade = document.createElement('div');
  modalfade.className += "modal fade";
  modalfade.id = cardname + "modal";
  modalfade.setAttribute("tabindex", "-1"); 
  modalfade.setAttribute("role", "dialog");
  modalfade.setAttribute("aria-labelledby", modalfade.id + 'label');  
  modalfade.setAttribute("aria-hidden", "true"); 

  let modaldialog = document.createElement('div');
  modaldialog.className += "modal-dialog modal-lg modal-dialog-centered";
  modaldialog.setAttribute("role", "document");
  
  let modalcontent = document.createElement("div");
  modalcontent.className += "modal-content";
  
  let modalheader = document.createElement("div");
  modalheader.className += "modal-header";

  let header = document.createElement("h5");
  header.className += "modal-title";
  header.id = modalfade.id;
  header.textContent = jsonObj[id]['name'];

  let closebutton = document.createElement("button");
  closebutton.type = "button";
  closebutton.className += "close";
  closebutton.setAttribute("data-dismiss", "modal");
  closebutton.setAttribute("aria-label", "Close");

  let span = document.createElement('span');
  span.setAttribute("aria-hidden", "true");
  span.innerHTML = "&times;";

  closebutton.appendChild(span);
  modalheader.appendChild(header);
  modalheader.appendChild(closebutton);

  let modalbody = document.createElement('div');
  modalbody.className += "modal-body row justify-content-center";
  modalbody.id = "modalimage";
  let imgmodal = document.createElement('img');
  imgmodal.className = "col-sm-6 col-xs-1 img-fluid modal-image-width";
  imgmodal.src = cardImg.src;
  imgmodal.id = null;
  let bodytext = document.createElement("div");
  bodytext.className = "col-sm-6 col-xs-1";
  let raridadeheader = document.createElement("h5");
  raridadeheader.className = "bold";
  raridadeheader.textContent = "Raridade";
  let raridade = document.createElement('p');
  raridade.textContent = jsonObj[id]['rarity'];
  let custoheader = document.createElement("h5");
  custoheader.className = "bold";
  custoheader.textContent = "Custo";
  let custo = document.createElement('p');
  custo.textContent = jsonObj[id]['cmc'];
  let descricaoheader = document.createElement("h5");
  descricaoheader.className = "bold";
  descricaoheader.textContent = "Descrição";
  let descricao = document.createElement('p');
  let foreignNames = jsonObj[id]['foreignNames'];
  let textTranslate = false;
  let text;
  for(let f = 0; f < foreignNames.length; f += 1){
    if(foreignNames[f]['language'] === 'Portuguese (Brazil)'){
      textTranslate = true;
      text = foreignNames[f]['text'];
      break;
    }
  }
  if(textTranslate){
    descricao.textContent = text;
  }else{
    descricao.textContent = jsonObj[id]['text'];
  }

  bodytext.appendChild(raridadeheader);
  bodytext.appendChild(raridade);
  bodytext.appendChild(custoheader);
  bodytext.appendChild(custo);
  bodytext.appendChild(descricaoheader);
  bodytext.appendChild(descricao);

  modalbody.appendChild(imgmodal);
  modalbody.appendChild(bodytext);
  

  modalcontent.appendChild(modalheader);
  modalcontent.appendChild(modalbody);
  modaldialog.appendChild(modalcontent);
  modalfade.appendChild(modaldialog);

 
  let imglink = document.createElement('a');
  imglink.setAttribute("href", "#");
  imglink.setAttribute("data-toggle", "modal" );
  //console.log("#" + modalfade.id);
  imglink.setAttribute("data-target","#" + modalfade.id);

  
  imglink.appendChild(cardImg);
  content.appendChild(imglink);
  content.appendChild(modalfade);
  //console.log(imglink.innerHTML);
  
}

function showList(jsonObj){
  for(let i= 0; i < jsonObj.length; i+= 1){
    showCard(jsonObj, i);
  }
}

requestCards.onload = function (){
  //let cartasPegadas = new Set([]);
  let cards;
  if(cardsList.length == 0)
    cards = requestCards.response['cards'];

  let modernList = [];
  for(let i = 0; i < 100; i += 1){
    
    //let id = Math.floor(Math.random()*100);
    let modern = false;
    for(let l = 0; l < cards[i]['legalities'].length;l += 1){
      if(cards[i]['legalities'][l]['format'] === 'Modern'){
        modern = true;
        break;
      }
    }
    if(modern)
      modernList.push(cards[i]);
  }

  for(let i = 0; cardsList.length < 60; i += 1){
    
    let id = Math.floor(Math.random()*100);
    cardsList.push(modernList[id]);
  }

  showList(cardsList);
}

