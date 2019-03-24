// Write your Pizza Builder JavaScript in this file.

// Constants
var basePrice = 10;
var ingredients = {
  pepperonni: { name: "Pepperonni", price: 1 },
  mushrooms: { name: "Mushrooms", price: 1 },
  greenPeppers: { name: "Green Peppers", price: 1 },
  whiteSauce: { name: "White sauce", price: 3 },
  glutenFreeCrust: { name: "Gluten-free crust", price: 5 }
};

// Initial value of the state (the state values can change over time)
var state = {
  pepperonni: true,
  mushrooms: true,
  greenPeppers: true,
  whiteSauce: false,
  glutenFreeCrust: true
};

// This function takes care of rendering the pizza based on the state
// This function is triggered once at the begining and everytime the state is changed
function renderEverything() {
  renderPepperonni();
  renderMushrooms();
  renderGreenPeppers();
  renderWhiteSauce();
  renderGlutenFreeCrust();

  renderButtons();
  renderPrice();
}

function renderPepperonni() {
  document.querySelectorAll(".pep").forEach(function($pep) {
    if (state.pepperonni) {
      $pep.style.visibility = "visible";
    } else {
      $pep.style.visibility = "hidden";
    }
  });
}

function renderMushrooms() {
  // Iteration 1: set the visibility of `<section class="mushroom">`
  document.querySelectorAll(".mushroom").forEach(function($mushroom) {
    state.mushrooms
      ? ($mushroom.style.visibility = "visible")
      : ($mushroom.style.visibility = "hidden");
  });
}

function renderGreenPeppers() {
  // Iteration 1: set the visibility of `<section class="green-pepper">`
  document.querySelectorAll(".green-pepper").forEach(function($greenPepper) {
    state.greenPeppers
      ? ($greenPepper.style.visibility = "visible")
      : ($greenPepper.style.visibility = "hidden");
  });
}

function renderWhiteSauce() {
  // Iteration 2: add/remove the class "sauce-white" of `<section class="sauce">`
  var whiteSauce = document.querySelector(".sauce");
  if (state.whiteSauce) {
    whiteSauce.classList.remove("sauce-white");
  } else {
    whiteSauce.classList.add("sauce-white");
  }
}

function renderGlutenFreeCrust() {
  // Iteration 2: add/remove the class "crust-gluten-free" of `<section class="crust">`
  var crust = document.querySelector(".crust");
  if (state.glutenFreeCrust) {
    crust.classList.remove("crust-gluten-free");
  } else {
    crust.classList.add("crust-gluten-free");
  }
}

function renderButtons() {
  // Iteration 3: add/remove the class "active" of each `<button class="btn">`
  document.querySelectorAll(".btn").forEach(function($button) {
    $button.classList.contains("active")
      ? $button.classList.remove("active")
      : $button.classList.add(".active");
  });
}

function renderPrice() {
  var priceList = document.querySelector(".price ul");
  priceList.innerHTML = "";

  var ingredientsWithState = Object.values({ ...ingredients })
    .map((ingredient, idx) => {
      ingredient.state = Object.values(this.state)[idx];
      return ingredient;
    })
    .filter(ingredient => {
      if (ingredient.state) {
        return ingredient;
      }
    });

  Object.values(ingredientsWithState).forEach(ingredient => {
    if (ingredient.state) {
      var priceItem = document.createElement("li");
      priceItem.innerHTML = `$${ingredient.price} ${ingredient.name}`;
      priceList.append(priceItem);
    }
  });

  var totalPrice = Object.values(ingredientsWithState).reduce((acum, ingredient) => acum + ingredient.price, 10);

  document.querySelector(".price strong").innerHTML = `$${totalPrice}`;
}

renderEverything();

// Iteration 1: Example of a click event listener on `<button class="btn btn-pepperonni">`
document.querySelector(".btn.btn-pepperonni").onclick = function() {
  state.pepperonni = !state.pepperonni;
  renderEverything();
};

// Iteration 1: Add click event listener on `<button class="btn btn-mushrooms">`
document.querySelector(".btn.btn-mushrooms").onclick = function() {
  state.mushrooms = !state.mushrooms;
  renderEverything();
};
// Iteration 1: Add click event listener on `<button class="btn btn-green-peppers">`
document.querySelector(".btn.btn-green-peppers").onclick = function() {
  state.greenPeppers = !state.greenPeppers;
  renderEverything();
};

// Iteration 2: Add click event listener on `<button class="btn btn-sauce">`
document.querySelector(".btn.btn-sauce").onclick = function() {
  state.whiteSauce = !state.whiteSauce;
  renderEverything();
};

// Iteration 2: Add click event listener on `<button class="btn btn-crust">`
document.querySelector(".btn.btn-crust").onclick = function() {
  state.glutenFreeCrust = !state.glutenFreeCrust;
  renderEverything();
};
