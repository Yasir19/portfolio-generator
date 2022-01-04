const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');
const promptUser =()=> {
return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('Please enter your name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: ' Enter your GitHub Username',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('Please enter your GitHub Usename!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name:'about',
        message: 'Provide some information about yourself.',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('Please enter information about yourself!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name : 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'provide some information about yourself:',
        when:({confirmAbout})=>{
        if (confirmAbout){
            return true
        }else{
            return false;
        }
    }
}
])
};
const promptProjects = portfolioData =>{
console.log(`
=================
Add a New Project
==================
`);
if (!portfolioData.projects){
    portfolioData.projects=[];
   }
return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Waht is the name of your project',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('Please enter your project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name : 'description',
        message: 'provide a description of the project (required)',
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('description is require, please enter description!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (check all that apply)',
        choices: ['JavaScript' , 'HTML' , 'CSS' , 'ES6' , 'Jquery' , 'BootStrap' , 'Node'],
        validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('Please check one at least!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (required)',
         validate: nameInput =>{
            if (nameInput){
                return true;
            }else{
                console.log('Github link is required, Please enter the project link!');
                return false;
            }
        }
    },
    {
        type:'confirm',
        name: 'feature',
        message:'Wold you like to feature this project?',
        default: false
    },
    {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Wold you like to enter another project?',
        default:false
    }
])
.then(projectData =>{
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject){
        return promptProjects(portfolioData);
    }else{
        return portfolioData;
    }
});
};
promptUser().then(promptProjects)
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    fs.writeFile('index.html',pageHTML, err => {
    if (err) throw err;
    console.log('Portfolio complete! Check out index.html to see the output!');
});
});







