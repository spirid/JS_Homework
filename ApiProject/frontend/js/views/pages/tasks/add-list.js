import Component from '../../../views/component';
import Tasks from '../../../models/tasks';
import AddAndListTemplate from '../../../../templates/pages/tasks/add-list';

class AddAndList extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTasksList().then(tasks => resolve(tasks)));
    }

    render(tasks) {
        return new Promise(resolve => resolve(AddAndListTemplate({tasks})));
    }

    afterRender() {
        this.setActions();
    }


    setActions() {
        ;(function () {
            'use strict';
           
            let startGame = false;
            let isHandlerPlacement = false;
            let isHandlerController = false;
            let compShot = false;
            
            const getElement = id => document.getElementById(id);
            const getCoordinates = el => {
                const coords = el.getBoundingClientRect();
                return {
                    left: coords.left + window.pageXOffset,
                    right: coords.right + window.pageXOffset,
                    top: coords.top + window.pageYOffset,
                    bottom: coords.bottom + window.pageYOffset
                };
            };

            class Field {
                static FIELD_SIDE = 330;
                static SHIP_SIDE = 33;
                static SHIP_DATA = {
                    fourdeck: [1, 4],
                    tripledeck: [2, 3],
                    doubledeck: [3, 2],
                    singledeck: [4, 1]
                };

                constructor(field) {
                    this.field = field;
                    this.squadron = {};
                    this.matrix = [];
                    let {left, right, top, bottom} = getCoordinates(this.field);
                    this.fieldLeft = left;
                    this.fieldRight = right;
                    this.fieldTop = top;
                    this.fieldBottom = bottom;
                }

                static createMatrix() {
                    return [...Array(10)].map(() => Array(10).fill(0));
                }
                static getRandom = n => Math.floor(Math.random() * (n + 1));

                cleanField() {
                    while (this.field.firstChild) {
                        this.field.removeChild(this.field.firstChild);
                    }
                    this.squadron = {};
                    this.matrix = Field.createMatrix();
                }

                randomLocationShips() {
                    for (let type in Field.SHIP_DATA) {
                        let count = Field.SHIP_DATA[type][0];
                        let decks = Field.SHIP_DATA[type][1];
                        for (let i = 0; i < count; i++) {
                            let options = this.getCoordsDecks(decks);
                            options.decks = decks;
                            options.shipname = type + String(i + 1);
                            const ship = new Ships(this, options);
                            ship.createShip();
                        }
                    }
                }

                getCoordsDecks(decks) {
                    let kx = Field.getRandom(1), ky = (kx == 0) ? 1 : 0,
                        x, y;
                    if (kx == 0) {
                        x = Field.getRandom(9);
                        y = Field.getRandom(10 - decks);
                    } else {
                        x = Field.getRandom(10 - decks);
                        y = Field.getRandom(9);
                    }

                    const obj = {x, y, kx, ky}
                    const result = this.checkLocationShip(obj, decks);
                    if (!result) return this.getCoordsDecks(decks);
                    return obj;
                }

                checkLocationShip(obj, decks) {
                    let {x, y, kx, ky, fromX, toX, fromY, toY} = obj;
                    fromX = (x == 0) ? x : x - 1;
                    if (x + kx * decks == 10 && kx == 1) toX = x + kx * decks;
                    else if (x + kx * decks < 10 && kx == 1) toX = x + kx * decks + 1;
                    else if (x == 9 && kx == 0) toX = x + 1;
                    else if (x < 9 && kx == 0) toX = x + 2;
                    
                    fromY = (y == 0) ? y : y - 1;
                    if (y + ky * decks == 10 && ky == 1) toY = y + ky * decks;
                    else if (y + ky * decks < 10 && ky == 1) toY = y + ky * decks + 1;
                    else if (y == 9 && ky == 0) toY = y + 1;
                    else if (y < 9 && ky == 0) toY = y + 2;

                    if (toX === undefined || toY === undefined) return false;
                    
                    if (this.matrix.slice(fromX, toX)
                        .filter(arr => arr.slice(fromY, toY).includes(1))
                        .length > 0) return false;
                    return true;
                }
            }
            
            class Ships {
                constructor(self, {x, y, kx, ky, decks, shipname}) {
                    this.player = (self === human) ? human : computer;
                    this.field = self.field;
                    this.shipname = shipname;
                    this.decks = decks;
                    this.x = x;
                    this.y = y;
                    this.kx = kx;
                    this.ky = ky;
                    this.hits = 0;
                    this.arrDecks = [];
                }

                static showShip(self, shipname, x, y, kx) {
                    const div = document.createElement('div');
                    const classname = shipname.slice(0, -1);
                    const dir = (kx == 1) ? ' vertical' : '';
                    
                    div.setAttribute('id', shipname);
                    div.className = `ship ${classname}${dir}`;
                    div.style.cssText = `left:${y * Field.SHIP_SIDE}px; top:${x * Field.SHIP_SIDE}px;`;
                    self.field.appendChild(div);
                }

                createShip() {
                    let {player, field, shipname, decks, x, y, kx, ky, hits, arrDecks, k = 0} = this;

                    while (k < decks) {
                        let i = x + k * kx, j = y + k * ky;
                        player.matrix[i][j] = 1;
                        arrDecks.push([i, j]);
                        k++;
                    }
                    
                    player.squadron[shipname] = {arrDecks, hits, x, y, kx, ky};
                    if (player === human) {
                        Ships.showShip(human, shipname, x, y, kx);
                        if (Object.keys(player.squadron).length == 10) {
                            buttonPlay.dataset.hidden = false;
                        }
                    }
                }
            }

            class Placement {
                constructor() {
                    this.field = humanfield;
                    this.dragObject = {};
                    this.pressed = false;

                    let {left, right, top, bottom} = getCoordinates(this.field);
                    this.fieldLeft = left;
                    this.fieldRight = right;
                    this.fieldTop = top;
                    this.fieldBottom = bottom;
                }

                static getShipName = el => el.getAttribute('id');
                static getCloneDecks = el => {
                    const type = el.getAttribute('id').slice(0, -1);
                    return Field.SHIP_DATA[type][1];
                }

                setObserver() {
                    if (isHandlerPlacement) return;
                    document.addEventListener('mousedown', this.onMouseDown.bind(this));
                    this.field.addEventListener('contextmenu', this.rotationShip.bind(this));
                    document.addEventListener('mousemove', this.onMouseMove.bind(this));
                    document.addEventListener('mouseup', this.onMouseUp.bind(this));
                    isHandlerPlacement = true;
                }

                onMouseDown(e) {
                    if (e.which != 1 || startGame) return;

                    const el = e.target.closest('.ship');
                    if (!el) return;
                    this.pressed = true;
                    
                    this.dragObject = {
                        el,
                        parent: el.parentElement,
                        next: el.nextElementSibling,
                        downX: e.pageX,
                        downY: e.pageY,
                        left: el.offsetLeft,
                        top: el.offsetTop,
                        kx: 0,
                        ky: 1
                    };
                    
                    if (el.parentElement === this.field) {
                        const name = Placement.getShipName(el);
                        this.dragObject.kx = human.squadron[name].kx;
                        this.dragObject.ky = human.squadron[name].ky;
                    }
                }

                onMouseMove(e) {
                    if (!this.pressed || !this.dragObject.el) return;

                    let {left, right, top, bottom} = getCoordinates(this.dragObject.el);

                    if (!this.clone) {
                        this.decks = Placement.getCloneDecks(this.dragObject.el);
                        this.clone = this.creatClone({left, right, top, bottom}) || null;
                        if (!this.clone) return;
                        this.shiftX = this.dragObject.downX - left;
                        this.shiftY = this.dragObject.downY - top;
                        this.clone.style.zIndex = '1000';
                        document.body.appendChild(this.clone);

                        this.removeShipFromSquadron(this.clone);
                    }
                    
                    let currentLeft = Math.round(e.pageX - this.shiftX),
                        currentTop = Math.round(e.pageY - this.shiftY);
                    this.clone.style.left = `${currentLeft}px`;
                    this.clone.style.top = `${currentTop}px`;
                    
                    if (left >= this.fieldLeft - 14 && right <= this.fieldRight + 14 && top >= this.fieldTop - 14 && bottom <= this.fieldBottom + 14) {
                        const coords = this.getCoordsCloneInMatrix({left, right, top, bottom});
                        const obj = {
                            x: coords.x,
                            y: coords.y,
                            kx: this.dragObject.kx,
                            ky: this.dragObject.ky
                        };

                        const result = human.checkLocationShip(obj, this.decks);
                        if (result) {
                            this.clone.classList.remove('unsuccess');
                            this.clone.classList.add('success');
                        } else {
                            this.clone.classList.remove('success');
                            this.clone.classList.add('unsuccess');
                        }
                    } else {
                        this.clone.classList.remove('success');
                        this.clone.classList.add('unsuccess');
                    }
                }

                onMouseUp() {
                    this.pressed = false;
                    if (!this.clone) return;

                    if (this.clone.classList.contains('unsuccess')) {
                        this.clone.classList.remove('unsuccess');
                        this.clone.rollback();
                    } else {
                        this.createShipAfterEditing();
                    }
                    this.removeClone();
                }

                rotationShip(e) {
                    e.preventDefault();
                    if (e.which != 3 || startGame) return;

                    const el = e.target.closest('.ship');
                    const name = Placement.getShipName(el);

                    if (human.squadron[name].decks == 1) return;

                    const obj = {
                        kx: (human.squadron[name].kx == 0) ? 1 : 0,
                        ky: (human.squadron[name].ky == 0) ? 1 : 0,
                        x: human.squadron[name].x,
                        y: human.squadron[name].y
                    };
                    const decks = human.squadron[name].arrDecks.length;
                    this.removeShipFromSquadron(el);
                    human.field.removeChild(el);
                    const result = human.checkLocationShip(obj, decks);

                    if (!result) {
                        obj.kx = (obj.kx == 0) ? 1 : 0;
                        obj.ky = (obj.ky == 0) ? 1 : 0;
                    }
                    
                    obj.shipname = name;
                    obj.decks = decks;
                    
                    const ship = new Ships(human, obj);
                    ship.createShip();

                    if (!result) {
                        const el = getElement(name);
                        el.classList.add('unsuccess');
                        setTimeout(() => {
                            el.classList.remove('unsuccess')
                        }, 750);
                    }
                }

                creatClone(coords) {
                    const clone = this.dragObject.el;
                    const oldPosition = this.dragObject;

                    clone.rollback = () => {
                        if (oldPosition.parent == this.field) {
                            clone.style.left = `${oldPosition.left}px`;
                            clone.style.top = `${oldPosition.top}px`;
                            clone.style.zIndex = '';
                            oldPosition.parent.insertBefore(clone, oldPosition.next);
                            this.createShipAfterEditing();
                        } else {
                            clone.removeAttribute('style');
                            oldPosition.parent.insertBefore(clone, oldPosition.next);
                        }
                    };
                    return clone;
                };

                removeClone() {
                    delete this.clone;
                    this.dragObject = {};
                }

                createShipAfterEditing() {
                    const coords = getCoordinates(this.clone);
                    let {left, top, x, y} = this.getCoordsCloneInMatrix(coords);
                    this.clone.style.left = `${left}px`;
                    this.clone.style.top = `${top}px`;
                    this.field.appendChild(this.clone);
                    this.clone.classList.remove('success');
                    
                    const options = {
                        shipname: Placement.getShipName(this.clone),
                        x,
                        y,
                        kx: this.dragObject.kx,
                        ky: this.dragObject.ky,
                        decks: this.decks
                    };
                    
                    const ship = new Ships(human, options);
                    ship.createShip();
                    this.field.removeChild(this.clone);
                }

                getCoordsCloneInMatrix({left, right, top, bottom} = coords) {
                    let computedLeft = left - this.fieldLeft,
                        computedRight = right - this.fieldLeft,
                        computedTop = top - this.fieldTop,
                        computedBottom = bottom - this.fieldTop;
                    const obj = {};
                    let ft = (computedTop < 0) ? 0 : (computedBottom > Field.FIELD_SIDE) ? Field.FIELD_SIDE - Field.SHIP_SIDE : computedTop;
                    let fl = (computedLeft < 0) ? 0 : (computedRight > Field.FIELD_SIDE) ? Field.FIELD_SIDE - Field.SHIP_SIDE * this.decks : computedLeft;

                    obj.top = Math.round(ft / Field.SHIP_SIDE) * Field.SHIP_SIDE;
                    obj.left = Math.round(fl / Field.SHIP_SIDE) * Field.SHIP_SIDE;
                    obj.x = obj.top / Field.SHIP_SIDE;
                    obj.y = obj.left / Field.SHIP_SIDE;

                    return obj;
                }

                removeShipFromSquadron(el) {
                    const name = Placement.getShipName(el);
                    if (!human.squadron[name]) return;

                    const arr = human.squadron[name].arrDecks;
                    for (let coords of arr) {
                        const [x, y] = coords;
                        human.matrix[x][y] = 0;
                    }
                    delete human.squadron[name];
                }
            }
            
            class Controller {
                static START_POINTS = [
                    [[6, 0], [2, 0], [0, 2], [0, 6]],
                    [[3, 0], [7, 0], [9, 2], [9, 6]]
                ];
                static SERVICE_TEXT = getElement('service_text');

                constructor() {
                    this.player = '';
                    this.opponent = '';
                    this.text = '';
                    this.coordsRandom = [];
                    this.coordsFixed = [];
                    this.coordsAroundHit = [];
                    this.resetTempShip();
                }

                static showServiceText = text => {
                    Controller.SERVICE_TEXT.innerHTML = text;
                }

                static getCoordsIcon(el) {
                    const x = el.style.top.slice(0, -2) / Field.SHIP_SIDE;
                    const y = el.style.left.slice(0, -2) / Field.SHIP_SIDE;
                    return [x, y];
                }

                static removeElementArray(arr, [x, y]) {
                    return arr.filter(item => item[0] != x || item[1] != y);
                }

                init() {
                    const random = Field.getRandom(1);
                    this.player = (random == 0) ? human : computer;
                    this.opponent = (this.player === human) ? computer : human;
                    this.setCoordsShot();
                    if (!isHandlerController) {
                        computerfield.addEventListener('click', this.makeShot.bind(this));
                        computerfield.addEventListener('contextmenu', this.setUselessCell.bind(this));
                        isHandlerController = true;
                    }

                    if (this.player === human) {
                        compShot = false;
                        this.text = 'Your thurn first';
                    } else {
                        compShot = true;
                        this.text = 'Firts turn computer';
                        setTimeout(() => this.makeShot(), 2000);
                    }
                    Controller.showServiceText(this.text);
                }

                setCoordsShot() {
                    for (let i = 0; i < 10; i++) {
                        for (let j = 0; j < 10; j++) {
                            this.coordsRandom.push([i, j]);
                        }
                    }
                    this.coordsRandom.sort((a, b) => Math.random() - 0.5);

                    let x, y;

                    for (let arr of Controller.START_POINTS[0]) {
                        x = arr[0];
                        y = arr[1];
                        while (x <= 9 && y <= 9) {
                            this.coordsFixed.push([x, y]);
                            x = (x <= 9) ? x : 9;
                            y = (y <= 9) ? y : 9;
                            x++;
                            y++;
                        }
                    }

                    for (let arr of Controller.START_POINTS[1]) {
                        x = arr[0];
                        y = arr[1];
                        while (x >= 0 && x <= 9 && y <= 9) {
                            this.coordsFixed.push([x, y]);
                            x = (x >= 0 && x <= 9) ? x : (x < 0) ? 0 : 9;
                            y = (y <= 9) ? y : 9;
                            x--;
                            y++;
                        }
                        ;
                    }
                    this.coordsFixed = this.coordsFixed.reverse();
                }

                setCoordsAroundHit(x, y) {
                    let {firstHit, kx, ky} = this.tempShip;
                    let arr = [];

                    if (firstHit.length == 0) {
                        this.tempShip.firstHit = [x, y];
                    } else if (kx == 0 && ky == 0) {
                        this.tempShip.kx = (Math.abs(firstHit[0] - x) == 1) ? 1 : 0;
                        this.tempShip.ky = (Math.abs(firstHit[1] - y) == 1) ? 1 : 0;
                    }
                    if (x > 0) this.coordsAroundHit.push([x - 1, y]);
                    if (x < 9) this.coordsAroundHit.push([x + 1, y]);
                    if (y > 0) this.coordsAroundHit.push([x, y - 1]);
                    if (y < 9) this.coordsAroundHit.push([x, y + 1]);
                    arr = this.coordsAroundHit.filter(([x, y]) => human.matrix[x][y] == 0 || human.matrix[x][y] == 1);
                    this.coordsAroundHit = [...arr];
                }

                setUselessCell(e) {
                    e.preventDefault();
                    if (e !== undefined && e.which != 3 || compShot) return;
                    const coords = this.transformCoordsInMatrix(e, computer);
                    const check = this.checkUselessCell(coords);
                    if (check) {
                        this.showIcons(this.opponent, coords, 'shaded-cell');
                    }
                }

                transformCoordsInMatrix(e, self) {
                    const x = Math.trunc((e.pageY - self.fieldTop) / Field.SHIP_SIDE);
                    const y = Math.trunc((e.pageX - self.fieldLeft) / Field.SHIP_SIDE);
                    return [x, y];
                }

                removeCoordsFromArrays(coords) {
                    if (this.coordsAroundHit.length > 0) {
                        this.coordsAroundHit = Controller.removeElementArray(this.coordsAroundHit, coords);
                    }
                    if (this.coordsFixed.length > 0) {
                        this.coordsFixed = Controller.removeElementArray(this.coordsFixed, coords);
                    }
                    this.coordsRandom = Controller.removeElementArray(this.coordsRandom, coords);
                }

                checkUselessCell(coords) {
                    if (computer.matrix[coords[0]][coords[1]] > 1) return false;
                    const icons = this.opponent.field.querySelectorAll('.icon-field');
                    if (icons.length == 0) return true;
                    for (let icon of icons) {
                        const [x, y] = Controller.getCoordsIcon(icon);
                        if (coords[0] == x && coords[1] == y && icon.classList.contains('shaded-cell')) {
                            const f = (new Error()).stack.split('\n')[2].trim().split(' ')[1];
                            if (f == 'Controller.setUselessCell') {
                                icon.parentElement.removeChild(icon);
                            } else {
                                icon.classList.add('shaded-cell_red');
                                setTimeout(() => {
                                    icon.classList.remove('shaded-cell_red')
                                }, 500);
                            }
                            return false;
                        }
                    }
                    return true;
                }

                markUselessCell(coords) {
                    let n = 0, x, y;
                    for (let coord of coords) {
                        x = coord[0];
                        y = coord[1];
                        if (x < 0 || x > 9 || y < 0 || y > 9) continue;
                        if (human.matrix[x][y] != 0) continue;
                        human.matrix[x][y] = 2;
                        n++;
                        setTimeout(() => this.showIcons(human, coord, 'shaded-cell'), 350 * n);
                        this.removeCoordsFromArrays(coord);
                    }
                }

                markUselessCellAroundShip(coords) {
                    const {hits, kx, ky, x0, y0} = this.tempShip;
                    let points;
                    if (this.tempShip.hits == 1) {
                        points = [
                            [x0 - 1, y0],
                            [x0 + 1, y0],
                            [x0, y0 - 1],
                            [x0, y0 + 1]
                        ];
                    } else {
                        points = [
                            [x0 - kx, y0 - ky],
                            [x0 + kx * hits, y0 + ky * hits]
                        ];
                    }
                    this.markUselessCell(points);
                }

                showIcons(opponent, [x, y], iconClass) {
                    const field = opponent.field;
                    if (iconClass === 'dot' || iconClass === 'red-cross') {
                        setTimeout(() => fn(), 400);
                    } else {
                        fn();
                    }

                    function fn() {
                        const span = document.createElement('span');
                        span.className = `icon-field ${iconClass}`;
                        span.style.cssText = `left:${y * Field.SHIP_SIDE}px; top:${x * Field.SHIP_SIDE}px;`;
                        field.appendChild(span);
                    }
                }

                getCoordsForShot() {
                    const coords = (this.coordsAroundHit.length > 0) ? this.coordsAroundHit.pop() : (this.coordsFixed.length > 0) ? this.coordsFixed.pop() : this.coordsRandom.pop();
                    this.removeCoordsFromArrays(coords);
                    return coords;
                }

                resetTempShip() {
                    this.tempShip = {
                        hits: 0,
                        firstHit: [],
                        kx: 0,
                        ky: 0
                    };
                }

                makeShot(e) {
                    let x, y;
                    if (e !== undefined) {
                        if (e.which != 1 || compShot) return;
                        ([x, y] = this.transformCoordsInMatrix(e, this.opponent));
                        const check = this.checkUselessCell([x, y]);
                        if (!check) return;
                    } else {
                        ([x, y] = this.getCoordsForShot());
                    }
                    this.showIcons(this.opponent, [x, y], 'explosion');
                    const explosion = this.opponent.field.querySelector('.explosion');
                    setTimeout(() => explosion.classList.add('active'), 0);
                    setTimeout(() => explosion.classList.remove('active'), 250);
                    setTimeout(() => explosion.parentElement.removeChild(explosion), 300);

                    const v = this.opponent.matrix[x][y];
                    switch (v) {
                        case 0: 
                            this.miss(x, y);
                            break;
                        case 1: 
                            this.hit(x, y);
                            break;
                        case 3:
                        case 4:
                            Controller.showServiceText('You have already shot at these coordinates.!');
                            break;
                    }
                }

                miss(x, y) {
                    let text = '';
                    this.showIcons(this.opponent, [x, y], 'dot');
                    this.opponent.matrix[x][y] = 3;
                    if (this.player === human) {
                        text = 'You miss. Computer turn.';
                        this.player = computer;
                        this.opponent = human;
                        compShot = true;
                        setTimeout(() => this.makeShot(), 2000);
                    } else {
                        text = 'Computer miss click. Your turn.';
                        if (this.coordsAroundHit.length == 0 && this.tempShip.hits > 0) {
                            this.markUselessCellAroundShip([x, y]);
                            this.resetTempShip();
                        }
                        this.player = human;
                        this.opponent = computer;
                        compShot = false;
                    }
                    setTimeout(() => Controller.showServiceText(text), 400);
                }

                hit(x, y) {
                    let text = '';
                    this.showIcons(this.opponent, [x, y], 'red-cross');
                    this.opponent.matrix[x][y] = 4;
                    text = (this.player === human) ? 'Сongratulations! Your click is rigth.' : 'Computer hurt your ship. Computer turn';
                    setTimeout(() => Controller.showServiceText(text), 400);
                    for (let name in this.opponent.squadron) {
                        const dataShip = this.opponent.squadron[name];
                        for (let value of dataShip.arrDecks) {
                            if (value[0] == x && value[1] == y) {
                                dataShip.hits++;
                                if (dataShip.hits == dataShip.arrDecks.length) {
                                    if (this.opponent === human) {
                                        this.tempShip.x0 = dataShip.x;
                                        this.tempShip.y0 = dataShip.y;
                                    }
                                    delete this.opponent.squadron[name];
                                }
                            }
                        }
                    }
                    if (Object.keys(this.opponent.squadron).length == 0) {
                        if (this.opponent === human) {
                            text = 'К сожалению, вы проиграли.';
                            for (let name in computer.squadron) {
                                const dataShip = computer.squadron[name];
                                Ships.showShip(computer, name, dataShip.x, dataShip.y, dataShip.kx);
                            }
                        } else {
                            text = 'Сongratulations! This your win!';
                        }
                        Controller.showServiceText(text);
                        buttonNewGame.dataset.hidden = false;
                    } else if (this.opponent === human) {
                        this.tempShip.hits++;
                        const coords = [
                            [x - 1, y - 1],
                            [x - 1, y + 1],
                            [x + 1, y - 1],
                            [x + 1, y + 1]
                        ];
                        this.markUselessCell(coords);
                        this.setCoordsAroundHit(x, y);
                        let obj = Object.values(human.squadron)
                            .reduce((a, b) => a.arrDecks.length > b.arrDecks.length ? a : b);
                        if (this.tempShip.hits >= obj.arrDecks.length || this.coordsAroundHit.length == 0) {
                            this.markUselessCellAroundShip(coords);
                            this.coordsAroundHit = [];
                            this.resetTempShip();
                        }
                        setTimeout(() => this.makeShot(), 2000);
                    }
                }
            }
            const shipsCollection = getElement('ships_collection');
            const initialShips = document.querySelector('.wrap + .initial-ships');
            const toptext = getElement('text_top');
            const buttonPlay = getElement('play');
            const buttonNewGame = getElement('newgame');
            const humanfield = getElement('field_human');
            const human = new Field(humanfield);
            const computerfield = getElement('field_computer');
            let computer = {};

            getElement('type_placement').addEventListener('click', function (e) {
                if (e.target.tagName != 'SPAN') return;
                buttonPlay.dataset.hidden = true;
                human.cleanField();
                let initialShipsClone = '';
                const type = e.target.dataset.target;
                const typeGeneration = {
                    random() {
                        shipsCollection.hidden = true;
                        human.randomLocationShips();
                    },
                    manually() {
                        let value = !shipsCollection.hidden;

                        if (shipsCollection.children.length > 1) {
                            shipsCollection.removeChild(shipsCollection.lastChild);
                        }

                        if (!value) {
                            initialShipsClone = initialShips.cloneNode(true);
                            shipsCollection.appendChild(initialShipsClone);
                            initialShipsClone.hidden = false;
                        }

                        shipsCollection.hidden = value;
                    }
                };
                typeGeneration[type]();
                const placement = new Placement();
                placement.setObserver();
            });
            let battle = null;
            buttonPlay.addEventListener('click', function (e) {
                buttonPlay.dataset.hidden = true;
                instruction.hidden = true;
                computerfield.parentElement.hidden = false;
                toptext.innerHTML = 'Game Start';
                computer = new Field(computerfield);
                computer.cleanField();
                computer.randomLocationShips();
                startGame = true;
                if (!battle) battle = new Controller();
                battle.init();
            });

            buttonNewGame.addEventListener('click', function (e) {
                buttonNewGame.dataset.hidden = true;
                computerfield.parentElement.hidden = true;
                instruction.hidden = false;
                human.cleanField();
                toptext.innerHTML = 'Place your ships';
                Controller.SERVICE_TEXT.innerHTML = '';
                startGame = false;
                compShot = false;
                battle.coordsRandom = [];
                battle.coordsFixed = [];
                battle.coordsAroundHit = [];
                battle.resetTempShip();
            });

            function printMatrix() {
                let print = '';
                for (let x = 0; x < 10; x++) {
                    for (let y = 0; y < 10; y++) {
                        print += human.matrix[x][y];
                    }
                    print += '<br>';
                }
                getElement('matrix').innerHTML = print;
            }
        })();

    }
}

export default AddAndList;