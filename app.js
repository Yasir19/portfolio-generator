const fs = require('fs');
const generatePage = require('./src/page-template');
const inquirer = require('inquirer');
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
        name: 'language',
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

//mock data 
const mockData =
{
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskmaster Pro',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
        link: 'https://github.com/lernantino/taskmaster-pro',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Robot Gladiators',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript'],
        link: 'https://github.com/lernantino/robot-gladiators',
        feature: false,
        confirmAddProject: false
      }
    ]
  };
// promptUser().then(promptProjects)
// .then(portfolioData => {
    const pageHTML = generatePage(mockData);
    fs.writeFile('index.html',pageHTML, err => {
    if (err) throw err;
    console.log('Portfolio complete! Check out index.html to see the output!');
});
// });







