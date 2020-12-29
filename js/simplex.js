//console.log(matrSimp);

var aeArrX = [matr.length - 1];
var aeArrY = [0];

function isBan(elem, arr) {
    var n = 0;
    for (var i = 0; i < arr.length; i++) {
        if (elem == arr[i]) {
            n++;
        }
    }
    return n;
}


function getMinValue(arr){
    var min = 100000000000000000000000000000000;
    var inpX = 0; 
    var inpY = 0;
    var arrAE = [];

    for (var k = 1; k < arr[0].length; k++) {
        if (min > arr[arr.length - 1][k] && isBan(k, aeArrY) == 0) {
            min = arr[arr.length - 1][k];
            inpY = k;
            console.log(k);
        } 
    }
    min = 100000000000000000000000000000000;

    for (var i = 0; i < arr.length - 1; i++) {
        arrAE [i] = [];
        if (arr[i][inpY] > 0) {
            arrAE[i][inpY] = arr[i][0] / arr[i][inpY];
            if (min > arrAE[i][inpY] && isBan(i, aeArrX) == 0) {
                min = arrAE[i][inpY];
                console.log(i);
                inpX = i;
            }
        }
    }

    // for (var i = 0; i < arr.length; i++) {
    //     arrAE[i] = [];
    //     for (var j = 1; j < arr[i].length; j++) {
    //           if (arr[i][j] != 0  && arr[i][j] > 0) {
    //                  arrAE[i][j] = arr[i][0] / arr[i][j];
    //             } 
    //             if (min > arrAE[i][j]  && arrAE[i][j] > 0 && isBan(j, aeArrY) == 0 && isBan(i, aeArrX) == 0) {
    //                 min = arrAE[i][j];
    //                 inpX = i;
    //                 inpY = j;
    //         }
    //     }
    // }

    aeArrX.push(inpX);
    aeArrY.push(inpY); 
   // console.log(inpX)
   // console.log(inpY)
    return {min:min, inpX:inpX, inpY:inpY};
}


function isNegative(arr) {
    var n = 0;
        for (var j = 0; j < arr[0].length; j++) {
            if (arr[arr.length - 1][j] < 0 && isBan(j, aeArrY) == 0) {
                n++;
            }
        }
    return n

}

function simplexMethod(arr) {
    //console.log(getMinValue(arrAE).inpY);
    var getMin = getMinValue(arr.arrNew);
    var inpX = getMin.inpX;
    var inpY = getMin.inpY;
    var newArr = methodJordan(inpX, inpY, arr.arrNew);
    console.log(newArr);
    //console.log(newArr[arr.length - 1][0]);
    conversionStep(invers(arr.arr, newArr, inpX, inpY));
     while (1) {
         if (aeArrX.length == newArr.length && isNegative(newArr) != 0) {
             var div = document.getElementById('but');
             var span = document.createElement('span');
             div.appendChild(span);
             span.innerHTML = '<br>' + 'Последняя строка содержит отрицательные элементы. Пространство допустимых решений неограниченно. Решения не существует.'
             console.log('Последняя строка содержит отрицательные элементы. Пространство допустимых решений неограниченно. Решения не существует.');
             break;
         }
         if (isNegative(newArr) == 0 && aeArrX.length == newArr.length) {
             var div = document.getElementById('but');
             var span = document.createElement('span');
             div.appendChild(span);
             span.innerHTML = '<br>' + 'Ответ:' + newArr[newArr.length - 1][0];
             console.log('Ответ', newArr[newArr.length - 1][0]);
             break;
         }
        getMin = getMinValue(newArr);
        inpX = getMin.inpX;
        inpY = getMin.inpY;
        
        console.log(newArr);
        newArr = methodJordan(inpX, inpY, newArr);
        console.log(newArr);
        
        conversionStep(invers(arr.arr, newArr, inpX, inpY));
    }
   // console.log((-1) * newArr[newArr.length - 1][0]);
  // isNegative(newArr);
  console.log(aeArrX); 
  console.log(aeArrY);
  console.log(newArr);
  return newArr;
  

    
}

//simplexMethod(matr);
