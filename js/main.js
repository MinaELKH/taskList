/*window.addEventListener("load", function() {
    let task= localStorage.getItem("taskStorage");
    task = JSON.parse(task) ; 
    

});*/

let ulTodo = document.getElementById("ulTodo"); 
let ulDoing = document.getElementById("ulDoing"); 
let ulDone = document.getElementById("ulDone"); 


let id = 0 ;
let cmpTacheToDo = 0 ; 
let cmpTachedDoing = 0 ; 
let cmpTacheDone = 0 ; 

/*    Recupere les elements  */

let titre = document.getElementById("titre") ; 
let description = document.getElementById("description"); 
let priorite= document.getElementById("priorite") ; 
let date = document.getElementById("date") ; 
let erreurForm = document.getElementById("pargErreur"); 


let titre1 = document.getElementById("titre1") ; 
let description1 = document.getElementById("description1"); 
let priorite1= document.getElementById("priorite1") ; 
let date1 = document.getElementById("date") ; 



let cmp_ToDo= document.getElementById("cmp_ToDo");
let cmp_Doing= document.getElementById("cmp_Doing");
let cmp_Done= document.getElementById("cmp_Done");




let arrayTaches = [];
if (localStorage.getItem("taskStorage")){
    console.log(" je suis pas vide ")
    arrayTaches = JSON.parse(localStorage.getItem("taskStorage")) ; 
}
RechargeDataLocalStorage(arrayTaches); 

function RechargeDataLocalStorage(arrayTaches){
    arrayTaches.forEach(tache => {
        //console.log(tache); 
        let li = document.createElement('li'); 
        li.setAttribute("id_data" , tache.id)
        li.setAttribute("data_titre", tache.titre);
        li.setAttribute("data_description",   tache.description);
        li.setAttribute("data_statut", tache.statut);
        li.setAttribute("data_date", tache.date);
        li.setAttribute("data_priorite", tache.priorite);

        li.innerHTML =  tacheCodeHtml(tache);
        AppendTache(tache.statut  , li )  ; 
        
    });
}


/*    event listener   hide formulaire affiche et desafficher */
document.getElementById("btnOpenAjoutForm").addEventListener("click", function(){ document.getElementById("modalFormAjout").classList.remove("hidden");} );
document.getElementById("closeFormAjout").addEventListener("click", function(){document.getElementById("modalFormAjout").classList.add("hidden");});
document.getElementById("closeFormAjout").addEventListener("click", function(){document.getElementById("pargErreur").classList.add("hidden");});
document.getElementById("closeFormEdit").addEventListener("click", function(){document.getElementById("modalFormEdit").classList.add("hidden");});


/* icon */
let iconDeletedUpdate = `   <span  onclick="SupprimerTache(this)" class="material-symbols-outlined cursor-pointer text-red-500 hover:text-red-400"> delete </span> 
                             <span   onclick="showformEdit(this)"  class="material-symbols-outlined  cursor-pointer  text-yellow-300">border_color</span>`




/*    event listener  button Ajout  */
document.getElementById("btnAjoutTache").addEventListener("click" , AjouterTache);




/* Réinitialiser form */
function initForm(){
        titre.value = '';
        description.value = '';
        document.getElementById("radio_todo").checked = true;
        date.value = "jj/mm/aaaa";
        priorite.value = "0";
        erreurForm=''; 
}


/*    function : ajout Tache     */
function tacheCodeHtml(tache){
    Codehtml=`       
    <li class="  grid   border rounded-lg shadow-xl bg-white m-4 p-4  gap-2">
    <div  class="flex  justify-between items-center text-center ">
      <h5 class="titre text-lg font-semibold  text-gray-700 border-b-2 border-indigo-200">${tache.titre}</h5> 
     
     <div  class="flex justify-center items-center gap-2 text-center"> 
       <span  onclick="SupprimerTache(this)" class=" material-symbols-outlined   cursor-pointer text-red-500 hover:text-red-400  h-4 w-4 "> delete </span> 
       <span   onclick="showformEdit(this)"  name_form="btnEdit" class="  material-symbols-outlined  cursor-pointer  text-yellow-300 h-4 w-4 ">border_color</span>
      </div>

     </div>
     <div class="flex justify-between center items-center gap-2 text-center" >
     <span class="block bg-orange-500  text-center   text-white font-semibold  gray-500   rounded-full w-10 h-4 text-xs"> ${tache.priorite} </span>  
     <span class="text-center  text-gray-500 text-xs"> ${tache.date} </span>  
     </div>
       <p class="description text-gray-500 text-xs  "> ${tache.description}</p>

       <div class="flex  gap-4  justify-evenly my-2.5 rounded-full border border-indigo-200 px-4">
         <div >
         <input onclick="editstatut(this)" type="radio"   value="todo" name="radioa" class=" form-radio h-3 w-3 text-red-600 focus:ring-blue-500" checked />
         <label for="radio_todo" class="  text-xs text-red-500">To Do</label>
         </div>
         <div  flex   flex-col >
         <input onclick="editstatut(this)" type="radio"    value="doing" name="radioa" class="form-radio h-3 w-3 text-orange-600 focus:ring-blue-500" />
         <label for="radio_doing" class= " text-xs  text-orange-500">Doing</label>
         </div>
         <div flex   flex-col>
         <input  onclick="editstatut(this)"   type="radio"   value="done" name="radioa" class="form-radio h-3 w-3 text-green-600 focus:ring-blue-500" />
         <label for="radio_done" class=" text-xs  text-green-500">Done</label>
         </div>
       </div>
   </li>
          `; 

          return  Codehtml; 
}

