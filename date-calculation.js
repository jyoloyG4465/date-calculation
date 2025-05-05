const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

window.addEventListener('DOMContentLoaded', () => {
  setInitYear("startYear");
  setInitYear("endYear");
  setInitSelect('startMonth', 1, 12);
  setInitSelect('endMonth', 1, 12);
  setInitSelect('startDay', 1, 31);
  setInitSelect('endDay', 1, 31);
});

// テキストボックスに年を設定する
function setInitYear(id) {
  const selector = document.getElementById(id);
  selector.value = year;
}

// セレクトボックスの選択肢を動的に生成する
function setInitSelect(id, min, max) {
  const selector = document.getElementById(id);
  for (let i = min; i <= max; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selector.appendChild(option);
  }

  if (id === 'startMonth') {
    selector.value = month;
  } else if (id === 'endMonth') {
    selector.value = month + 1;
  } else {
    selector.value = day;
  }
}

// メニューを開く・閉じる
function toggleActionMenu(menuId) {
  const menu = document.getElementById(menuId);
  const fieldSelector = document.querySelector(`.field-${menuId}`);

  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    fieldSelector.style.marginBottom = '80px';
  } else {
    menu.classList.add('hidden');
    fieldSelector.style.marginBottom = '';
  }
}

function closeMenu(menuId) {
  const menu = document.getElementById(menuId);
  const fieldSelector = document.querySelector(`.field-${menuId}`);
  menu.classList.add("hidden");
  fieldSelector.style.marginBottom = '';
}

// 日数を計算する
function calculateDays() {
  const startYear = document.getElementById('startYear').value;
  const startMonth = document.getElementById('startMonth').value;
  const startDay = document.getElementById('startDay').value;
  const endYear = document.getElementById('endYear').value;
  const endMonth = document.getElementById('endMonth').value;
  const endDay = document.getElementById('endDay').value;

  const validationMessage = validateYearInput(startYear, endYear);

  if (validationMessage) {
    document.getElementById('result1').textContent = validationMessage;
    document.getElementById('result2').textContent = "";
    document.getElementById('result3').textContent = "";
    return;
  }

  const startTime = new Date(`${startYear}-${startMonth}-${startDay}`);
  const endTime = new Date(`${endYear}-${endMonth}-${endDay}`);
  const diffTime = endTime - startTime;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(diffDays / 7);
  const remainingWeekDays = diffDays % 7;

  let totalMonths = (endTime.getFullYear() - startTime.getFullYear()) * 12 + (endTime.getMonth() - startTime.getMonth());
  let adjustedStartTime = new Date(startTime);
  adjustedStartTime.setMonth(startTime.getMonth() + totalMonths);

  if (adjustedStartTime > endTime) {
    totalMonths--;
    adjustedStartTime = new Date(startTime);
    adjustedStartTime.setMonth(startTime.getMonth() + totalMonths);
  }

  const remainingTime = endTime - adjustedStartTime;
  const remainingMonthDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  document.getElementById('result1').textContent = `日数差： ${diffDays} 日です。`;
  document.getElementById('result2').textContent = `週数差： ${totalWeeks} 週と ${remainingWeekDays} 日です。`;
  document.getElementById('result3').textContent = `月数差： ${totalMonths} ヶ月と ${remainingMonthDays} 日です。`;
}

// 年の入力値をバリデーションする
function validateYearInput(startYear, endYear) {
  function isHalfWidthNumeric(str) {
    return /^[0-9]+$/.test(str);
  }

  function isOverMinimumNum(str) {
    return isHalfWidthNumeric(str) && Number(str) >= 1900;
  }

  if (startYear === '' || endYear === '') {
    return "年が空欄になっています。";
  }
  if (!isHalfWidthNumeric(startYear) || !isHalfWidthNumeric(endYear)) {
    return "正常な数字を入力してください。";
  }
  if (!isOverMinimumNum(startYear) || !isOverMinimumNum(endYear)) {
    return "1900以上の数値を設定してください。";
  }

  return null;
}

// 今日の日付を設定する
function setToday() {
  document.getElementById('startYear').value = year;
  document.getElementById('startMonth').value = month;
  document.getElementById('startDay').value = day;
}

// ローカルストレージに日付を設定する
function setDateInLocalStorage(prefix) {
  const year = document.getElementById(`${prefix}Year`).value;
  const month = document.getElementById(`${prefix}Month`).value;
  const day = document.getElementById(`${prefix}Day`).value;

  const dateData = { year, month, day };
  localStorage.setItem(`${prefix}Day`, JSON.stringify(dateData));
  showToast(`設定を保存しました`);
}

// ローカルストレージから日付を取得する
function getDateInLocalStorage(prefix) {
  const saved = localStorage.getItem(`${prefix}Day`);
  if (saved) {
    const { year, month, day } = JSON.parse(saved);
    document.getElementById(`${prefix}Year`).value = year;
    document.getElementById(`${prefix}Month`).value = month;
    document.getElementById(`${prefix}Day`).value = day;
    showToast(`保存設定を読み込みました`);
  } else {
    showToast(`保存されたデータがありません`);
  }
}

// トーストを表示する
function showToast(message) {
  const existing = document.getElementById('toast');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}
