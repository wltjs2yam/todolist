const items = document.querySelector('.items')  //ul.items
const input = document.querySelector('.footer_input')  
const addBtn = document.querySelector('.footer_addBtn') 

const onAdd = () =>{
  // 1. 사용자가 입력한 테스트를 받아옴
  const text = input.value;
  // console.log(text);

  // 2. 새로운 아이템을 만듦 (li, 텍스, 삭제버튼)
  const item = createItem(text);
  // console.log(item);


  // 3. items(ul,items) 안에 새로만든 아이템 추가
  items.append(item)

  // 4. 인풋 초기화
  input.value = '';
  input.focus();
}


// 새로운 아이템을 만드는 함수 정의
function createItem(text) {
  const itemRow = document.createElement('li')
  itemRow.className = 'item_row'
  

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
  return itemRow
}

addBtn.addEventListener('click', onAdd)
