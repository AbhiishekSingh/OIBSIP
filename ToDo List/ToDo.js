const addUserBtn = document.getElementById('Add');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('Task');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
   userArray = JSON.parse(objStr);
}

DisplayInfo();
addUserBtn.onclick = () => {
   //get user's name from text field
   const name = usernameTextField.value;
   if (edit_id != null) {
      //edit action
      userArray.splice(edit_id, 1, {
         'name': name
      });
      edit_id = null;
   } else {
      //insert action
      userArray.push({
         'name': name
      });
   }

   SaveInfo(userArray);
   usernameTextField.value = '';
   addUserBtn.innerText = btnText;
}

// store Task in local storage
function SaveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   DisplayInfo();
}

// display Tasks
function DisplayInfo() {
   let statement = '';
   userArray.forEach((user, i) => {
      statement += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
         </tr>`;
   });
   recordsDisplay.innerHTML = statement;
}

// Edit Tasks
function EditInfo(id) {
   edit_id = id;
   usernameTextField.value = userArray[id].name;
   addUserBtn.innerText = 'Save';
}

//Delete Task
function DeleteInfo(id) {
   userArray.splice(id, 1);
   SaveInfo(userArray);

}