var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useState = React.useState;
var useEffect = React.useEffect;

function LoginSignup(_ref) {
    var setLogin = _ref.setLogin;

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        onRegs = _useState2[0],
        setOnRegs = _useState2[1];

    var _useState3 = useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        err = _useState4[0],
        setErr = _useState4[1];

    var _useState5 = useState({ name: '', email: '', pass: '' }),
        _useState6 = _slicedToArray(_useState5, 2),
        user = _useState6[0],
        setUser = _useState6[1];

    var _useState7 = useState('none'),
        _useState8 = _slicedToArray(_useState7, 2),
        load = _useState8[0],
        setLoad = _useState8[1];

    var inputEvent = function inputEvent(e) {
        var _e$target = e.target,
            name = _e$target.name,
            value = _e$target.value;

        setUser(Object.assign({}, user, _defineProperty({}, name, value)));
        setErr('');
    };
    var RegisterSubmit = function RegisterSubmit(event) {
        event.preventDefault();
        setLoad('inline-block');
        chrome.runtime.sendMessage({ action: "register", data: JSON.stringify(user) }, function (response) {
            //console.log(response);
            setOnRegs(!response.verdict);
            setLoad('none');
            setErr(response.msg);
        });
        //setOnRegs(false);
    };
    var loginSubmit = function loginSubmit(event) {
        event.preventDefault();
        setLoad('inline-block');
        chrome.runtime.sendMessage({ action: "login", data: JSON.stringify(user) }, function (response) {
            //console.log(response);
            setLogin(response.verdict);
            setLoad('none');
            setErr(response.msg);
        });
        //setLogin(true);
    };

    return React.createElement(
        'div',
        { 'class': 'loginsignup' },
        onRegs ? React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { 'class': 'h3 mb-3 fw-normal text-center' },
                'Please Register'
            ),
            React.createElement(
                'form',
                { 'class': 'form-signinup', onSubmit: RegisterSubmit },
                React.createElement(
                    'div',
                    { 'class': 'form-floating' },
                    React.createElement('input', { type: 'text', 'class': 'form-control', placeholder: 'Username', name: 'name', onChange: inputEvent, value: user.name, required: true }),
                    React.createElement(
                        'label',
                        { 'for': 'floatingInput' },
                        'Username'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-floating' },
                    React.createElement('input', { type: 'email', 'class': 'form-control ', placeholder: 'Email', name: 'email', onChange: inputEvent, value: user.email, required: true }),
                    React.createElement(
                        'label',
                        { 'for': 'floatingInput' },
                        'Email'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-floating' },
                    React.createElement('input', { type: 'password', 'class': 'form-control ', placeholder: 'Password', name: 'pass', onChange: inputEvent, value: user.pass, required: true }),
                    React.createElement(
                        'label',
                        { 'for': 'floatingPassword' },
                        'Password'
                    )
                ),
                React.createElement(
                    'h3',
                    null,
                    err
                ),
                React.createElement(
                    'button',
                    { 'class': 'w-70 btn btn-lg btn-primary mt-2 mb-3', type: 'submit' },
                    'Sign Up ',
                    React.createElement('span', { style: { display: '' + load }, 'class': 'spinner-border spinner-border-sm', role: 'status', 'aria-hidden': 'true' })
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    { 'class': 'mb-0' },
                    'Already have an account? ',
                    React.createElement(
                        'span',
                        { 'class': 'navlink text-black-50 fw-bold', onClick: function onClick() {
                                return setOnRegs(false);
                            } },
                        'Sign in'
                    )
                )
            )
        ) : React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { 'class': 'h3 mb-3 fw-normal text-center' },
                'Please sign in'
            ),
            React.createElement(
                'form',
                { 'class': 'form-signinup', onSubmit: loginSubmit },
                React.createElement(
                    'div',
                    { 'class': 'form-floating' },
                    React.createElement('input', { type: 'email', 'class': 'form-control', placeholder: 'Email', name: 'email', onChange: inputEvent, value: user.email, required: true }),
                    React.createElement(
                        'label',
                        { 'for': 'floatingInput' },
                        'Email'
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'form-floating' },
                    React.createElement('input', { type: 'password', 'class': 'form-control', placeholder: 'Password', name: 'pass', onChange: inputEvent, value: user.pass, required: true }),
                    React.createElement(
                        'label',
                        { 'for': 'floatingPassword' },
                        'Password'
                    )
                ),
                React.createElement(
                    'h3',
                    null,
                    err
                ),
                React.createElement(
                    'button',
                    { 'class': 'w-70 btn btn-lg btn-primary mt-2 mb-3', type: 'submit' },
                    'Sign in ',
                    React.createElement('span', { style: { display: '' + load }, 'class': 'spinner-border spinner-border-sm', role: 'status', 'aria-hidden': 'true' })
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    { 'class': 'mb-0' },
                    'Don\'t have an account? ',
                    React.createElement(
                        'span',
                        { 'class': 'navlink text-black-50 fw-bold', onClick: function onClick() {
                                return setOnRegs(true);
                            } },
                        'Sign Up'
                    )
                )
            )
        )
    );
}

