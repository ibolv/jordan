console.log(matrSimp);

var aeArrX = [];
var aeArrY = [];
var x,y;

function isBanX(elem) {
    for (var i = 0; i < aeArrX.length; i++) {
        if (elem == aeArrX[i]) {
            return false;
        } else { return true;}
    }
}


function isBanY(elem) {
    for (var i = 0; i < aeArrY.length; i++) {
        if (elem == aeArrY[i]) {
            return false;
        } else { return true;}
    }
}

function getMinValue(arr){
    var min = 100000000000000000000000000000000;
    var inpX = 0; 
    var inpY = 0;
    var arrAE = [];
    for (var i = 0; i < arr.length; i++) {
        arrAE[i] = [];
        for (var j = 1; j < arr[i].length; j++) {
              if (arr[i][j] != 0  && arr[i][j] > 0) {
                     arrAE[i][j] = arr[i][0] / arr[i][j];
                } 
        }
    }
    for (var i = 0; i < arrAE.length; i++) {
        for (var j = 1; j < arrAE[i].length; j++) {
                 if (min > arrAE[i][j]  && arrAE[i][j] > 0 && j != y && i != x) {
                     console.log(j);
                     console.log(aeArrY[i]);
                    min = arrAE[i][j];
                    inpX = i;
                    inpY = j;
            }
                
        }
    }

    aeArrX.push(inpX);
    aeArrY.push(inpY);
    x= inpX;
    y = inpY; 
   // console.log(inpX)
   // console.log(inpY)
    return {min:min, inpX:inpX, inpY:inpY};
}


function isNegative(arr) {
    var n = 0;
        for (var j = 0; j < arr[0].length; j++) {
            for (var k = 0; k < aeArrY.length; k++) {
            
            if (arr[arr.length - 1][j] > 0 && j != aeArrY[k]) {
                n++;
                console.log(arr[arr.length - 1][aeArrY[j]]);
            }
        }
        }
    return n

}

function simplexMethod(arr) {
    //console.log(getMinValue(arrAE).inpY);
    var getMin = getMinValue(arr);
    var inpX = getMin.inpX;
    var inpY = getMin.inpY;
    var newArr = methodJordan(inpX, inpY, arr);
    console.log(newArr);
    console.log(newArr[arr.length - 1][0]);
    while (n != 0) {
        var n = isNegative(newArr);
        getMin = getMinValue(newArr);
        inpX = getMin.inpX;
        inpY = getMin.inpY;
        newArr = methodJordan(inpX, inpY, newArr);
        console.log(newArr);
        

    }
  // isNegative(newArr);
  console.log(aeArrX); 
  console.log(aeArrY);
  console.log(newArr);
  

    
}


simplexMethod(matrSimp);