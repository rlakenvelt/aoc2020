
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 21B");
const input = shared.getInput();

const food = input.map((line, index)=> {
                    const parts = line.split('(');
                    const ingredients = parts[0].trim().split(' ');
                    const alergens    = parts[1].replace(')', '').replace('contains ', '').split(', ');
                    return {index, ingredients, alergens};
                  })
const alergens = food.reduce((list, f) => {
                        f.alergens.forEach(a=> {
                            let alergen=list.find(x=>x.name===a);
                            if (!alergen) {
                                alergen = {name: a, ingredients: [...f.ingredients]};
                                list.push(alergen);
                            } else {
                                const newIngredients = [];
                                alergen.ingredients.forEach(ingredient=> {
                                    if (f.ingredients.includes(ingredient)) newIngredients.push(ingredient);
                                })
                                alergen.ingredients = newIngredients;
                            }
                        })
                        return list;
                     }, []);

while (alergens.find(a=>a.ingredients.length>1) ) {
    const definedAllergens=alergens.filter(a=>a.ingredients.length===1);
    const filterAllergens=alergens.filter(a=>a.ingredients.length>1);
    definedAllergens.forEach(a1=> {
        filterAllergens.forEach(a2=> {
            a2.ingredients=a2.ingredients.filter(i=>i!==a1.ingredients[0]);
        })
    })
}

answer = alergens.filter(alergen=> {
                    return alergen.ingredients.length===1;
                })
                .map(alergen=> {
                    return {ingredient:alergen.ingredients[0], alergen: alergen.name};
                })
                .sort((a,b)=> a.alergen.localeCompare(b.alergen))
                .reduce((list, item)=> {
                    list.push(item.ingredient);
                    return list;
                },[])
                .join(',');

shared.end(answer);
