function calculateDays() {
  const sy = document.getElementById('startYear').value;
  const sm = document.getElementById('startMonth').value;
  const sd = document.getElementById('startDay').value;

  const ey = document.getElementById('endYear').value;
  const em = document.getElementById('endMonth').value;
  const ed = document.getElementById('endDay').value;

  const start = new Date(`${sy}-${sm}-${sd}`);
  const end = new Date(`${ey}-${em}-${ed}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    document.getElementById('result').textContent = "日付の形式が正しくありません。";
    return;
  }

  const diffTime = end - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById('result').textContent =
    `開始日から終了日までの差は ${diffDays} 日です。`;
}

// セレクトボックスの選択肢を動的に生成
function populateSelect(id, min, max) {
  const select = document.getElementById(id);
  for (let i = min; i <= max; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  populateSelect('startMonth', 1, 12);
  populateSelect('endMonth', 1, 12);
  populateSelect('startDay', 1, 31);
  populateSelect('endDay', 1, 31);
});

function sample() {
  console.log(1)
}

