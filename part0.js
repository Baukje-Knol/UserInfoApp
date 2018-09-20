// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// now, write a function that finds all the indexes of where the value is located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]
let array = ['apple','orange','durian','pineapple','plum','durian','apple','orange','apple']
function find(word){
  var position=[]
  for(let i=0; i<array.length;i++){
    if(array[i] === word){
      position.push(i)
    }}
    if (position =="") {
      console.log("-1")
    }
    else{
      console.log(position)
    }
    }

find('durian');
find('apple');
find('orange');
find('grape');
find('pineapple');
