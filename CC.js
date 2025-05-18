// this is API link to fetch
const BASE_URL =
  "https://v6.exchangerate-api.com/v6/6b1774c282e0e1b691024841/latest/";
// select the options where country will select
const optionsSelect = document.querySelectorAll(".options select");
// acces the button
const button = document.querySelector(".output button");
// access from select and to select
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
// access the input message
let ipMsg = document.querySelector(".amount p");
// access the icon
const icon = document.querySelector(".fa-solid");
// access the money exchange icon
const money_icon = document.querySelector(".fa-money-bill-transfer");
// for(let code in countryList){
//     console.log(code,countryList[code]); //fetch the country list

// Add the new options in the select country where country will be selected
for (let select of optionsSelect) {
  for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    // set first select will be USD and INR
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOptions.selected = "selected";
    }
    // add new option on select
    select.append(newOptions);
  }
  // add an event listner to know the changes
  select.addEventListener("change", (evt) => {
    // cal the update flage function
    updateFlag(evt.target); // give those element where we change mean from or to along with html tag
  });
}
// change flage along with the country
const updateFlag = (element) => {
  let currCode = element.value; // extract this value which is selected from evt.target
  let countryCode = countryList[currCode]; // extract the country code to change the img scr link
  let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`; // make new link
  let img = element.parentElement.querySelector("img"); // acces the img tag
  img.src = newLink; // update the new flag img scr link
};

// add event listner in button
button.addEventListener("click", async (evt) => {
  // change the posion which is write in input box
  ipMsg.classList.add("amountMsgReset");
  // button toggle
  button.classList.add("button_toggle");
  setTimeout(() => {
    button.classList.remove("button_toggle");
  }, 100);

  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "") {
    amount.placeholder = "Enter Money ";
    amountValue = "0";
    money_icon.classList.remove("icon_green");
    money_icon.classList.add("icon_red");
  } else if (amountValue <= 0) {
    amount.value = "";
    amount.placeholder = "Money can't negative or 0";
    amountValue = "0";
    money_icon.classList.remove("icon_green");
    money_icon.classList.add("icon_red");
  }
  // make new Api url to extract exchange rate
  const URL = `${BASE_URL}${fromCurr.value}`;
  // get the responce
  let responce = await fetch(URL);
  // fetch the data from responce
  let data = await responce.json();
  // find my fromCurr data
  let rate = data.conversion_rates[toCurr.value];
  // multiplying the rate
  let exchangeRate = (amountValue * rate).toFixed(3);
  // change the message
  console.log(exchangeRate.length);
  document.querySelector(
    ".msg"
  ).innerText = `${amountValue} ${fromCurr.value} = ${exchangeRate} ${toCurr.value}`;
  if (exchangeRate > 0) {
    money_icon.classList.remove("icon_red");
    money_icon.classList.add("icon_green");
  }
  if (exchangeRate.length > 12) {
    document.querySelector(".msg").classList.add("msg1");
  }
});
// create a event listner to swap the values
icon.addEventListener("click", (evt) => {
  document.querySelector(".fa-solid").classList.add("iconRotate");
  // remove icon rotate class after some time
  setTimeout(() => {
    document.querySelector(".fa-solid").classList.remove("iconRotate");
  }, 500);
  //swap the value
  let tempValue = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = tempValue;
  // update the flag also
  updateFlag(fromCurr);
  updateFlag(toCurr);
  // update msg also
  document.querySelector(
    ".msg"
  ).innerText = `0 ${fromCurr.value} = 0 ${toCurr.value}`;
});
let input = document.querySelector(".amount input");
input.addEventListener("click", (evt) => {
  ipMsg.classList.add("amountMsgReset");
});
