/**
 * Create a guest list that tracks confirmations, prevents duplicate entries,
 * and allows the user to hide those who haven't confirmed yet.
 * 
 * The bulk of the code (everything except checking for duplicates and localStorage)
 * was built during the DOM Scripting By Example Treehouse Module
 * 
 * This is also an exercise in manipulating localStorage
 * 
 */


 // create an array to store entered names to check for duplicates.  This was created
 // before working with localStorage.  I figured out it had to exist outside the 'DOMContentLoaded' otherwise it wouldn't load.  
 // I assume I can just use localStorage for the same functionality of checking for duplicates.
 // Once localStorage is working properly I'll modify the code. 
const liArray = [];

// This function was written during the TreeHouse Local Storage Workshop. My understanding of its purpose is to 
// make sure localStorage is possible to prevent errors when working with older browsers.
function supportsLocalStorage() {
  try {
      return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
      return false;
  }
}

// Conditional checks if localStorage is possible, and if true then the rest of the code is applicable. This concept 
// was shown in the TreeHouse Local Storage Workshop.
if (supportsLocalStorage()) {

  // getInvitedList, saveInvitedList, and clearInvitedList functions written during the TreeHouse Local Storage Workshop.
  // I just changed the names to make them relevant for this program.
  function getInvitedList() {
    let invited = localStorage.getItem('invitedList');
    if (invited) {
      return JSON.parse(invited);
    } else {
      return [];
    }
  }

  function saveInvitedList(str) {
    let invited = getInvitedList();
    if (!str || invited.indexOf(str) > -1) {
      return false;
    }
    invited.push(str);
    localStorage.setItem('invitedList', JSON.stringify(invited));
    return true;
  }

  // I haven't utilized this yet. I plan on creating a button that clears the invitee list
  function clearInvitedList() {
    localStorage.clear();
  }

  const alreadyInvited = getInvitedList();
      for (let i = 0; i>alreadyInvited.length; i++) {
         createLi(alreadyInvited[i]);
      }

  document.addEventListener('DOMContentLoaded', () => {
    
        const form = document.getElementById('registrar');
        const input = form.querySelector('input');
        
        const mainDiv = document.querySelector('.main');
        const ul = document.getElementById('invitedList');
        
        const div = document.createElement('div');
        const filterLabel = document.createElement('label');
        const filterCheckbox = document.createElement('input');
    
        // create checkbox that filters out the confirmed guests
        filterLabel.textContent = "Hide those who haven't responded";
        filterCheckbox.type = 'checkbox';
        div.appendChild(filterLabel);
        div.appendChild(filterCheckbox);
        mainDiv.insertBefore(div, ul);
        filterCheckbox.addEventListener('change', (e) => {
          const isChecked = e.target.checked;
          const lis = ul.children;
          if (isChecked) {
            for (let i = 0; i < lis.length; i += 1 ) {
              let li = lis[i];
              if (li.className === 'responded') {
                  li.style.display = '';
            } else {
                li.style.display = 'none'; 
            }
                }
            } else {
            for (let i = 0; i <lis.length; i += 1) {
                let li = lis[i];
                  li.style.display = '';
                }
          }
        });
    
        // the createLi function takes the input from the user and uses it to create a guest card
        function createLi(text) {
          
          function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value;
            return element;
          }
          function appendToLi(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
          }
          const li = document.createElement('li');
          appendToLi('span', 'textContent', text);
          appendToLi('label', 'textContent', 'Confirmed')
          .appendChild(createElement('input', 'type', 'checkbox'));
          appendToLi('button', 'textContent', 'edit');
          appendToLi('button', 'textContent', 'remove');
          // populate the array created earlier of just the names entered to be able to compare and check for duplicates
          liArray.push(text);
          return li;
        }
        
        
        function checkForDuplicates(arr) {
          for (let i = 0; i < arr.length; i += 1) {
            
            return arr[i];
          }
        }
    
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const text = input.value;
          input.value = "";
          if (text.length == 0) {
            alert('Please Enter a Name')
            // conditional that compares the entered text to the returned value of the checkForDuplicates function. User
            // is alerted if there is a match
          } else if (text === checkForDuplicates(liArray)) {
            alert('That name has already been invited')
          } else {
          const li = createLi(text);
          ul.appendChild(li);
          saveInvitedList(text)
          }
          
        });  
        
        ul.addEventListener('change', (e) => {
          const checkbox = e.target;
          const checked = checkbox.checked;
          const listItem = checkbox.parentNode.parentNode;
          
          if (checked) {
            listItem.className = 'responded';
          } else {
            listItem.className = '';
          }
        });
        
        ul.addEventListener('click', (e) => {
          if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent;
            const nameActions = {
              remove: () => {
                ul.removeChild(li);
            },
              edit: () => {
                const span = li.firstElementChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                button.textContent = 'save';
            },
              save: () => {
                const input = li.firstElementChild;
                const span = document.createElement('span');
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                button.textContent = 'edit';
              }
            };
            
          // select and run action in button's name
            nameActions[action]();
            
          }
        });

  
  
  

  });
}
