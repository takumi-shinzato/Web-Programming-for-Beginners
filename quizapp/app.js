/*
* テーマ：複数問題への対応
*/

/**
 * 配列をシャッフルします。
 * 元の配列は変更せず, 新しい配列を返します。
 * @param sourceArr 元の配列
 * @returns シャッフルされた配列 
 */
function shuffleArray (sourceArr) {
    // 元の配列の複製を作成
    const array = sourceArr.concat();
    // Fisher-Yatesのアルゴリズム
    const arrayLength = array.length;
    for (let i = arrayLength - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

const $button = document.getElementsByClassName('js-choice');
const $nextButton = document.getElementById('next-question');
const $questionTitle = document.getElementById('question-title');
let buttonLength = $button.length;
const quizLength = quiz.length;
let quizIndex = 0;

function setupQuiz () {
    $questionTitle.textContent = "Q." + (quizIndex + 1);
    if (quizIndex < quizLength - 1) {
        $nextButton.textContent = "次の問題";
    } else {
        $nextButton.textContent = "もう一度";
    }
    for (let buttonIndex = 0; buttonIndex < buttonLength; buttonIndex++) {
        $nextButton.disabled = true;
        $button[buttonIndex].className = "js-choice";
        $button[buttonIndex].disabled = false;
    }
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    const shuffledAnswers = shuffleArray(quiz[quizIndex].answers); // 選択肢配列をシャッフルする
    for (let buttonIndex = 0; buttonIndex < buttonLength; buttonIndex++) {
        $button[buttonIndex].textContent = shuffledAnswers[buttonIndex];
    }
}

setupQuiz();

/**
 * 各選択肢のボタンがクリックされたときの処理
 * @param {object} e 
 */
function clickHandler (e) {
    selectedButton = e.target;
    if (quiz[quizIndex].correct === e.target.textContent) { // 正解したら
        selectedButton.className += " correct-choice";
        // ボタンをdisabledにする
        for (let buttonIndex = 0; buttonIndex < buttonLength; buttonIndex++) {
            $button[buttonIndex].disabled = true;
        }
        // 次へボタンを表示
        $nextButton.disabled = false;
    } else { // 不正解だったら
        selectedButton.disabled = true;
        selectedButton.className += " incorrect-choice";
    }
    document.activeElement.blur();
}

/**
 * 各ボタンに clickHandler を割り当て
 */
for (let handlerIndex = 0; handlerIndex < buttonLength; handlerIndex++) {
    $button[handlerIndex].addEventListener('click', clickHandler);
}

/**
 * NEXTボタンをクリックで次の問題へ
 */
$nextButton.addEventListener('click', () => {
    quizIndex++;
    if (quizIndex < quizLength) { // 問題がまだあれば
        setupQuiz();
    } else {
        quizIndex = 0;
        setupQuiz();
    }
});