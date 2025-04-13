const buttons = document.querySelectorAll("button");
const result = document.getElementById('resultat');

function buttonClicked(e) {
    let buttonId = e.target.id;
    const valeur1 = document.getElementById('valeur1').value;
    const valeur2 = document.getElementById('valeur2').value;

    if (valeur1 === '' || valeur2 === '') {
        result.innerHTML = 'Veuillez entrer des nombres dans les deux champs.';
        return;
    }

    const num1 = parseFloat(valeur1);
    const num2 = parseFloat(valeur2);

    if (buttonId === "+") {
        result.innerHTML = num1 + num2;
    } else if (buttonId === "-") {
        result.innerHTML = num1 - num2;
    } else if (buttonId === "*") {
        result.innerHTML = num1 * num2;
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", buttonClicked);
});
