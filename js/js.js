// 지운 li를 localStorage 반영
// 삭제, 추가를 하다보면 id값이 꼬임 => id를 고유한 값으로 바꿈


const items = document.querySelector('.items')  //ul.items
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footer_addBtn') 


// let id = 0; - 이 방법은 id가 겹치는 문제 발생
let shoppingLists = []; // 입력한 내용을 넣을 배열 선언

// 로컬스토리지에 배열을 집어 넣는 함수 정의
const save = () => {
  localStorage.setItem('shopList',JSON.stringify(shoppingLists))
  // json파일로 변환
}

// localStorage에 저장된 것을 가져오는 함수
const init = () =>{
  if(localStorage.key('shopList')){ 
    const userList = JSON.parse(localStorage.getItem('shopList'));  //js사용할 수 있는 array형태로 변환
  //console.log(userList);

    if(userList) {
      userList.forEach(obj => {
        createItem(obj);
        shoppingLists = userList;
      });
    }
  }
}
init();

const onAdd = () =>{
const list = { // id,text 포함하는 오브젝트
  id:Date.now(), // UTC 시간부터 현재까지 몇초 지났는지
  text:input.value
}

if(list.text == ''){  //입력 내용이 없을때는 onAdd 함수에서 빠져나감
  input.focus();
  return; 
}

  shoppingLists.push(list); // 배열에 집어 넣음
  save() // 배열을 localStorage 저장하는 함수 실행


  
  createItem(list); // 인자에 오브젝트를 넣어서 createItem 함수 실행

  input.value = '';
  input.focus();

  console.log('shoppingLists -', shoppingLists);
}


// 새로운 아이템을 만드는 함수 정의
function createItem(list) {
  const itemRow = document.createElement('li')
  itemRow.className = 'item_row'
  itemRow.setAttribute('data-id',list.id)
  
  itemRow.innerHTML = `
  <div class="item">
          <span class="item_name">${list.text}</span>
          <button class="item_delBtn">
          <input type="checkbox" class="item_input">
          <i class="fa-regular fa-square-minus" data-id=${list.id}></i>
          </button>
          </div>
          <div class="item_divider"></div>
  
  `


  // id++;

  items.append(itemRow) // onAdd 함수에 있던 것을 옮겨옴
  itemRow.scrollIntoView();
  return itemRow
}

addBtn.addEventListener('click', onAdd)

// 엔터를 쳤을때도 입력이 되게 
input.addEventListener('keypress', event =>{
  event.key === 'Enter' && onAdd();
  }
)

// 이벤트 위임을 이용한 삭제(쓰레기통을 클릭했을때 삭제)
// 쓰레기통을 클릭하면 dataset-id값을 알아와서 그와 같은값의 li를 찾고 그 li가 삭제되게

items.addEventListener('click', e =>{
const id = e.target.dataset.id;
console.log('클릭한 쓰레기통의 ID는 ?',id);
if(id) {
  const toBeDelected = document.querySelector(`.item_row[data-id="${id}"]`);
  toBeDelected.remove();
}
})