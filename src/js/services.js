// import $ from 'jquery';
export function buildButtons() {
  const array = ["a", 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let buttons = "";
  array.forEach(function(letter){
    buttons += `<button type="button" class='btn button' id='${letter}' value='${letter}'>${letter}</button>`;
  });
  return buttons;
}