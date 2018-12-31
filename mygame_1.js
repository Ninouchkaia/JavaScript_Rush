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
    var randomCell1Val = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];
    var randomCell2Val = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];
    
    while (randomCell2Val === randomCell1Val) {

        randomCell2Val = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];
    }

    var randomCell1 = $(randomCell1Val);
    var randomCell2 = $(randomCell2Val);

    randomCell1.text(randomTile);
    randomCell1.css("background", "red");

    // $("#smallDiv2").text(randomTile);
    // $("#smallDiv2").css("background", "red");

    alert(randomCell2);
    randomCell2.text(randomTile);
    randomCell2.css("background", "yellow");

    // $("#smallDiv3").text(randomTile);
    // $("#smallDiv3").css("background", "yellow");



    // $(".colOne").getCellId();

    // randomCell1.getCellId();
    // randomCell2.getCellId();

    //recuperer les cellules vides dans une liste.
    //var emptyCells = [];
    



    // myBoard.find('div').each(function(){
    //     var innerDivId = $(this).attr('id');
    //     if (innerDivId.is(':empty')) 
    //         emptyCells.push(innerDivId);
    //    });

    // alert(emptyCells);
  },

  addTileArrow: function(myNumberedCells) {

    var myNumberedCells = $(this).getMyNumberedCells();
    alert("myNumberedCells" + myNumberedCells);
    var myBoard = $("#board");
    var numbers = [2,4];
    var randomTile = numbers[Math.floor(Math.random() * numbers.length)];

    var myNumberedIds = "";
    var i;
    for (i=0; i < myNumberedCells.length; i++)
    {
        myNumberedIds = myNumberedIds + myNumberedCells[i] + " ";               

    }

    var myChildrenDiv = $(".square-container:not(" + myNumberedIds + ")");
    var randomCellVal = myChildrenDiv[Math.floor(Math.random()*myChildrenDiv.length)];

    randomCell = $(randomCellVal)
    randomCell.text(randomTile);
    randomCell.css("background", "cyan");

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
            //alert ("ij " + i + " " + j );

            if ((myCellsArray[i][j].text()).length>0)
            {
                alert ("ij " + i + " " + j + " et ID = " + myCellsArray[i][j].attr('id'));
                myNumberedCells.push(myCellsArray[i][j].attr('id'));

            }
        }
    }
    return myNumberedCells;
  },

  switchTiles: function(myNumberedCell, myEmptyCell) {
    var myText = $(myNumberedCell).text();
    $(myEmptyCell).text(myText);
    $(myEmptyCell).css("background-color", $(myNumberedCell).css("background-color"));            
    $(myNumberedCell).text("");
    $(myNumberedCell).css("background", "pink");
  },

  moveTiles: function() {
    var myCellsArray = [];
    myCellsArray[0] = [$("#smallDiv1"), $("#smallDiv2"), $("#smallDiv3"), $("#smallDiv4")];
    myCellsArray[1] = [$("#smallDiv5"), $("#smallDiv6"), $("#smallDiv7"), $("#smallDiv8")]; 
    myCellsArray[2] = [$("#smallDiv9"), $("#smallDiv10"), $("#smallDiv11"), $("#smallDiv12")];
    myCellsArray[3] = [$("#smallDiv13"), $("#smallDiv14"), $("#smallDiv15"), $("#smallDiv16")];
    // myId = $(myCellsArray[3][3]).getCellId();

    $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            // return case (i,k) avec k = j+n la plus eloigne en haut
            //alert ("left");

            cells_not_empty = $(this).getMyNumberedCells(); 
            $(this).addTileArrow(cells_not_empty);
            var m=0;
            var myVal1 = 0;
            var myVal2 = 0;
            for (m; m<4; m++)
            {
                var i=0;
                var j;
                for (i; i<4; i++)
                {
                    j = 1;
                    for (j; j<4; j++)
                    {
                        //alert(i+ " " + j);

                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            //alert(i+ " " + j + " " + myCellsArray[i][j].text());
                            // convertir en int
                            myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i][j-1].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j-1]));
                            }

                            else (myCellsArray[i][j-1].text() == myCellsArray[i][j].text())
                            {
                                //alert (myCellsArray[i][j-1].text());
                                // convertir en int
                                myVal2 = parseInt(myCellsArray[i][j-1].text());
                                myCellsArray[i][j].text(myVal1+myVal2);
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j-1]));

                            }
                        }
                
                    }
                }
            }    


        break;

        case 38: // up
            //alert ("up");
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
                        //alert(i+ " " + j);

                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            //alert(i+ " " + j + " " + myCellsArray[i][j].text());
                            var myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i-1][j].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i-1][j]));
                            }
                            else 
                            {
                                //alert (myCellsArray[i][j-1].text());
                                // convertir en int
                                var myVal2 = parseInt(myCellsArray[i-1][j].text());
                                myCellsArray[i][j].text(myVal1+myVal2);
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i-1][j]));
                            }    
                        }
                
                    }
                }
            }    
        break;

        case 39: // right
            //alert ("right");
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
                        //alert(i+ " " + j);

                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            //alert(i+ " " + j + " " + myCellsArray[i][j].text());
                            var myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i][j+1].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j+1]));
                            }
                            else 
                            {
                                //alert (myCellsArray[i][j-1].text());
                                // convertir en int
                                var myVal2 = parseInt(myCellsArray[i][j+1].text());
                                myCellsArray[i][j].text(myVal1+myVal2);
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i][j+1]));
                            }

                        }
                
                    }
                }
            }    

        break;

        case 40: // down
             //alert ("down");
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
                        //alert(i+ " " + j);

                        if ((myCellsArray[i][j].text()).length>0)
                        {
                            //alert(i+ " " + j + " " + myCellsArray[i][j].text());
                            var myVal1 = parseInt(myCellsArray[i][j].text());

                            if (myCellsArray[i+1][j].text().length == 0)
                            {
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i+1][j]));
                            }
                            else 
                            {
                                //alert (myCellsArray[i][j-1].text());
                                // convertir en int
                                var myVal2 = parseInt(myCellsArray[i+1][j].text());
                                myCellsArray[i][j].text(myVal1+myVal2);
                                $(this).switchTiles($(myCellsArray[i][j]), $(myCellsArray[i+1][j]));
                            }
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


  