class game {
    constructor(length) {
        this.length = length;
        this.height = this.length;
        this.grid = []
        this.blackSpread = 0.6;
        this.cycleTime = 50;
        this.grid_el = document.getElementsByTagName("grid")[0];
        this.wait=ms=>new Promise(resolve => setTimeout(resolve, ms)); 
    }
    newEmptyGrid() {
        this.tmp = [];
        for(var i=0;i<this.height * this.length;i++) {
            this.tmp.push(0);
        }
        this.grid.push(this.tmp);

        return this.grid;
    }
    initGrid(random) {
        this.grid_el.style.setProperty('--grid-rows', this.height);
        this.grid_el.style.setProperty('--grid-cols', this.length);
        if(random) {
            for(var c=0;c<(this.height * this.length);c++) {
                var grid_tmp = this.grid;
                this.tmp_color = Math.random() < this.blackSpread ? 0:1;
                this.cell = document.createElement("div");
                this.cell.style.padding = ((window.innerWidth / this.length) / 2) - (0) + "px";
                this.grid[0][c] = this.tmp_color == 1 ? 0:1;

                this.cell.onclick = function() { 
                    document.getElementsByClassName(this.classList[1])[0].style.backgroundColor = grid_tmp[0][this.classList[1]] == 0 ? "black":"white";
                    grid_tmp[0][this.classList[1]] = grid_tmp[0][this.classList[1]] == 0 ? 1:0;
                };
                this.grid_el.appendChild(this.cell).classList = "grid-item " + c;
                this.grid = grid_tmp;
            }
        } else {
            for(var c=0;c<(this.height * this.length);c++) {
                var grid_tmp = this.grid;
                this.cell = document.createElement("div");
                this.cell.style.padding = ((window.innerWidth / this.length) / 2) - (0) + "px";
                this.grid[0][c] = 0;
                this.cell.onclick = function() { 
                    document.getElementsByClassName(this.classList[1])[0].style.backgroundColor = grid_tmp[0][this.classList[1]] == 0 ? "black":"white";
                    grid_tmp[0][this.classList[1]] = grid_tmp[0][this.classList[1]] == 0 ? 1:0;
                };
                this.grid_el.appendChild(this.cell).classList = "grid-item " + c;
                this.grid = grid_tmp;
            }
        }
    }
    changeBGColor() {
        var cols = document.getElementsByClassName('col1');
        for(var i=0;i<cols.length;i++) {
            cols[i].style.backgroundColor = 'blue';
        }
    }
    getNeighbours(index, grid) {
        this.blackNeighbours = 0;
        this.directions = [-(this.length + 1), -this.length, -(this.length-1), 1, +(this.length+1), +this.length, +(this.length-1), -1];
        for(var d=0;d<this.directions.length;d++) {
            if(grid[0][index + this.directions[d]] == 1) {
                this.blackNeighbours += 1;
            }
        }
        return this.blackNeighbours;
    }
    lifecycle() {
        this.tmpRemove = [];
        this.tmpAdd = [];
        for(var i=0;i<this.grid[0].length;i++) {
            this.aliveNeighbours = this.getNeighbours(i, this.grid);
            if(this.grid[0][i] == 1) {
                if(this.aliveNeighbours == 3) {
                    this.tmpAdd.push(i);
                } else if(this.aliveNeighbours == 2) {
                    this.tmpAdd.push(i);
                } else if(this.aliveNeighbours <= 1 || this.aliveNeighbours >= 4) {
                    this.tmpRemove.push(i);
                }
            } else if(this.grid[0][i] == 0) {
                if(this.aliveNeighbours == 3) {
                    this.tmpAdd.push(i);
                } else {
                    this.tmpRemove.push(i);
                }
            }
        }
        for(var i=0;i<this.tmpAdd.length;i++) {
            this.grid[0][this.tmpAdd[i]] = 1;
        }
        for(var i=0;i<this.tmpRemove.length;i++) {
            if(!this.tmpAdd.includes(this.tmpRemove[i])) {
                this.grid[0][this.tmpRemove[i]] = 0;
            }
        }
        for(var i=0;i<this.grid[0].length;i++) {
            document.getElementsByClassName(i)[0].style.backgroundColor = this.grid[0][i] == 0 ? "white":"black";
        }
    }
}
Game = new game(100);

game = Game.newEmptyGrid();
Game.initGrid(true);

function start() {
    timer = setInterval(() => {
        Game.lifecycle(); 
    }, Game.cycleTime);
}
function stop() {
    window.clearInterval(timer);
}