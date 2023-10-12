// 새로만든 아이템마다 삭제 이벤트리스너 추가 -> 효율적이지 않음
// 이벤트 위임 - 상위 요소에 이벤트리스너를 생성하고 필요할때만 사용할 수 있게 (조건문설정)
// data 속성 사용 data-id


const items = document.querySelector('.items')  //ul.items
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footer_addBtn') 

const onAdd = () =>{
  const text = input.value;
  if(text == ''){  //입력 내용이 없을때는 onAdd 함수에서 빠져나감
    input.focus();
    return; 
  }
  

  const item = createItem(text);
  items.append(item)


  // 입력 내용이 많았을때 새로 추가된 아이템이 화면에 보이게(자동으로 스크롤링)
  item.scrollIntoView();

  
  input.value = '';
  input.focus();
}

let id = 0;
// 새로운 아이템을 만드는 함수 정의
function createItem(text) {
  const itemRow = document.createElement('li')
  itemRow.className = 'item_row'
  itemRow.setAttribute('data-id',id)
  
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

  /* 
  const item = document.createElement('div')
  item.setAttribute('class','item')

  const span = document.createElement('span')
  span.className = 'item_name';
  span.innerText = text;

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'item_delBtn';
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

  deleteBtn.addEventListener('click', ()=>{
    items.removeChild(itemRow);
  })


  const itemDivider = document.createElement('div')
  itemDivider.className = 'item_divider'


  item.append(span,deleteBtn);
  itemRow.append(item,itemDivider);
  itemRow.append(item); 
  */

  id++;
  return itemRow
}

addBtn.addEventListener('click', onAdd)

// 엔터를 쳤을때도 입력이 되게 
input.addEventListener('keypress', event =>{
  // console.log(event.key);
  if (event.key === 'Enter'){
    onAdd();
  }
})

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