function Notes(_ref2) {
    var setLogin = _ref2.setLogin,
        vid = _ref2.vid;

    var _useState9 = useState({
        hh: 0,
        mm: 0,
        ss: 0,
        noteac: ''
    }),
        _useState10 = _slicedToArray(_useState9, 2),
        notec = _useState10[0],
        setNotec = _useState10[1];

    var _useState11 = useState(""),
        _useState12 = _slicedToArray(_useState11, 2),
        err = _useState12[0],
        setErr = _useState12[1];

    var _useState13 = useState('none'),
        _useState14 = _slicedToArray(_useState13, 2),
        load = _useState14[0],
        setLoad = _useState14[1];

    var _useState15 = useState('block'),
        _useState16 = _slicedToArray(_useState15, 2),
        getLoader = _useState16[0],
        setGetLoader = _useState16[1];

    var _useState17 = useState([]),
        _useState18 = _slicedToArray(_useState17, 2),
        allNotes = _useState18[0],
        setAllNotes = _useState18[1];

    var _useState19 = useState(vid),
        _useState20 = _slicedToArray(_useState19, 2),
        cc = _useState20[0],
        setcc = _useState20[1];

    var getVideoID = function getVideoID() {
        var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        r = document.URL.match(rx);
        return r[1];
    };

    //console.log('In Notes: ',vid,cc);
    if (vid !== cc) setcc(vid);

    useEffect(function () {
        //console.log('pgChanged')
        setGetLoader('block');
        chrome.runtime.sendMessage({ action: "get", vidID: cc }, function (response) {
            if (response.verdict) {
                setAllNotes(JSON.parse(response.msg));
                setGetLoader('none');
            } else alert('Some error occured, refresh page!');
        });
        setAllNotes([]);
    }, [cc]);

    function secondsToHms(d) {
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }
    var goToTime = function goToTime(timest) {
        //console.log("timest: ", timest);
        document.getElementsByTagName('video')[0].currentTime = timest;
    };

    var inputEvent = function inputEvent(e) {
        var _e$target2 = e.target,
            name = _e$target2.name,
            value = _e$target2.value;

        if (name !== 'noteac') setNotec(Object.assign({}, notec, _defineProperty({}, name, toInt(value))));else setNotec(Object.assign({}, notec, _defineProperty({}, name, value)));
    };

    var logout = function logout() {
        chrome.runtime.sendMessage({ action: "logout" }, function (response) {
            //console.log(response.verdict);
            setLogin(!response.verdict);
            //badaThis.setState({ isLogin: response.verdict });
        });
    };
    var toInt = function toInt(a) {
        if (typeof a === 'number') return a;else return parseInt(a);
    };
    var noteSubmit = function noteSubmit(event) {
        event.preventDefault();

        //setAllNotes(allNotes.concat(<Note content={notec.noteac} hh={toInt(notec.hh)} mm={toInt(notec.mm)} ss={toInt(notec.ss)} />));
        var timest = notec.hh * 3600 + notec.mm * 60 + notec.ss;
        if (allNotes.find(function (o) {
            return o.timestamp === timest;
        }) !== undefined) {
            setErr('Timestamp already exists!');
            return;
        }
        setLoad('inline-block');
        chrome.runtime.sendMessage({ action: "add", vidID: getVideoID(), timestamp: timest, noteContent: notec.noteac }, function (response) {
            //console.log(response.verdict);
            if (response.verdict === true) {
                setAllNotes(allNotes.concat({ timestamp: timest, noteContent: notec.noteac }));
                setNotec({ hh: 0, mm: 0, ss: 0, noteac: '' });
                setErr("");
            } else {
                setErr('Some error occured , try again.');
            }
            setLoad('none');
        });
    };
    var deleteData = function deleteData(timest) {
        //console.log('Del: ', timest);
        setErr('Deleting...');
        chrome.runtime.sendMessage({ action: "delete", vidID: getVideoID(), timestamp: timest }, function (response) {
            if (response.verdict === true) {
                var newNotes = allNotes.filter(function (notte) {
                    return notte.timestamp !== timest;
                });
                setAllNotes(newNotes);
                setErr('');
            } else setErr('Some error occured while deleting , try again.');
        });
    };

    return React.createElement(
        'div',
        { id: 'notes', 'class': 'notes' },
        React.createElement(
            'p',
            { className: 'd-flex justify-content-between' },
            React.createElement(
                'a',
                { 'class': 'btn btn-outline-success', href: 'https://youmark-backend.herokuapp.com', target: '_blank', rel: 'noopener noreferrer' },
                'See all bookmarks'
            ),
            React.createElement(
                'button',
                { 'class': 'btn btn-outline-danger', onClick: logout },
                'Log Out'
            )
        ),
        React.createElement('br', null),
        React.createElement(
            'form',
            { onSubmit: noteSubmit },
            'Time: ',
            React.createElement('input', { type: 'number', name: 'hh', onChange: inputEvent, value: notec.hh, style: { width: "35px" }, required: true, min: '0', oninput: 'validity.valid||(value=\'\');' }),
            React.createElement(
                'b',
                null,
                ' : '
            ),
            React.createElement('input', { type: 'number', name: 'mm', onChange: inputEvent, value: notec.mm, style: { width: "35px" }, required: true, min: '0', oninput: 'validity.valid||(value=\'\');' }),
            React.createElement(
                'b',
                null,
                ' : '
            ),
            React.createElement('input', { type: 'number', name: 'ss', onChange: inputEvent, value: notec.ss, style: { width: "35px" }, required: true, min: '0', oninput: 'validity.valid||(value=\'\');' }),
            React.createElement('br', null),
            React.createElement(
                'div',
                { 'class': 'form-group' },
                React.createElement(
                    'label',
                    { 'for': 'note' },
                    'Note: '
                ),
                React.createElement('textarea', { 'class': 'form-control', name: 'noteac', onChange: inputEvent, value: notec.noteac, id: 'note', rows: '3' })
            ),
            React.createElement(
                'button',
                { 'class': 'btn btn-primary my-1', type: 'submit' },
                'Submit ',
                React.createElement('span', { style: { display: '' + load }, 'class': 'spinner-grow spinner-grow-sm', role: 'status', 'aria-hidden': 'true' })
            ),
            React.createElement(
                'div',
                null,
                err
            )
        ),
        React.createElement('br', null),
        React.createElement(
            'div',
            { className: 'd-flex justify-content-center' },
            React.createElement('div', { className: 'spinner-border', style: { height: '3rem', width: '3rem', display: '' + getLoader }, role: 'status' })
        ),
        React.createElement(
            'div',
            { className: 'accordion' },
            allNotes.map(function (Note) {
                return React.createElement(
                    'div',
                    { 'class': 'accordion-item' },
                    React.createElement(
                        'div',
                        { 'class': 'accorbtn collapsed', type: 'button', 'data-bs-toggle': 'collapse', 'data-bs-target': '#n' + Note.timestamp, 'aria-expanded': 'false', 'aria-controls': 'panelsStayOpen' },
                        React.createElement(
                            'span',
                            { 'class': 'd-flex justify-content-between align-items-center p-1' },
                            Note.noteContent.slice(0, 30),
                            '...',
                            React.createElement(
                                'span',
                                { 'class': 'p-1' },
                                React.createElement(
                                    'button',
                                    { 'class': 'time-link', onClick: function onClick() {
                                            return goToTime(Note.timestamp);
                                        } },
                                    secondsToHms(Note.timestamp)
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'n' + Note.timestamp, 'class': 'accordion-collapse collapse', 'aria-labelledby': 'panelsStayOpen' },
                        React.createElement(
                            'div',
                            { 'class': 'accordion-body' },
                            React.createElement(
                                'p',
                                null,
                                Note.noteContent
                            ),
                            React.createElement(
                                'button',
                                { 'class': 'btn-danger goRight', onClick: function onClick() {
                                        return deleteData(Note.timestamp);
                                    } },
                                'Delete'
                            )
                        )
                    )
                );
            })
        )
    );
}

function App() {
    var _useState21 = useState(false),
        _useState22 = _slicedToArray(_useState21, 2),
        isLogin = _useState22[0],
        setLogin = _useState22[1];

    var _useState23 = useState({
        loadDisplay: 'block',
        divVis: 'hidden'
    }),
        _useState24 = _slicedToArray(_useState23, 2),
        disp = _useState24[0],
        setDisp = _useState24[1];

    useEffect(function () {
        chrome.runtime.sendMessage({ action: "verify" }, function (response) {
            //console.log(response.verdict);
            setLogin(response.verdict);
            setDisp({ loadDisplay: 'none', divVis: 'visible' });
        });
    }, []);
    var getVideoID = function getVideoID() {
        var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        r = document.URL.match(rx);
        return r[1];
    };
    //console.log('This is apperrrr: ');
    return React.createElement(
        'div',
        null,
        React.createElement('div', { style: { display: '' + disp.loadDisplay }, id: 'loader' }),
        React.createElement(
            'div',
            { style: { visibility: '' + disp.divVis } },
            isLogin ? React.createElement(Notes, { setLogin: setLogin, vid: getVideoID() }) : React.createElement(LoginSignup, { setLogin: setLogin })
        )
    );
}
//num +ve: https://stackoverflow.com/questions/19233415/how-to-make-type-number-to-positive-numbers-only
//Run jsx pre processor: npx babel --watch src --out-dir . --presets react-app/prod