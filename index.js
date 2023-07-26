//get data from API
//get name of Pokemon
let pokemons = {};
fetch("https://pokeapi.co/api/v2/pokemon/").then(respones => {
    console.log(respones);
    if(respones.ok)
        return respones.json();
}).then(pokemons => {      
    console.log(pokemons['results']);
    var pokemonList = pokemons['results'];
    pokemonList.forEach(item => {
        
        Add2List(item['name'], item['url']);
    });
    //call function    
}).catch( error => {
    console.log("can't fetch data from API.")
});

//create function to add to list
var Add2List = (name, url)=>{
    var urlsplited = url.split("/");
    console.log(urlsplited[6]);
    var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + 
        urlsplited[6] + ".png"

    var pokemonDiv = document.getElementById("pokemonlist");
    var card = document.createElement("div")
    card.setAttribute("class", "card col-3");
    // <div class="card">
    // </div>

    var imag = document.createElement("img");
    imag.setAttribute("class", "card-img-top");
    imag.setAttribute("src", imageUrl);
    //<img src="" class="card-img-top"> 
    
    var nameDiv = document.createElement("div")
    nameDiv.setAttribute("class", "card-body");
    // <div class="card-body">
    var title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = name;
    // <h5 class="card-title">Card title</h5>// <h5 class="card-title">Card title</h5>
    var button = document.createElement("a");
    button.setAttribute("class", "btn btn-primary","center");
    button.setAttribute("href", "#");
    button.innerText = "more...";
    button.addEventListener("click", () => {
        // Function to show more details about the selected Pokémon
        showDetails(name);
    });
    // <a href="#" class="btn btn-primary">Go somewhere</a>
    nameDiv.appendChild(title);
    nameDiv.appendChild(button);

    card.appendChild(imag);
    card.appendChild(nameDiv);
    // <div class="card">
    // <img src="" class="card-img-top">
     // <div class="card-body">
     // <h5 class="card-title">Card title</h5>
     // </div>
    // </div>
    pokemonDiv.appendChild(card);

}// Function to show the modal with Pokémon details
var showDetails = (name) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then(response => {
        if (response.ok)
          return response.json();
      })
      .then(pokemonDetails => {
        // Display Pokémon details in the modal
        var modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
        var modalTitle = document.getElementById("modalTitle");
        var modalImage = document.getElementById("modalImage");
        var modalDetails = document.getElementById("modalDetails");
  
        modalTitle.innerText = name;
        modalImage.setAttribute("src", pokemonDetails.sprites.front_default);
  
        // Customize how you want to display the Pokémon details here
        modalDetails.innerHTML = `
          <p>Height: ${pokemonDetails.height} </p>
          <p>Weight: ${pokemonDetails.weight} </p>
          <p>Base Experience: ${pokemonDetails.base_experience}</p>
          <!-- Add more details if needed -->
        `;
  
        modal.show();
      })
      .catch(error => {
        console.log("Can't fetch Pokémon details from the API.");
      });
  };
