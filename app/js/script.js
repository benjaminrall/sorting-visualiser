let arrLen = 50;
let algorithm = -1;
let sizeSlider = document.getElementById("size-slider");
let speedSlider = document.getElementById("speed-slider");
let algorithmSelect = document.getElementById("algorithm-select");
let bogoRunning = false;

x = speedSlider.value;
let speed = 1 / x;

makeBars();

function makeBars(){
    document.getElementById("bar-container").innerHTML = "";

    let arrNums = [];
    for (let i = 0; i < arrLen; i++) {
        arrNums.push(i + 1);
    }

    arrNums = arrNums.sort(() => Math.random() - 0.5);

    for (let i = 0; i < arrLen; i++) {
        var bar = document.createElement("DIV");

        bar.classList.add("bar");
        bar.setAttribute("id", `B${i}`);
        bar.style.height = `${(arrNums[i] / arrLen) * 100}%`;
        document.getElementById("bar-container").appendChild(bar);
    }
}

function setBarSorted(i){
    document.getElementById(`B${i}`).style.backgroundColor = "var(--bar-sorted)"
}

function setBarSorting(i){
    document.getElementById(`B${i}`).style.backgroundColor = "var(--bar-sorting)"
}

function setBarUnsorted(i, filter = false){
    if (!filter){
        document.getElementById(`B${i}`).style.backgroundColor = "var(--bar-unsorted)"
    } else if (document.getElementById(`B${i}`).style.backgroundColor !== "var(--bar-sorted)") {
        document.getElementById(`B${i}`).style.backgroundColor = "var(--bar-unsorted)"
    }
    
}

function setBarPivot(i){
    document.getElementById(`B${i}`).style.backgroundColor = "var(--bar-pivot)"
}

function resetBars(){
    for (let i = 0; i < arrLen; i++){
        setBarUnsorted(i);
    }
}

function getValue(i){
    return parseFloat(document.getElementById(`B${i}`).style.height);
}

function swapBars(i1, i2){
    let temp = getValue(i1)
    bar1 = document.getElementById(`B${i1}`)
    bar2 = document.getElementById(`B${i2}`)
    temp = bar1.style.height
    bar1.style.height = bar2.style.height
    bar2.style.height = temp
}

function swapColours(i1, i2){
    let temp = getValue(i1)
    bar1 = document.getElementById(`B${i1}`)
    bar2 = document.getElementById(`B${i2}`)
    temp = bar1.style.backgroundColor
    bar1.style.backgroundColor = bar2.style.backgroundColor
    bar2.style.backgroundColor = temp
}

function shiftBars(start, end){
    for (let i = end - 1; i > start; i--){
        document.getElementById(`B${i}`).style.height = document.getElementById(`B${i - 1}`).style.height
    }
}

async function bubbleSort(){
    let swapped = false;
    for (let i = 0; i < arrLen - 1; i++){
        swapped = false;
        for (let j = 0; j < arrLen - i - 1; j++){

            if (j > 0) { setBarUnsorted(j - 1) }
            setBarSorting(j)
            setBarSorting(j + 1)

            await pause();

            if (getValue(j) > getValue(j + 1)){
                swapBars(j, j + 1)
                swapped = true;
                await pause();
            }
        }
        
        if (!swapped){
            for (let j = 0; j < arrLen; j++){
                setBarSorted(j)
            }
            break;
        } else {
            setBarSorted(arrLen - i - 1)
            setBarUnsorted(arrLen - i - 2)
        }
    }
    setBarSorted(0)
}

async function insertionSort(){
    for (let i = 0; i < arrLen; i++){
        
        setBarSorting(i);

        await pause()

        let j = i;
        while (j > 0 && getValue(j) < getValue(j - 1)) {
            swapBars(j, j - 1)
            swapColours(j, j - 1)
            j--;
            await pause()
        }
        setBarSorted(j)
    }
}

async function selectionSort(){
    for (let i = 0; i < arrLen; i++){

        let minimum = i;

        setBarSorting(minimum)

        for (let j = i; j < arrLen; j++){

            setBarSorting(j)
            if (j > i && j - 1 !== minimum) {setBarUnsorted(j - 1)}

            if (getValue(j) < getValue(minimum)){
                setBarSorting(j)
                await pause()
                setBarUnsorted(minimum);
                minimum = j
            }

            await pause()
        }

        let temp = document.getElementById(`B${minimum}`).style.height
        shiftBars(i, minimum + 1)
        document.getElementById(`B${i}`).style.height = temp;

        setBarUnsorted(arrLen - 1)
        setBarUnsorted(minimum)
        setBarSorted(i)

        await pause()
    }
}

async function quickSort(min, max){
    if (min < max){
        let p = await quickSortPartition(min, max);
        await quickSort(min, p - 1);
        await quickSort(p + 1, max);
    }
    if (max >= 0) {setBarSorted(max)}
}

async function quickSortPartition(min, max){
    let pivot = getValue(max);
    setBarPivot(max)
    let i = min;
    setBarSorting(i);
    for (j = min; j < max; j++){
        setBarSorting(j);

        await pause()

        if (getValue(j) < pivot){
            
            swapBars(i, j)
            setBarUnsorted(i)
            i++;
            setBarSorting(i)
            await pause()
        }
        setBarUnsorted(j)
    }
    swapBars(i, max);
    await pause()
    setBarUnsorted(max - 1)
    setBarUnsorted(max)
    setBarSorted(i)
    return i
}

async function bogoSort(){
    let sorted = false;
    while (bogoRunning && !sorted){
        makeBars()

        sorted = true;
        for (let i = 0; i < arrLen - 1; i++){
            if (getValue(i) > getValue(i + 1)){
                sorted = false;
            }
        }

        await pause()
    }
    if (sorted){
        for (let i = 0; i < arrLen; i++){
            setBarSorted(i)
        }
        bogoRunning = false;
    }
}

async function sort(){

    if (bogoRunning){
        bogoRunning = false;
        return;
    }

    document.getElementById("sort-button").disabled = true;
    document.getElementById("randomise-button").disabled = true;
    sizeSlider.disabled = true;
    algorithmSelect.disabled = true;

    switch (algorithmSelect.value) {
        case "0":
            resetBars()
            await bubbleSort();
            break;
        case "1":
            resetBars()
            await insertionSort();
            break;
        case "2":
            resetBars()
            await selectionSort();
            break;
        case "3":
            resetBars()
            await quickSort(0, arrLen - 1);
            break;
        case "4":
            resetBars
            bogoRunning = true;
            document.getElementById("sort-button").disabled = false;
            document.getElementById("sort-button").innerHTML = "STOP";
            pause()
            await bogoSort();
            document.getElementById("sort-button").innerHTML = "SORT";
            document.getElementById("sort-button").disabled = true;
            document.getElementById("sort-button").disabled = false;
            break;
        default:
            alert("Please select an algorithm");
            break;
    }
    
    document.getElementById("sort-button").disabled = false;
    document.getElementById("randomise-button").disabled = false;
    sizeSlider.disabled = false;
    algorithmSelect.disabled = false;
}

async function randomise(){
    document.getElementById("randomise-button").disabled = true;
    document.getElementById("randomise-button").disabled = false;
    makeBars();
}

function pause() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, speed * 200);
    });
}

sizeSlider.oninput = function() {
    arrLen = parseInt(this.value);
    makeBars()
}

speedSlider.oninput = function() {
    speed = 1 / parseInt(this.value);
}