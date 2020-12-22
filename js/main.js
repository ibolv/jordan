var matr = [[4, 1, 2, 1, 0],
            [6, 1, 1, 0, 1],
            [10, 1, -1, -2, 3]];

var matrSimp = [[16, 2, -1, 0, -2, 1, 0],
                [18, 3, 2, 1, -3, 0, 0],
                [24, -1, 3, 0, 4, 0, 1],
                [0, 2, 3, 0, -1, 0, 0]];

var simplex = true;

function matrix(matr, simplex) {
    var table = document.createDocumentFragment();
    var arr = [];
    var sizeRow = 4;
    var sizeCell = 5;
    

    if (matr != undefined) {
        sizeRow = matr.length + 1;
        sizeCell = matr[0].length + 1;
    }

    for (var i = 0; i < sizeRow; i++) {
        var tr = document.createElement('tr');
        arr[i] = [];
        for (var j = 0; j < sizeCell; j++) {
            if (i == 0) {
                var th = document.createElement('th');
                if (j == 1) {
                    th.innerHTML = "1";
                }  else if (j != 0) {
                    th.innerHTML = "-x" + (j-1); 
                    }
                tr.appendChild(th);
            } else {
                var td = document.createElement('td');
                if (j != 0) {
                    var input = document.createElement('input');
                    input.value = matr[i-1][j-1];
                    td.appendChild(input);
                } else { 
                     if (i == (sizeRow - 1) && simplex == true) {td.innerHTML = "F=";} else {td.innerHTML = "0=";};
                }
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);
    }
    document.getElementById('main').appendChild(table);
}

function getInput(tag, arr){
    var input = document.createElement('input');
    if (arr == undefined) {
        input.value = getRandom();
      }else{
        input.value = arr;
      }
    tag.appendChild(input);
}

function getMatrix() {
    var table = document.getElementById('main');
    var th = table.querySelectorAll('th');
    var tr = table.querySelectorAll('tr');
    var td = table.querySelectorAll('td');
    var arr = [];
    for (var i = 0; i < tr.length; i++) {
        arr[i] = [];
        for (var j = 0; j < th.length; j++) {
            var k = j+(i-1)* th.length;
            if (i == 0 ) {
            arr[i][j] = th[j].innerHTML;
            }else{
		        if(j == 0){
		        arr[i][j] = td[k].innerHTML;
		        }else{
                    var input = td[k].querySelector('input');
		            arr[i][j] = input.value;
                }
            }
        }
    }
    var arrNew = [];
    for (var i = 0; i < tr.length; i++) {
        arrNew[i] = [];
        for (var j = 0; j < th.length; j++) {
            if (i != 0 && j != 0) {
                arrNew[i - 1][j - 1] = arr[i][j] - 0;
            }
        }  
    }
    arrNew.splice(3,3);

    console.log(arr);
    console.log(arrNew);
    console.log(tr.length);
    return {arrNew : arrNew, arr : arr};
}

function invers(arr, arrNew, inputX, inputY) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (i != 0 && j != 0) {
            arr[i][j] = arrNew[i-1][j-1];
            }
            if (j == inputY + 1) {
                arr[0][j] = "0";
            }
            if (i == inputX + 1) {
                arr[i][0] = "x" + '<sub>' + (i) + '</sub>'+ "= ";
            }

        }
    }
    return arr;
}

