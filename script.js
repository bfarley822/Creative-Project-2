document.getElementById("boredSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  let s = document.getElementById('selectorType');
  let type = s.options[s.selectedIndex].value;
  let typeCheck = document.getElementById('typeCheck').checked;

  let participantsCheck = document.getElementById('participantsCheck').checked;
  const participants = document.getElementById("participantsInput").value;

  let priceCheck = document.getElementById('priceCheck').checked;
  let price = document.getElementById("priceInput").value;

  let url = "https://www.boredapi.com/api/activity";

  document.getElementById("boredResults").innerHTML = "<p>Waiting on results...</p>";

  if (typeCheck) {
    url += "?type=";
    url += type;
  }
  else if (participantsCheck) {
    if (participants === "") {
          return;
    }
    url += "?participants=";
    url += participants;
  }
  else if (priceCheck) {
    if (price === "") {
          return;
    }
    newPrice = parseFloat(price)
    if (newPrice > 100 || newPrice < 0) {
      return;
    }
    url += "?price=";
    url += newPrice / 100.0;
  }

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let results = "";
      results += "Activity: " + json.activity;
      results += "</br>Type: " + json.type;
      results += "</br>Participants: " + json.participants;
      results += "</br>Price: $" + Math.floor(parseFloat(json.price) * 100);

      document.getElementById("boredResults").innerHTML = results;

    });
});

document.getElementById("typeCheck").addEventListener("click", function(event) {
  document.getElementById("participantsCheck").checked = false;
  document.getElementById("priceCheck").checked = false;
  document.getElementById("priceInput").value = "";
  document.getElementById("participantsInput").value = "";
});

document.getElementById("participantsCheck").addEventListener("click", function(event) {
  document.getElementById("typeCheck").checked = false;
  document.getElementById("priceCheck").checked = false;
  document.getElementById("priceInput").value = "";
});

document.getElementById("priceCheck").addEventListener("click", function(event) {
  document.getElementById("participantsCheck").checked = false;
  document.getElementById("typeCheck").checked = false;
  document.getElementById("participantsInput").value = "";
});

document.getElementById("jokeSubmit").addEventListener("click", function(event) {
  let url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit,religious,political";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let results = "";
      if (json.type == "single") {
        results += json.joke;
      }
      else {
        results += json.setup;
        results += "</br>" + json.delivery;
      }
      document.getElementById("jokeResults").innerHTML = results;
    });
});

/*document.getElementById("memeSubmit").addEventListener("click", function(event) {
  let url = "https://api.imgflip.com/get_memes";
  let index = getRandomInt(100);
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let results = "";
      results += json.data.memes[index].name;
      results += "</br><img src='" + json.data.memes[index].url + "'>";
      document.getElementById("memeResults").innerHTML = results;
    });
});*/

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.getElementById("nameSubmit").addEventListener("click", function(event) {
  let name = document.getElementById("nameInput").value;
  if (name === "") {
    return;
  }
  let url = "https://api.agify.io?name=";;
  url += name;
  url += "&country_id=US"
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let results = "";
      results += name + " is " + json.age + " years old.";
      document.getElementById("nameResults").innerHTML = results;
    });
});

document.getElementById("genderSubmit").addEventListener("click", function(event) {
  let name = document.getElementById("nameInput").value;
  if (name === "") {
    return;
  }
  let url = "https://api.genderize.io?name=";;
  url += name;
  url += "&country_id=US"
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let results = "";
      results += "I'm " + (parseFloat(json.probability) * 100) + "% certain that " + name + " is " + json.gender;
      document.getElementById("genderResults").innerHTML = results;
    });
});
