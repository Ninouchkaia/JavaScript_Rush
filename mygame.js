jQuery.fn.extend({
  mygame: function(size) {

    var gameObject = this[0].id; // gets the id of the element to which the plugin is applied.
    var blockSize = size; // records the size of the side of an atomic element. There are 16 atomic elements.
    var boardSize = 4 * blockSize + (16); // represents the size of the side of the map (square). = 4 * mindSize

    this.appendDiv(boardSize);
    this.insertChildrenDiv(blockSize);
    this.moveTiles();

    var gameBoard = this;

    $("#INITIATE_GAME").click(function(){
        //alert(this); // renvoit "[object HTMLButtonElement]"
        //this.addTile(); // donc ne marche pas car this fait référence au bouton // l'elelent qui call la methode
        gameBoard.addTile();
    });

    
    },

  appendDiv: function(boardSize)  {

    var divBoard = "<div id=\"board\" class=\"board\" style= \"height:" + boardSize + "; width: " + boardSize + ";\"> </div>";   
    this.append(divBoard);     // Append new elements
  },

  insertChildrenDiv: function(blockSize) {

    var myBoard = $("#board");
    var i;
    for (i=1; i<17; i++)
    {
        myBoard.append("<div id=\"smallDiv" + i + "\" class=\"square-container\" style= \"height:" + blockSize + "; width: " + blockSize + ";\"></div>");
    }
  },

  gestionDesCouleurs: function() {
    var myBoard = $("#board");
    var myChildrenDiv = $(".square-container");
    myBoard.children().each(function () {
        var content = $(this).text();
        switch(content) {
        case "" : 
            $(this).css("background-color", "pink");
            break;
        case "2" : 
            $(this).css("background-color", "#ff6633");
            break;   
        case "4" : 
            $(this).css("background-color", "#ffcc33");
            break;
        case "8" : 
            $(this).css("background-color", "#ccff33");
            break;
        case "16" : 
            $(this).css("background-color", "#66ff33");
        
            break;
        case "32" : 
            $(this).css("background-color", "#33ff66");
        
            break;
        case "64" : 
            $(this).css("background-color", "#33ffcc");
        
            break;
        case "128" :
            $(this).css("background-color", "#33ccff"); 
        
            break;
        case "256" :
            $(this).css("background-color", "#3366ff"); 
        
            break;
        case "512" : 
            $(this).css("background-color", "#6633ff");
        
            break;                     
        case "1024" :
            $(this).css("background-color", "#cc33ff"); 
        
            break;
        case "2048" : 
            $(this).css("background-color", "#ff33cc");
            alert("you won !!! CONGRATS !!!");
        
            break;
        case "4096" :
            $(this).css("background-color", "#ff3366");
        
            break;     
        }

       });

  },

  getCellId: function() {
    this.map(function() {
        return this.id;
      });
      
  },

  addTile: function() {
    $(".square-container").empty();
    $(".square-container").css("background", "pink");
    $(this).gestionDesCouleurs();


    var myBoard = $("#board");
 
    var myChildrenDiv = $(".square-container");
    var randomCell1Val = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];
    var randomCell2Val = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];
    
    while (randomCell2Val === randomCell1Val) 
    {
        randomCell2Val = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];
    }

    var randomCell1 = $(randomCell1Val);
    var randomCell2 = $(randomCell2Val);

    var numbers = [2,4];
    var randomTile = numbers[Math.floor(Math.random() * numbers.length)];

    randomCell1.text(randomTile);

    var randomTile = numbers[Math.floor(Math.random() * numbers.length)]; // il faut relancer un random sinon les deux tiles ont la meme valeur

    randomCell2.text(randomTile);
    $(this).gestionDesCouleurs();
  },

  // cest la fonction qui genere une nouvelle valeur random quand on actionne les fleches, mais seulement s'il s'est passe un mouvement
  addTileArrow: function(myNumberedCells) {

    var myNumberedCells = $(this).getMyNumberedCells();
    
    if (myNumberedCells.length < 16)

    {
        var myBoard = $("#board");
        var numbers = [2,4];
        var randomTile = numbers[Math.floor(Math.random() * numbers.length)];
        var myNumberedIds = "";
        var i;
        for (i=0; i < myNumberedCells.length-1; i++)
        {
            myNumberedIds = myNumberedIds + "#" + myNumberedCells[i] + ", ";
        }
        myNumberedIds = myNumberedIds + "#" + myNumberedCells[myNumberedCells.length-1];

        var myEmptyDiv = $(".square-container:not(" + myNumberedIds + ")");
        var randomCellVal = myEmptyDiv[Math.floor(Math.random()*myEmptyDiv.length)];
        randomCell = $(randomCellVal)
        randomCell.text(randomTile);
    } 

    else 
    {
        alert ("GAME OVER");
    }

    $(this).gestionDesCouleurs();



  },

  // c'est la fonction qui retourne les cellules "interdites" car contenant deja un nombre, retourne les cellules pleines sous forme de liste
  getMyNumberedCells: function() {
    var myCellsArray = [];
    myCellsArray[0] = [$("#smallDiv1"), $("#smallDiv2"), $("#smallDiv3"), $("#smallDiv4")];
    myCellsArray[1] = [$("#smallDiv5"), $("#smallDiv6"), $("#smallDiv7"), $("#smallDiv8")]; 
    myCellsArray[2] = [$("#smallDiv9"), $("#smallDiv10"), $("#smallDiv11"), $("#smallDiv12")];
    myCellsArray[3] = [$("#smallDiv13"), $("#smallDiv14"), $("#smallDiv15"), $("#smallDiv16")];

    var i=0;
    var j;
    var myNumberedCells = [];
    for (i; i<4; i++)
    {   j=0;
        for (j; j<4; j++)
        {
            if ((myCellsArray[i][j].text()).length>0)
            {
                myNumberedCells.push(myCellsArray[i][j].attr('id'));

            }
        }
    }
    return myNumberedCells;
  },

  // echange deux cases
  switchTiles: function(myNumberedCell, myEmptyCell) {
    $(this).gestionDesCouleurs();
    var myText = $(myNumberedCell).text();
    $(myEmptyCell).text(myText);
    $(myEmptyCell).css("background-color", $(myNumberedCell).css("background-color"));            
    $(myNumberedCell).text("");
    $(myNumberedCell).css("background", "pink");
  },

  moveTiles: function() {
    var myCellHasMoved = [];
    var i = 0;
    for (i; i<4; i++)
    {
        var j = 0;
        myCellHasMoved[i] = [];
        for (j; j<4; j++)
        {
            myCellHasMoved[i][j] = 0;
        }
    }

    var myCellsArray = [];
    myCellsArray[0] = [$("#smallDiv1"), $("#smallDiv2"), $("#smallDiv3"), $("#smallDiv4")];
    myCellsArray[1] = [$("#smallDiv5"), $("#smallDiv6"), $("#smallDiv7"), $("#smallDiv8")]; 
    myCellsArray[2] = [$("#smallDiv9"), $("#smallDiv10"), $("#smallDiv11"), $("#smallDiv12")];
    myCellsArray[3] = [$("#smallDiv13"), $("#smallDiv14"), $("#smallDiv15"), $("#smallDiv16")];

    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left

            // initialisation de l'array 2D myCellHasMoved.
            for (i=0; i<4; i++) // on remet tout a zero avant de changer les valeurs pour laisser danciennes cellules fusionner
            {
                myCellHasMoved[i] = [];
                for (j=0; j<4; j++)
                {
                    myCellHasMoved[i][j] = 0;
                }
            }
            ///////


            var myVal1 = 0;
            var myVal2 = 0;
            var hasSwitch = 0;
            var hasMerge = 0;
            for (var m=0; m<4; m++)
            {
                var i=0;
                var j;
                for (i; i<4; i++)
                {
                    j = 1;
                    for (j; j<4; j++)
                    {
                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i][j-1].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j-1]));
              
                                //myCellHasMoved[i][j] = 1;
                                //myCellHasMoved[i][j-1] = 1;
                                hasSwitch = 1;

                            }

                            else if ( (myCellsArray[i][j-1].text() == myCellsArray[i][j].text()) &&  (myCellHasMoved[i][j-1] == 0) &&  (myCellHasMoved[i][j] == 0))
                            {
                                myVal2 = parseInt(myCellsArray[i][j-1].text());
                                myCellsArray[i][j-1].text(myVal1+myVal2);
                                myCellsArray[i][j].text("");

                                hasMerge = 1;
                                myCellHasMoved[i][j] = 1;
                                myCellHasMoved[i][j-1] = 1;
                            }
                        } 
                    }
                }
            }  

            if ((hasMerge == 1) || (hasSwitch == 1))
            {
                $(this).addTileArrow();
            }



            else if (($(this).getMyNumberedCells()).length == 16)
            {
                alert("GAME OVER");
            }

            $(this).gestionDesCouleurs();



        break;

        case 38: // up  

            // initialisation de l'array 2D myCellHasMoved.
            for (i=0; i<4; i++) // on remet tout a zero avant de changer les valeurs pour laisser danciennes cellules fusionner
            {
                myCellHasMoved[i] = [];
                for (j=0; j<4; j++)
                {
                    myCellHasMoved[i][j] = 0;
                }
            }
            ///////


            var myVal1 = 0;
            var myVal2 = 0;
            var hasSwitch = 0;
            var hasMerge = 0;
            for (var m=0; m<4; m++)
            {
                var i;
                var j=0;
                for (j; j<4; j++)
                {
                    i = 1;
                    for (i; i<4; i++)
                    {
                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i-1][j].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i-1][j]));
              
                                //myCellHasMoved[i][j] = 1;
                                //myCellHasMoved[i-1][j] = 1;
                                hasSwitch = 1;

                            }

                            else if ( (myCellsArray[i-1][j].text() == myCellsArray[i][j].text()) &&  (myCellHasMoved[i-1][j] == 0) &&  (myCellHasMoved[i][j] == 0))
                            {
                                myVal2 = parseInt(myCellsArray[i-1][j].text());
                                myCellsArray[i-1][j].text(myVal1+myVal2);
                                myCellsArray[i][j].text("");

                                hasMerge = 1;
                                myCellHasMoved[i][j] = 1;
                                myCellHasMoved[i-1][j] = 1;
                            }
                        } 
                    }
                }
            }  

            if ((hasMerge == 1) || (hasSwitch == 1))
            {
                $(this).addTileArrow();
            }

            else if (($(this).getMyNumberedCells()).length == 16)
            {
                alert("GAME OVER");
            }
            $(this).gestionDesCouleurs();
        break;

        case 39: // right

            // initialisation de l'array 2D myCellHasMoved.
            for (i=0; i<4; i++) // on remet tout a zero avant de changer les valeurs pour laisser danciennes cellules fusionner
            {
                myCellHasMoved[i] = [];
                for (j=0; j<4; j++)
                {
                    myCellHasMoved[i][j] = 0;
                }
            }
            ///////


            var myVal1 = 0;
            var myVal2 = 0;
            var hasSwitch = 0;
            var hasMerge = 0;
            for (var m=0; m<4; m++)
            {
                var i=3;
                var j;
                for (i; i>=0; i--)
                {
                    j = 2;
                    for (j; j>=0; j--)
                    {
                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i][j+1].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j+1]));
              
                                //myCellHasMoved[i][j] = 1;
                                //myCellHasMoved[i][j+1] = 1;
                                hasSwitch = 1;

                            }

                            else if ( (myCellsArray[i][j+1].text() == myCellsArray[i][j].text()) &&  (myCellHasMoved[i][j+1] == 0) &&  (myCellHasMoved[i][j] == 0))
                            {
                                myVal2 = parseInt(myCellsArray[i][j+1].text());
                                myCellsArray[i][j+1].text(myVal1+myVal2);
                                myCellsArray[i][j].text("");

                                hasMerge = 1;
                                myCellHasMoved[i][j] = 1;
                                myCellHasMoved[i][j+1] = 1;
                            }
                        } 
                    }
                }
            }  

            if ((hasMerge == 1) || (hasSwitch == 1))
            {
                $(this).addTileArrow();
            }
            else if (($(this).getMyNumberedCells()).length == 16)
            {
                alert("GAME OVER");
            }
            $(this).gestionDesCouleurs(); 

        break;

        case 40: // down
            var myVal1 = 0;
            var myVal2 = 0;
            var hasSwitch = 0;
            var hasMerge = 0;

            // initialisation de l'array 2D myCellHasMoved.
            for (i=0; i<4; i++) // on remet tout a zero avant de changer les valeurs pour laisser danciennes cellules fusionner
            {
                myCellHasMoved[i] = [];
                for (j=0; j<4; j++)
                {
                    myCellHasMoved[i][j] = 0;
                }
            }
            ///////

            for (var m=0; m<4; m++)
            {
                var i;
                var j=0;
                for (j; j<4; j++)
                {
                    i = 2;
                    for (i; i>=0; i--)
                    {
                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i+1][j].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i+1][j]));
              
                                //myCellHasMoved[i][j] = 1;
                                //myCellHasMoved[i+1][j] = 1;
                                hasSwitch = 1;

                            }

                            else if ( (myCellsArray[i+1][j].text() == myCellsArray[i][j].text()) &&  (myCellHasMoved[i+1][j] == 0) &&  (myCellHasMoved[i][j] == 0))
                            {
                                myVal2 = parseInt(myCellsArray[i+1][j].text());
                                myCellsArray[i+1][j].text(myVal1+myVal2);
                                myCellsArray[i][j].text("");

                                hasMerge = 1;
                                myCellHasMoved[i][j] = 1;
                                myCellHasMoved[i+1][j] = 1;
                            }
                        } 
                    }
                }
            }  

            if ((hasMerge == 1) || (hasSwitch == 1))
            {
                $(this).addTileArrow();
            }
            else if (($(this).getMyNumberedCells()).length == 16)
            {
                alert("GAME OVER");
            }
            $(this).gestionDesCouleurs();
        break;

        default: return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
    
    });
  },



});


$("#mygame").mygame(100);


  