function validation(tache){
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialise l'heure pour comparer uniquement les dates
    const date = new Date(tache.date);

    let erreur = "Veuillez vérifier :";
    console.log(tache ) ;
    console.log(date ) ;
    console.log(today) ;
    // Vérification des champs
    if (!tache.titre) {
        erreur += ' Titre';
    }
    if (!tache.description) {
        erreur += ' Description';
    }
    if (!tache.statut) {
        erreur += ' Statut';
    }
    if (tache.priorite === "") {
        erreur += ' Priorité';
    }

    if (!tache.date) {
        erreur += ' Date';
    } else if (date < today) {
        erreur += ' La date ne peut pas être dans le passé';
    }

    console.log(erreur)
    erreurForm.classList.remove("hidden"); 
    erreurForm.innerHTML= erreur ; 

}

function AjouterTache(event){
    event.preventDefault();
    id++ ; 
    /*  declaration Objet  */
    const tache = new Object() ;  //  const tache = {}    les deux ecriture sont correcte 
    tache.id = id ; 
    tache.titre = titre.value ; 
    tache.description = description.value  ;
    tache.statut = document.querySelector('input[name="statut"]:checked').value; ; 
    tache.date = date.value ; 
    tache.priorite = priorite.value ; 

    
    validation(tache) ;
    /* creation element li */
        let li = document.createElement('li'); 
    
        li.setAttribute("id_data" , tache.id)
        li.setAttribute("data_titre", tache.titre);
        li.setAttribute("data_description",   tache.description);
        li.setAttribute("data_statut", tache.statut);
        li.setAttribute("data_date", tache.date);
        li.setAttribute("data_priorite", tache.priorite);

        li.innerHTML =  tacheCodeHtml(tache);
        AppendTache(tache.statut  , li )  ; 

        initForm(); 
        arrayTaches.push(tache) ; 
        localStorage.setItem("taskStorage", JSON.stringify(arrayTaches));


}

/* ajout child li au ul */ 
function AppendTache(statut , li){
    switch(statut){
        case "todo" : ulTodo.appendChild(li) ; cmp_ToDo.innerHTML = ++cmpTacheToDo ; break;
        case "doing" : ulDoing.appendChild(li); cmp_Doing.innerHTML = ++cmpTachedDoing ; break;
        case "done" : ulDone.appendChild(li); cmp_Done.innerHTML = ++cmpTacheDone ; break;
      }
}

/*    function : Supprime Tache     */

function SupprimerTache(element){
    let li = element.parentNode.parentNode.parentNode; // pour arrive a li
    let st = li.getAttribute("data_statut") ; 
    li.remove();
    switch(st){
        case "todo" : cmp_ToDo.innerHTML = --cmpTacheToDo ; break;
        case "doing" :  cmp_Doing.innerHTML = --cmpTachedDoing ;  break;
        case "done" :  cmp_Done.innerHTML = --cmpTacheDone ;break;
      }
}

/*    function : modifier Tache     */
function showformEdit(element){

    let li = element.parentNode.parentNode.parentNode.parentNode;
    document.getElementById("modalFormEdit").classList.remove("hidden");
    titre1.value = li.getAttribute("data_titre");
    description1.value= li.getAttribute("data_description")
    priorite1.value= li.getAttribute("data_priorite")
 //   statut1.value= li.getAttribute("data_statut")

     document.getElementById("btnEditTache").onclick = function(event) {
        event.preventDefault();
      
        ModifierTache(li);
      
    }
}

function ModifierTache(li){
    
    const tache = new Object() ;  //  const tache = {}    les deux ecriture sont correcte 
    /* recuperation des value de form -- Objet */
    tache.id = li.getAttribute("id_data"); 
    tache.titre = titre1.value ; 
    tache.description = description1.value  ;
    tache.statut = document.querySelector('input[name="statut1"]:checked').value; ; 
    tache.date = date1.value ; 
    tache.priorite = priorite1.value ; 

    statutAvant = li.getAttribute("data_statut"); 

    li.setAttribute("id_data" , tache.id)
    li.setAttribute("data_titre", tache.titre);
    li.setAttribute("data_description",   tache.description);
    li.setAttribute("data_statut", tache.statut);
    li.setAttribute("data_date", tache.date);
    li.setAttribute("data_priorite", tache.priorite);

    li.innerHTML =  tacheCodeHtml(tache);
    if (statutAvant === tache.statut){
        li.innerHTML =  tacheCodeHtml(tache);
    } 
    else {
        AppendTache(tache.statut  , li )  ;
        switch(statutAvant){
            case "todo" : cmp_ToDo.innerHTML = --cmpTacheToDo ; break;
            case "doing" :  cmp_Doing.innerHTML = --cmpTachedDoing ;  break;
            case "done" :  cmp_Done.innerHTML = --cmpTacheDone ;break;
          } 
        
    }
}


/* Modifier place  statut */

function editstatut(element_Radiobtn) {
    let li = element_Radiobtn.parentNode.parentNode.parentNode; 
    statutAvant = li.getAttribute("data_statut"); 
    li.setAttribute("data_statut" , element_Radiobtn.value);

    AppendTache(element_Radiobtn.value  , li )  ;
    switch(statutAvant){
        case "todo" : cmp_ToDo.innerHTML = --cmpTacheToDo ; break;
        case "doing" :  cmp_Doing.innerHTML = --cmpTachedDoing ;  break;
        case "done" :  cmp_Done.innerHTML = --cmpTacheDone ;break;
      }  
}



