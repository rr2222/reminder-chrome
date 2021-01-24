
    //var DBDeleteRequest = window.indexedDB.deleteDatabase("keyToHerHeart");

    function openIndexedDB(){
        let openRequest = indexedDB.open("keyToHerHeart", 1);
        let db;

        openRequest.onupgradeneeded = function(){
            console.log("Atualizando...");
            db = openRequest.result;
            db.createObjectStore('items', { keyPath: "id", autoIncrement: true });
        };

        return openRequest;

    }
    

    function adicionarItem(){
        var titulo = document.getElementById("titulo");
        var descricao = document.getElementById("descricao");
        var data = document.getElementById("data");

        var item = new Item(titulo.value, descricao.value, new Date(), new Date(data.value));
        
        var db = openIndexedDB();

        db.onsuccess = function() {
            y = db.result;
            
            let transaction = y.transaction(["items"], "readwrite");

            let items = transaction.objectStore("items");

            items.autoIncrement;


            let request = items.add(item); 

            request.onsuccess = function() {
        
                window.location.replace("index.html");

            };

            request.onerror = function() {
                console.log("Error", request.error);
        };

        };
               
    }

    function readItems(){

            var db = openIndexedDB();
            
            db.onsuccess = function() {
                y = db.result;
                let transaction = y.transaction(["items"], "readwrite");

                let items = transaction.objectStore("items");
                 var x = items.getAll();
            x.onsuccess = function() {
                var z = x.result[0].finalDate;
                console.log(z);
                for(i = 0; i < x.result.length; i++){
                    console.log();
                    
                    var divMother = document.getElementById("mother");
                    var itemDiv = document.createElement('div');
                    itemDiv.classList.add("item", "item_style");
                    divMother.appendChild(itemDiv);
                    
                    var newDiv = document.createElement('div');
                    newDiv.classList.add("item_title");
                    itemDiv.appendChild(newDiv); 
    
    
                    //criando titulo tarefa e data
                    var tituloItem = document.createElement('p');
                    tituloItem.classList.add("title_card");
                    tituloItem.innerHTML = x.result[i].titulo;
                    newDiv.appendChild(tituloItem);
    
                    var dataItem = document.createElement('p');
                    dataItem.classList.add("title_card");
                    dataItem.innerHTML = "Data: " + formatarData(x.result[i].finalDate);
                    newDiv.appendChild(dataItem);
                    

                    // adicionar contador
                    var divCounter = document.createElement('div');
                    divCounter.classList.add('counter_down');
                    itemDiv.appendChild(divCounter);
                    var counterP = document.createElement('p');
                    divCounter.appendChild(counterP);
                    counterP.id = "contador"
                    counterP.innerHTML = countDownTimer(new Date(x.result[i].finalDate));
                    

                    // adiciona linha
                    var linhaHr = document.createElement('hr');
                    itemDiv.appendChild(linhaHr);
                    
                    // adiciona div descricao
                    var descricaoDiv = document.createElement('div');
                    descricaoDiv.classList.add("card_body");
                    itemDiv.appendChild(descricaoDiv); 
    
                    // criando conteudo descricao
                    var descricaoParagrafo = document.createElement('p');
                    descricaoParagrafo.classList.add("body_content");
                    descricaoParagrafo.innerHTML = x.result[i].descricao;
                    descricaoDiv.appendChild(descricaoParagrafo);
    
                    //criar div footer item
                    var footerDiv = document.createElement('div');
                    footerDiv.classList.add("card_footer");
                    itemDiv.appendChild(footerDiv);
                    
                    // itens footer
                    var listUl = document.createElement('ul');
                    listUl.classList.add("list_style");
                    footerDiv.appendChild(listUl);
                    var itemList = document.createElement("li");
                    itemList.innerHTML = "Editar";
                    itemList.style.color = '#06d6a0';
                    listUl.appendChild(itemList);
                    
                    
                    var itemList2 = document.createElement("li");
                    listUl.appendChild(itemList2);
                    var linkItem = document.createElement('a');
                    linkItem.href = "#";
                    linkItem.setAttribute('onclick', 'deleteData('+ x.result[i].id+')');
                    itemList2.appendChild(linkItem);

                    linkItem.innerHTML = "Remover";
                    linkItem.style.color = '#ef476f'; 
                    
                }
                
                };     
        
            };     
        
    }

function deleteData(itemKey){
    var db = openIndexedDB();

        db.onsuccess = function() {
            y = db.result;
            
            let transaction = y.transaction(["items"], "readwrite");

            let items = transaction.objectStore("items");

            var objectStoreRequest = items.delete(itemKey);

            objectStoreRequest.onsuccess = function() {
                document.location.reload(true);

            };
        };
               
}

function formatarData(data){
    let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();     
    return dataFormatada;
}

function countDownTimer(data){
    countDownDate = data.getTime();
    
    var x = setInterval(function() {

        
        var now = new Date().getTime();
      
        
        var distance = countDownDate - now;
      
        
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        
        document.getElementById("contador").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
      
        
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("contador").innerHTML = "EXPIRADO";
          alert("Data entrega tarefa chegou ao fim");
        }
      }, 1000);
}