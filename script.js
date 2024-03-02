// DOM References
const form = document.querySelector('#form');
const list = document.querySelector('.list');

let count = 1;

// Appwrite 
const { Client, Databases, ID } = Appwrite;
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e323102577f61154e4');

const DATABASE_ID = "65e327d524866a9b7434"
const TASK_COLLECTION_ID = "65e327eb57bf57eaa219";
const db = new Databases(client);

//Render Function
async function render(element) {
    let item = document.createElement('div');
    item.classList.add('item');
    item.classList.add(`${element.$id}`)
    item.innerHTML = `
    <span class="count">
            ${count}.
        </span>
        <p class="text ${element.completed}">
            ${element.body}
        </p>
        <div class="del" id="${element.$id}">

        </div>
    `;
    list.appendChild(item);
    count++;
}


//Get Data 
async function get() {
    const res = await db.listDocuments(
        DATABASE_ID,
        TASK_COLLECTION_ID
    );
    console.log(res.documents);

    res.documents.map(element => {
        render(element);
    });
}
get();

//Create Data
form.addEventListener('submit', addTask);
async function addTask(e) {
    e.preventDefault();
    const body = e.target.task.value;
    //try inp.value instead
    console.log(body);
    const res = await db.createDocument(
        DATABASE_ID,
        TASK_COLLECTION_ID,
        ID.unique(),
        { 'body': body }
    );
    render(res);
    form.reset();
}


// Garbage
// const btn = document.querySelector('.listwrap');
// const inp = document.querySelector('#task');