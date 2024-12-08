// Алгоритмический визуализатор сортировки на JavaScript с несколькими алгоритмами

const container = document.getElementById("visualizer-container");
const array = [];

// Генерация случайного массива
function generateArray(size = 20) {
    array.length = 0;
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
    }
    renderArray();
}

// Отображение массива на экране
function renderArray() {
    container.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

// Пузырьковая сортировка с визуализацией
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            renderArrayHighlight(j, j + 1);
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                await delay(100);
                renderArray();
            }
        }
    }
}

// Сортировка вставками с визуализацией
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            renderArrayHighlight(j, j + 1);
            array[j + 1] = array[j];
            j = j - 1;
            await delay(100);
            renderArray();
        }
        array[j + 1] = key;
        await delay(100);
        renderArray();
    }
}

// Быстрая сортировка с визуализацией
async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) return;

    const index = await partition(start, end);
    await Promise.all([
        quickSort(start, index - 1),
        quickSort(index + 1, end)
    ]);
}

async function partition(start, end) {
    const pivotValue = array[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        renderArrayHighlight(i, end);
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
            await delay(100);
            renderArray();
        }
    }

    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    await delay(100);
    renderArray();
    return pivotIndex;
}

// Визуализация текущего сравнения
function renderArrayHighlight(index1, index2) {
    const bars = container.childNodes;
    bars.forEach(bar => (bar.style.backgroundColor = "#007bff")); // Сброс цвета
    if (bars[index1]) bars[index1].style.backgroundColor = "red";
    if (bars[index2]) bars[index2].style.backgroundColor = "red";
}

// Установка задержки
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Слушатели событий
const generateBtn = document.getElementById("generate-btn");
const bubbleSortBtn = document.getElementById("bubble-sort-btn");
const insertionSortBtn = document.getElementById("insertion-sort-btn");
const quickSortBtn = document.getElementById("quick-sort-btn");

generateBtn.addEventListener("click", () => generateArray(20));
bubbleSortBtn.addEventListener("click", bubbleSort);
insertionSortBtn.addEventListener("click", insertionSort);
quickSortBtn.addEventListener("click", () => quickSort());

// Генерация массива при загрузке страницы
generateArray(20);
