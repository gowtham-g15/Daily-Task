console.log("hello");
let ag=17;
if (ag>=18) {
    console.log("eligible for vote");
}
else{
    console.log("not eligible");
}
let c='b';
switch(a){
    case 'a':
        console.log("vowel");
        break;
    case 'e':
        console.log("vowel");
        break;
    case 'i':
        console.log("vowel");
        break;
    case 'o':
        console.log("vowel");
        break;
    case 'u':
        console.log("vowel");   
        break;
 
    default:
        console.log("consonant");

    }
//positive and negative
num=-1;
if(num<0){
    console.log("negative");
}
else{
    console.log("positive");
}

//Task5:Grades
const a=prompt("Enter mark:");
if(a>=90 && a<=100){
    console.log(a+" O grade");
}else if(a>=80 && a<90){
    console.log(a+" A grade");
}
else if(a>=70 && a<80){
    console.log(a+" B grade");
}
else if(a>=60 && a<70){
    console.log(a+" C grade");
}
else if(a>=50 && a<60){
    console.log(a+" D grade");
}
else if(a<50){
    console.log("Fail");
}
else{
    console.log("Invalid");
}

n=10;
if(n%2==0){
    console.log("even");
}
else{
    console.log("odd");
}

let i;
 for(i=0;i<=5;i++){
    console.log("*".repeat(i));
 }
 let a1=5;
for(i=0;i<=15;i++){
    console.log(i ,"* 5 =",i*5  );
}

let sum =0;
for(i=0;i<=50;i++){
    sum=sum+i;
}
console.log("Sum of numbers from 1 - 50 is ",sum);

//Arrow Function
const pattern = (n) =>{
    for(i=1;i<=n;i++)
        console.log("*".repeat(i));

 }
 pattern(7); 
 function abc(x,y){
    console.log(x+y);
}
abc(2,2);

function abc(name,company){
    console.log("hi "+ name +"  welcome to "+company);
}
abc("akv","tcs");