function conversionStep(arr){
    var table = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var tr = document.createElement('tr');
      for(var j = 0; j < arr[i].length; j++) {
        if(i == 0){
          var th = document.createElement('th');
          th.innerHTML = arr[i][j];
          tr.appendChild(th);
        }else{
          var td = document.createElement('td');
          td.innerHTML = arr[i][j];
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    document.getElementById('main').appendChild(table);
  }

function createBut() {
    var but = document.getElementById('but');
    var divMain = document.createDocumentFragment();
    var div = document.getElementById("buts-add");

    var inputX = document.createElement('input');
    inputX.type = 'text';
    inputX.id = 'in'
    inputX.classList = 'inputX';
    but.appendChild(inputX);
    var inputY = document.createElement('input');
    inputY.type = 'text'
    inputY.classList = 'inputY';
    but.appendChild(inputY);

    var arr = getMatrix();
    var butt = document.createElement("input");
    butt.type = "button";
    butt.value = 'Решить';
    but.appendChild(butt);
    butt.addEventListener('click', function() {dis(arr)});

    var addCells = document.createElement("input");
    addCells.type = "button";
    addCells.value = 'Добавить столбец';
    div.appendChild(addCells);
    addCells.addEventListener('click', function() {addCell()});

    var delCells = document.createElement("input");
    delCells.type = "button";
    delCells.value = 'Удалить столбец';
    div.appendChild(delCells);
    delCells.addEventListener('click', function() {delCell()});

    var addRows = document.createElement("input");
    addRows.type = "button";
    addRows.value = 'Добавить строку';
    div.appendChild(addRows);
    addRows.addEventListener('click', function() {addRow()});

    var delRows = document.createElement("input");
    delRows.type = "button";
    delRows.value = 'Удалить строку';
    div.appendChild(delRows);
    delRows.addEventListener('click', function() {delRow()});

    var save = document.createElement("input");
    save.type = "button";
    save.value = 'save';
    div.appendChild(save);
    save.addEventListener('click', function() {
        arr = getMatrix();
        return arr});



}



function dis(arr) {    
        var ae = aeInp();
        arr.arrNew = methodJordan(ae.inputX, ae.inputY, arr.arrNew);
       // matrix(arr.arrNew);
        //invers(arr.arr, arr.arrNew, ae.inputX, ae.inputY);
        console.log(arr.arr);
        conversionStep(invers(arr.arr, arr.arrNew, ae.inputX, ae.inputY));
}

function methodJordan(razrElemX, razrElemY, a) {
    var arr = [];
    if (a[razrElemX][razrElemY] != 0) {
        for (var i = 0; i < a.length; i++) {
            arr[i] = []
            for (var j = 0; j < a[i].length; j++) {
               arr[i][j] = (a[i][j] * a[razrElemX][razrElemY] - a[i][razrElemY] * a[razrElemX][j]) / a[razrElemX][razrElemY];
               if (i == razrElemX && j !== razrElemY) {
                    arr[i][j] = a[razrElemX][j] / a[razrElemX][razrElemY];
               }
               if (j == razrElemY && i !== razrElemX) {
                    arr[i][j] = a[i][razrElemY] / a[razrElemX][razrElemY];
               }
            }
        }
        arr[razrElemX][razrElemY] = 1/a[razrElemX][razrElemY];
    }
    return arr;
}

function getRandom(){
    var min = -10;
    var max = 10;
    return Math.floor(Math.random()*(max-min))+min;
 }

// Удалить строку
function delRow(){
    var matr = document.getElementById('main');
    var size = matr.getElementsByTagName('tr').length - 1;
    if (size > 1) {
      matr.deleteRow(size);
    }
  }
  
  // Удалить столбец
  function delCell(){
    var matr = document.getElementById('main');
    var sizeRow = matr.getElementsByTagName('tr').length;
    var size = matr.getElementsByTagName('th').length - 1;
    if (size > 1) {
      for (var i = 0; i < sizeRow; i++) {
        matr.rows[i].deleteCell(size);  }
    }
  }
  
  // Добавить строку
  function addRow(){
    var table = document.getElementById('main');
    var tr = table.querySelectorAll('tr');
    var len = table.querySelectorAll('th').length;
    var row = table.insertRow(tr.length);
    for (var i = 0; i < len; i++) {
      var cell = row.insertCell(i);
      if (i == 0) { 
          cell.id = "Y"
          cell.innerHTML = "0=";
      }else
          getInput(cell);
    }
  }
  // Добавить столбец
  function addCell(){
    var table = document.getElementById('main');
    var tr = table.querySelectorAll('tr');
    var th_len = table.querySelectorAll('th').length;
    var len = tr.length;
    for (var i = 0; i < len; i++) {
      var newCell;
      if (i == 0) {
        newCell = document.createElement('th');
        newCell.innerHTML  = "-x" + '<sub>' + (th_len-1);
      }else{
        newCell = document.createElement('td');
        getInput(newCell);
      }
      tr[i].appendChild(newCell); 
    }
  }

function aeInp() {
    let inputX = document.getElementsByClassName('inputX')[0].value - 0;
    let inputY = document.getElementsByClassName('inputY')[0].value - 0;
   return {inputX : inputX, inputY : inputY };
}



window.onload = function () {
    matrix(matr,simplex);
    createBut();
}
