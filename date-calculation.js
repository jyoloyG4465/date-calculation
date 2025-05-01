const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

window.addEventListener('DOMContentLoaded', () => {
  setYear("startYear")
  setYear("endYear")
  setSelect('startMonth', 1, 12);
  setSelect('endMonth', 1, 12);
  setSelect('startDay', 1, 31);
  setSelect('endDay', 1, 31);
});

// テキストボックスに年を設定する
function setYear(id){
  const selector = document.getElementById(id);
  selector.value = year
}

// セレクトボックスの選択肢を動的に生成する
function setSelect(id, min, max) {
  const selector = document.getElementById(id);
  for (let i = min; i <= max; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selector.appendChild(option);
  }

  if(id == 'startMonth'){
    selector.value = month
  } else if(id == 'endMonth'){
    selector.value = month + 1
  } else {
    selector.value = day
  }
}

// メニューを開く
function toggleActionMenu(menuId) {
  const menu = document.getElementById(menuId);
  menu.classList.toggle("hidden");
}

// メニューを閉じる
function closeMenu(menuId) {
  const menu = document.getElementById(menuId);
  menu.classList.add("hidden");
}

// 日数を計算する
function calculateDays() {
  const sy = document.getElementById('startYear').value;
  const sm = document.getElementById('startMonth').value;
  const sd = document.getElementById('startDay').value;

  const ey = document.getElementById('endYear').value;
  const em = document.getElementById('endMonth').value;
  const ed = document.getElementById('endDay').value;

  if (sy == '' || ey == '') {
    document.getElementById('result').textContent = "年が空欄になっています。";
    return;
  }

  const start = new Date(`${sy}-${sm}-${sd}`);
  const end = new Date(`${ey}-${em}-${ed}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    document.getElementById('result').textContent = "日付の形式が正しくありません。";
    return;
  }

  const diffTime = end - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7); // 週数
  const days = diffDays % 7; 
  // 年月差の計算
  let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  let adjustedStart = new Date(start);
  adjustedStart.setMonth(start.getMonth() + totalMonths);

  // 日が足りていない場合、1ヶ月減らして再調整
  if (adjustedStart > end) {
    totalMonths--;
    adjustedStart = new Date(start);
    adjustedStart.setMonth(start.getMonth() + totalMonths);
  }

  // 残りの日数を計算
  const remainingTime = end - adjustedStart;
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  document.getElementById('result1').textContent =
    `日数差： ${diffDays} 日です。`;
  document.getElementById('result2').textContent =
  `週数差： ${weeks} 週と${days} 日です。`;
  document.getElementById('result3').textContent =
  `月数差： ${totalMonths} 月と${remainingDays} 日です。`;
}
