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

    var randomTile = numbers[Math.floor(Math.random() * numbers.length)];

    randomCell2.text(randomTile);
    $(this).gestionDesCouleurs();
  },

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
              
                                myCellHasMoved[i][j] = 1;
                                myCellHasMoved[i][j-1] = 1;
                                hasSwitch = 1;

                            }

                            else if ( (myCellsArray[i][j-1].text() == myCellsArray[i][j].text()) &&  (myCellHasMoved[i][j-1] == 0) &&  (myCellHasMoved[i][j] == 0))
                            {
                                //alert(myCellsArray[i][j-1].text());
                                myVal2 = parseInt(myCellsArray[i][j-1].text());
                                myCellsArray[i][j-1].text(myVal1+myVal2); // CHANGEMENT !!!
                                //$(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j-1]));
                                //vider la cellule myCellsArray[i][j-1]  // CHANGEMENT
                                myCellsArray[i][j].text("");

                                hasMerge = 1;
                                
                                // for (i=0; i<4; i++) // on remet tout a zero avant de changer les valeurs pour laisser danciennes cellules fusionner
                                // {
                                //     myCellHasMoved[i] = [];
                                //     for (j=0; j<4; j++)
                                //     {
                                //         myCellHasMoved[i][j] = 0;
                                //     }
                                // }
                                myCellHasMoved[i][j] = 1;
                                myCellHasMoved[i][j-1] = 1;
                                //break;
                            }
                        } 
                    }
                }
            }  

            if ((hasMerge == 1) || (hasSwitch == 1))
            {
                $(this).addTileArrow();
            }
            $(this).gestionDesCouleurs();



        break;

        case 38: // up
            $(this).gestionDesCouleurs();
            var m=0;
            for (m; m<4; m++)
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
                            var myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i-1][j].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i-1][j]));
                            }
                            // else if (myCellsArray[i-1][j].text() == myCellsArray[i][j].text())
                            // {
                            //     var myVal2 = parseInt(myCellsArray[i-1][j].text());
                            //     myCellsArray[i][j].text(myVal1+myVal2);
                            //     $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i-1][j]));
                            // }    
                        }
                
                    }
                }
            }    
        break;

        case 39: // right
            $(this).gestionDesCouleurs();        
            var m=0;
            for (m; m<4; m++)
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
                            var myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i][j+1].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j+1]));
                            }
                            // else if (myCellsArray[i][j+1].text() == myCellsArray[i][j].text())
                            // {
                            //     var myVal2 = parseInt(myCellsArray[i][j+1].text());
                            //     myCellsArray[i][j].text(myVal1+myVal2);
                            //     $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j+1]));
                            // }

                        }
                
                    }
                }
            }    

        break;

        case 40: // down
            $(this).gestionDesCouleurs();        
            var m=0;
            for (m; m<4; m++)
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
                            var myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i+1][j].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i+1][j]));
                            }
                            // else if (myCellsArray[i+1][j].text() == myCellsArray[i][j].text())
                            // {
                            //     var myVal2 = parseInt(myCellsArray[i+1][j].text());
                            //     myCellsArray[i][j].text(myVal1+myVal2);
                            //     $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i+1][j]));
                            // }
                        }
                
                    }
                }
            }   
        break;

        default: return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
    
    });
  },



});


$("#mygame").mygame(100);


  