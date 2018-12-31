jQuery.fn.extend({
  mygame: function(size) {

    var gameObject = this[0].id; // gets the id of the element to which the plugin is applied.
    var blockSize = size; // records the size of the side of an atomic element. There are 16 atomic elements.
    var boardSize = 4 * blockSize + (16); // represents the size of the side of the map (square). = 4 * mindSize

    //alert(gameObject);
    this.appendDiv(boardSize);
    this.insertChildrenDiv(blockSize);
    this.moveTiles();

    
    //this.addTile();

    var gameBoard = this;

    $("#INITIATE_GAME").click(function(){
        //alert(this); // renvoit "[object HTMLButtonElement]"
        //this.addTile(); // donc ne marche pas car this fait référence au bouton // l'elelent qui call la methode
        gameBoard.addTile();
    });
    
    },

  appendDiv: function(boardSize)  {
    //alert('tot');

    //var divBoard = "toto";
    //alert(boardSize);
    var divBoard = "<div id=\"board\" class=\"board\" style= \"height:" + boardSize + "; width: " + boardSize + ";\"> </div>";   
    this.append(divBoard);     // Append new elements
  },

  insertChildrenDiv: function(blockSize) {

    var myBoard = $("#board");
    //alert(blockSize);
    myBoard.append("<div id=\"smallDiv1\" class=\"square-container rowZero colZero\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv2\" class=\"square-container rowZero colOne\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv3\" class=\"square-container rowZero colTwo\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv4\" class=\"square-container rowZero colThree\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv5\" class=\"square-container rowOne colZero\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv6\" class=\"square-container rowOne colOne\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv7\" class=\"square-container rowOne colTwo\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv8\" class=\"square-container rowOne colThree\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv9\" class=\"square-container rowTwo colZero\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv10\" class=\"square-container rowTwo colOne\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv11\" class=\"square-container rowTwo colTwo\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv12\" class=\"square-container rowTwo colThree\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv13\" class=\"square-container rowThree colZero\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv14\" class=\"square-container rowThree colOne\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv15\" class=\"square-container rowThree colTwo\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    myBoard.append("<div id=\"smallDiv16\" class=\"square-container rowThree colThree\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
  },

  getCellId: function() {
    this.map(function() {
        alert (this.id);
        return this.id;
      });
      
  },

  addTile: function() {
    //alert('hello');
    $(".square-container").empty();
    $(".square-container").css("background", "pink");

    var myBoard = $("#board");
    var numbers = [2,4];
    var randomTile = numbers[Math.floor(Math.random() * numbers.length)];

    var myChildrenDiv = $(".square-container");
    var randomCell1 = $(myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)]);
    var randomCell2 = $(myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)]);
    while (randomCell2 === randomCell1) {
        randomCell2 = $(myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)]);
    }
    randomCell1.text(randomTile);
    randomCell1.css("background", "red");

    randomCell2.text(randomTile);
    randomCell2.css("background", "blue");

    // $(".colOne").getCellId();

    // randomCell1.getCellId();
    // randomCell2.getCellId();

    // alert($(randomCell1).type);
    // return (randomCell1.id,randomCell2.id)

    //recuperer les cellules vides dans une liste.
    //var emptyCells = [];
    



    // myBoard.find('div').each(function(){
    //     var innerDivId = $(this).attr('id');
    //     if (innerDivId.is(':empty')) 
    //         emptyCells.push(innerDivId);
    //    });

    // alert(emptyCells);
  },

  getCoordinates: function() {
    var myBoard = $("#board");
    var myChildrenDiv = $(".square-container");
  },


  moveTiles: function() {
    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            alert ("left");
            // on stocke la cellule vide la plus a gauche 
            var i;
            for (i=0; i<4; i++)
            {
                var emptyCells = [];
                var myEmptyCell = null;
                $('.rowZero').each(function() {
                    if (($(this).text()).length==0) // la cellule n'est pas vide
                        emptyCells.push(this);
                });
                myEmptyCell = emptyCells[0];
                alert(emptyCells[0].id); // c'est la premiere dans la liste, car each parcourt de gauche a droite
                
                // on cherche la cellule contenant un chiffre la plus a gauche pour la deplacer
                var numberedCells = [];
                var myNumberedCell = null;
                $('.rowZero').each(function() {
                    if (($(this).text()).length>0) // la cellule n'est pas vide
                        numberedCells.push(this);
                });
                myNumberedCell = numberedCells[0];
                alert(numberedCells[0].id); // idem

                // on passe le content de la cellule remplie la plus a gauche dans la cellule vide la plus a gauche.
                alert($(myNumberedCell).text());
                var myText = $(myNumberedCell).text();
                $(myEmptyCell).text(myText);
                $(myEmptyCell).css("background", $(myNumberedCell).css("background-color"));
                
                $(myNumberedCell).text("");
                $(myNumberedCell).css("background", "pink");
            }
            





            $('.rowOne').each(function() {
            });
            $('.rowTwo').each(function() {
            });
            $('.rowThree').each(function() {
            });

        break;

        case 38: // up
            alert ("up");
            var emptyCells = [];
            $('.colZero').each(function() {
                if (($(this).text()).length==0) // la cellule n'est pas vide
                    emptyCells.push(this.id);
            });
            alert(emptyCells[emptyCells.length-1]);

            $('.colOne').each(function() {
            });
            $('.colTwo').each(function() {
            });
            $('.colThree').each(function() {
            });

        break;

        case 39: // right
            alert ("right");
        break;

        case 40: // down
            alert ("left");
        break;

        default: return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
    
    });
  },



});


$("#mygame").mygame(100);


