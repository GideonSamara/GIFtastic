$(document).ready(function () {

  var fruits = ["Apples", "Bananas", "Berries", "Grapefruits", "Grapes", "Lemons", "Melons", "Oranges", "Peaches", "Pears"];

  function renderButtons() {
    $('#buttons-view').empty;

    for (var i = 0; i < activity.length; i++) {

      var a = $("<button>"); //jquery command for new button

      a.addClass("fruits"); //adding class of "activity" to our button

      a.attr("data-name", activity[i]); //adds data-attribute

      a.text(fruits[i]); // provides initial button text

      $("#buttons-view").append(a); //adding button to the HTML

    }

    //Generate 10 giphys for the activities
    $("button").on("click", function () {

      var fruits = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=Sx8XLNPcuBuasL0tY4VjqnBGGWWoI0Z4";

      $.ajax({

        url: queryURL,

        method: "GET",

      }).then(function (response) {

        console.log(response);

        var results = response.data;

        for (var j = 0; j < results.length; j++) {

          var fruitsImage = $("<img>");

          fruitsImage.addClass("image");

          fruitsImage.attr('src', results[j].images.fixed_height_still.url);

          fruitsImage.attr('data-state', 'still');

          var stillImage = fruitsImage.attr('data-still', results[j]

            .images.fixed_height_still.url);

          console.log(stillImage);

          var animateImage =fruitsImage.attr('data-animate', results[j].images.fixed_height.url);

          console.log(animateImage);

          fruitsDiv.append(fruitsImage);
      
          $("#gifs-appear-here").prepend(fruitsDiv);

        }

      });

    }); 

  }; 

  //call renderbuttons function
  renderButtons();

  //FUNCTION to handle events when "add-activity" button is clicked
  $("#add-fruits").on("click", function (event) {

    event.preventDefault(); //prevents buttons default behavior when clicked (which is submitted a form)

    var newFruits = $("#fruits-input").val().trim() //grabs input from the textbox

    activity.push(newFruits);

    renderButtons();

  });

  // FUNCTION to Animate/Still GIPHY on button click
  $("body").on("click", ".image", function () {

    let state = $(this).attr("data-state");

    if (state === 'still') {

      let animate = $(this).attr("data-animate");

      $(this).attr("src", animate);

      $(this).attr("data-state", "animate");

      state = $(this).attr("animate");

      console.log('animate');

    } 
    
    else {

      let still = $(this).attr("data-still");

      $(this).attr("src", still);

      $(this).attr("data-state", "still");

      state = $(this).attr("data-state", "still");

      console.log('still');

    }

  });

});
