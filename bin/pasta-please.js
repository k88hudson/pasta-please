#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const colors = require('colors');
const markdown = require('markdown-js');
const htmlToText = require('html-to-text');

const LINE = '\n\n==============================\n\n'.rainbow;

function getFileNames(pathName) {
    return fs.readdirSync(path.join(__dirname, pathName))
        .map(filename => {
            return path.join(__dirname, pathName, filename);
        });
}

function getRandomRecipe(options) {

    let files = [];
    var i = Math.floor((Math.random() * 3) + 1);
    var recipeType;
    
    var meatRecipes = files.concat(getFileNames('../recipes/meat'));
    var veggieRecipes = files.concat(getFileNames('../recipes/veggie'));
    var veganRecipes = files.concat(getFileNames('../recipes/vegan'));
    
    var help = "\nUsage: pasta-please --<option>\n\n";
    help = help + "Where <option> is one of:\n";
    help = help + "  meat, veggie, vegan\n\n";
    help = help + "pasta-please --meat      # Returns a meat recipe\n";
    help = help + "pasta-please --veggie    # Returns a veggie recipe\n";
    help = help + "pasta-please --vegan     # Returns a vegan recipe\n\n";
    help = help + "Note: if no option is provided, a random recipe will be returned";
    
    if (options.meat) {
        files = meatRecipes;
        recipeType = "Meat";
    }
    else if (options.veggie) {
        files = veggieRecipes;
        recipeType = "Veggie";
    }
    else if (options.vegan) {
    files = veganRecipes;
    recipeType = "Vegan";
    }
    else {
        switch(i) {
        case 1:
            files = meatRecipes;
            recipeType = "Meat";
            break;
        case 2:
            files = veggieRecipes;
            recipeType = "Veggie";
            break;
        case 3:
            files = veganRecipes;
            recipeType = "Vegan";
            break;
        }
    }
    
    const randomFilePath = files[Math.floor(Math.random() * files.length)];
    const text = fs.readFileSync(randomFilePath, {encoding: 'utf-8'})
    const result = htmlToText.fromString(markdown.makeHtml(text));

    if (options.help) {
        console.log(help);
    }
    else {
        console.log(LINE + '*** '.yellow + recipeType.yellow + ' recipe ***\n\n'.yellow + result + '\n\nEnjoy!'.yellow + LINE);
    }
}

getRandomRecipe(args);
