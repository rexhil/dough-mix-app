
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const getRecipe = function(breadName){
	obj = {
		"levain":{
			"recipe": [ "White Flour", "Water(Start)", "Water(End)", "Starter", "Malt", "Fresh Yeast", "Salt"],
			"percentage":[100, 76, 8, 40, 1, 0.2, 2]
		},

		"levain-soy": {
			"recipe":    ["White Flour", "Water(Start)", "Water(End)", "Starter", "Malt", "Fresh Yeast", "Salt", "Soy Lindseed"],
			"percentage":[100, 76, 8, 40, 1, 0.2, 2, 30]
		},
		
		"classic": {
			"recipe":    ["Unbleached", "Wholewheat", "Water(Start)", "Water(End)", "Starter", "Salt"],
			"percentage":[80, 20, 78, 10, 40, 2]
		},
		
		"rye": {
			"recipe":    ["Unbleached", "Wholewheat", "Organic Rye", "Water(Start)", "Water(End)", "Starter", "Salt"],
			"percentage":[60, 20, 20, 76, 10, 40, 2]
		},
		
		"grain": {
			"recipe":    ["Unbleached", "Wholewheat", "Water(Start)", "Water(End)", "Starter", "Salt", "Grain Soak"],
			"percentage":[70, 30, 78, 10, 40, 2, 30]
		},
		
		"pure-rye": {
			"recipe":    ["Light sift rye", "Water(Start)", "Water(End)", "Starter", "Salt", "Malt"], 
			"percentage":[100, 80, 10, 35, 2, 1]
		},
		
		"emmer": {
			"recipe":    ["White Flour", "Unbleach", "Emmer", "Sprouted Wheat", "Water(Start)", "Water(End)", "Organic Starter", "Salt"],
			"percentage":[50, 20, 20, 10, 80, 15, 20, 2]
		},

		"milkbun": {
			"recipe": ["White Flour", "Milk", "Water", "Dried Yeast", "Improver", "Salt", "Starter", "Sugar", "Butter"],
			"percentage": [100, 40, 25, 1, 1, 2, 30, 10, 10]
		},

		"ciabatta":{
			"recipe": ["White Flour", "Water(Start)", "Water(End)", "Polish", "Olive Oli", "Salt"],
			"percentage": [100, 60, 15, 80, 3, 2.25]
		},

		"brioche": {
			"recipe": ["White Flour", "Milk", "Egg", "Butter", "Starter", "Sugar", "Salt", "Dried Yeast", "Improver"],
			"percentage": [100, 30, 30, 30, 50, 10, 2, 1, 1]
		},

		"turkish": {
			"recipe": ["White Flour", "Water(Start)", "Polish", "Olive Oli", "Salt", "Improver", "Fresh Yeast"],
			"percentage": [100, 71, 15, 3, 2, 1, 0.5]
		},

		"potato": {
			"recipe": ["White Flour", "Water(Start)", "Water(End)", "Cooked Potato", "Milk", "Salt", "Fresh Yeast", "Improver", "Butter", "Sugar"],
			"percentage": [100, 50, 5, 35, 5, 2, 1.5, 1, 1, 1]
		},

		'italian':{
			"recipe": ["White Flour", "Water(Start)", "Water(End)", "Polish", "Semolina", "Polenta", "Olive Oli", "Salt", "Fresh Yeast", "Improver"],
			"percentage": [100, 75, 12, 20, 10, 5, 3, 2, 1, 1]
		},

		"wholemeal":{
			"recipe": ["White Flour", "Whole meal", "Water(Start)", "Water(End)", "Salt", "Fresh Yeast", "Starter"],
			"percentage": [50, 50, 75, 7, 2, 0.2, 40]
		}

}

	return(obj[breadName])
}


const unitManagement = function(value){
	if(value < 1){
		value = (value * 1000) + ' g'
	}
	else{
		value = value + ' kg'
	}
	return value
}


const createTable=function(data){
const table = document.createElement("table");
table.style.width = '100%';
table.style.borderSpacing = '15px';
table.style.fontSize = '120%'
table.setAttribute('border', '3');

const header = document.createElement("tr");
const keys=Object.keys(data)
for(const key of keys){
	const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const content=data[key];
    td1.appendChild(document.createTextNode(key));
    td2.appendChild(document.createTextNode(data[key]));
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);

}
return table
};

const calculateRecipeWeight = function(totalDough, breadName){
let recipe = getRecipe(breadName)
let percentage = recipe.percentage
recipe = recipe.recipe
let diviser = percentage.reduce(reducer);
let weight = percentage.map(function(value){
	return(unitManagement(Number(totalDough * value/diviser).toFixed(3)));
});
let result = {};
recipe.forEach((key, i) => result[key] = weight[i]);
return createTable(result);
};


function showTable() {
	let dw = $("#weight").val();
	let dt = $("#type").val();
	console.log(dt)
	let t = calculateRecipeWeight(dw, dt);
	$("#data-table").html(t);
};

$( document ).ready(function() {
	$("#weight").keyup(function(){showTable()});
    $("#type").change(function(){showTable()});

});



