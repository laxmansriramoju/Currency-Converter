const BaseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const amount=document.querySelector(".amount input");
const btn=document.querySelector(".exchange");
const currSelect=document.querySelectorAll(".select-currency select");
const toCurr=document.querySelector(".to-select");
const fromCurr=document.querySelector(".from-select");
const fromImg=document.querySelector(".from-img");
const toImg=document.querySelector(".to-img");
const result=document.querySelector(".result");
for(let select of currSelect){
    for(currCode in countryList){
        let option=document.createElement("option");
        option.value=currCode;
        option.innerText=currCode;
        if (select.name === "from-select" && currCode === "USD") {
            option.selected = "selected";
          } else if (select.name === "to-select" && currCode === "INR") {
            option.selected = "selected";
          }
        select.appendChild(option);
    };
};
function exchageRate(){
    let input=amount.value;
    if(input=""||input<=0){
        amount.value=1;
    }
    const URL=`${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    options={
        method:"GET"
    };
    fetch(URL,options)
    .then((responce)=>{
        return responce.json()
    })
    .then((jsonData)=>{
        let exchange=jsonData[toCurr.value.toLowerCase()];
        result.textContent=`${amount.value} ${fromCurr.value} = ${exchange*amount.value} ${toCurr.value}`;
    });
};
function fromCurrFlag(element){
    let countryCode=countryList[element.value];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    fromImg.src=newSrc; 
};
function toCurrFlag(element){
    let countryCode=countryList[element.value];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    toImg.src=newSrc; 
};
fromCurr.addEventListener("change",(evt)=>{
    fromCurrFlag(evt.target);
});
toCurr.addEventListener("change",(evt)=>{
    toCurrFlag(evt.target);
});
btn.addEventListener("click",(event)=>{
    event.preventDefault();
    exchageRate();
});
