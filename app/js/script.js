let arrLen = 50
x = 10
let speed = 1 / x
let sizeSlider = document.getElementById("size-slider");
let speedSlider = document.getElementById("speed-slider");
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

function setBarUnsorted(i){
    document.getElementById(`B${i}`).style.backgroundColor = "var(--bar-unsorted)"
}

function swapBars(i1, i2){
    let temp = parseFloat(document.getElementById(`B${i1}`).style.height)
    bar1 = document.getElementById(`B${i1}`)
    bar2 = document.getElementById(`B${i2}`)
    temp = bar1.style.height
    bar1.style.height = bar2.style.height
    bar2.style.height = temp
}

async function bubbleSort(){
    let swapped = false;
    for (let i = 0; i < arrLen - 1; i++){
        swapped = false;
        for (let j = 0; j < arrLen - i - 1; j++){
            if (j > 0) { setBarUnsorted(j - 1) }
            setBarSorting(j)
            setBarSorting(j + 1)
            if (parseFloat(document.getElementById(`B${j}`).style.height) > parseFloat(document.getElementById(`B${j + 1}`).style.height)){
                swapBars(j, j + 1)
                swapped = true;
            }
            await pause();
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

async function sort(){
    for (let i = 0; i < arrLen; i++){
        setBarUnsorted(i);
    }
    document.getElementById("sort-button").disabled = true;
    document.getElementById("randomise-button").disabled = true;
    sizeSlider.disabled = true;
    await bubbleSort();
    document.getElementById("sort-button").disabled = false;
    document.getElementById("randomise-button").disabled = false;
    sizeSlider.disabled = false;
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
        }, speed * 100);
    });
}

sizeSlider.oninput = function() {
    arrLen = parseInt(this.value);
    makeBars()
}

speedSlider.oninput = function() {
    speed = 1 / parseInt(this.value);
}