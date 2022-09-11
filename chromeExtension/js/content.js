//recieving message
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    //alert('Hello');
    //console.log(message);
    if (message.action === 'clicked') {
        if (!iFrameInitializd) {
            initIFrame();
            //Load here
            verify();
            performClickAction();
        } else {
            verify();
            performClickAction();
        }
    }
    else if (message.action === 'changed') {
        //alert(document.getElementsByTagName('title')[0].innerHTML);
        //console.log(document.getElementsByTagName('title')[0].innerHTML)
        if (document.getElementById('draggableWrapper') != null)
            document.getElementById('draggableWrapper').style.display = 'none'
    }
})

var iFrameInitializd = false;
function initIFrame() {
    var draggableWrapper = document.createElement("div");
    //console.log(`<div id="draggableWrapper"><div id="draggableWrapperHeader">Press to drag <button style="float:right;" onclick="document.getElementById('draggableWrapper').style.display = 'none';">X</button></div><iframe id="theIframe" src='${mainPageUrl}'/></div>`);
    draggableWrapper.innerHTML = `<div id="draggableWrapper">
        <div id="draggableWrapperHeader">
            <div class='chk'>
                <input type="checkbox" class="checkbox" id="checkbox">
                <label for="checkbox" class="label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="pink" viewBox="0 0 16 16">
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="yellow" viewBox="0 0 16 16">
                        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                    </svg>
                    <div class='ball'></div>
                </label>
            </div>
            Press to drag 
            <button id='cross' onclick="document.getElementById('draggableWrapper').style.display = 'none';">X</button>
        </div>
        <div id='box'> 
            <div id="MyRoot">Loading...</div>
            <form id="searchform" class="input-group mt-3 container-fluid">
                <input type="text" id="searchinp" class="form-control inD" placeholder="Type word to search" aria-label="type" aria-describedby="basic-addon2" required>
                <div class="input-group-append">
                    <button class="btn btn-primary text-white btn-outline-secondary" type="submit">Search</button>
                </div>
            </form>
            <div class="pb-3 container-fluid">
                <textarea class="form-control mt-2 inD" readonly id="meaninghere" rows="3"></textarea>
            </div>
        </div>
    </div>`
    document.body.append(draggableWrapper.firstChild);
    var form = document.getElementById("searchform");
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let inp = document.getElementById("searchinp").value
        let ans = document.getElementById("meaninghere")
        ans.value='searching...'
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp}`)
            .then((response) => response.json())
            .then((data) => {
                if(data.title!==undefined){
                    ans.value='No meaning found, try searching different word';
                }
                else{
                    ans.value=data[0].meanings[0].definitions[0].definition
                }
            }).catch((error) => {
                console.error('Error:', error);
                ans.value="some error occured, try again"
            });
    });

    const darktoggle = document.getElementById('checkbox');
    const box=document.getElementById('box');
    darktoggle.addEventListener('change',()=>{
        box.classList.toggle('invert');
        document.getElementById('draggableWrapperHeader').classList.toggle('dark-blue')
    })
    iFrameInitializd = true;

    //Make the DIV element draggagle:
    dragElement(document.getElementById("draggableWrapper"));
}
function performClickAction() {
    document.getElementById("draggableWrapper").style.display = "block";
}
function verify() {
    //check login if yes show details related to that user and videoID, if no show login/signUp
    //document.getElementById('MyRoot').innerHTML = document.getElementsByTagName('title')[0].innerHTML;
    console.log('itz clicked')
    var domContainer = document.getElementById('MyRoot');
    ReactDOM.render(React.createElement(App, null), domContainer);
}


//Make elememt dragable
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}