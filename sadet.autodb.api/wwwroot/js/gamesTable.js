class GamesTable {

    // Table
    table = undefined;

    // Search
    searchInput = undefined;
    searchLeft = undefined;
    searchRight = undefined;

    // Paging
    pageSize = 5;
    pageCurrent = 0;
    pageOverstep = 0;
    pageMax = 1;
    pagingLeft = undefined;
    pagingRight = undefined;
    pagingIndicator = undefined;

    // Events
    onFill = [];
    onClick = [];

    // Objects
    apiWrapper = undefined;

    // Filter
    filtern0 = undefined;
    filtern100 = undefined;
    filterDropped = undefined;

    constructor(config) {
        this.table = config.table;
        this.searchLeft = config.search.left;
        this.searchRight = config.search.right;
        this.searchInput = config.search.input;
        this.pageSize = config.pageSize;
        this.filtern0 = config.filter.n0;
        this.filtern100 = config.filter.n100;
        this.filterDropped = config.filter.dropped;
        this.apiWrapper = config.apiWrapper;
        this.pagingLeft = config.paging.left;
        this.pagingLeft.onclick = this.PageDown.bind(this);
        this.pagingRight = config.paging.right;
        this.pagingRight.onclick = this.PageUp.bind(this);
        this.pagingIndicator = config.paging.indicator;
    }

    RegisterOnFillEvent(callback) {
        this.onFill.push(callback);
        return this;
    }

    RegisterOnClickEvent(callback) {
        this.onClick.push(callback);
        return this;
    }

    Fill() {
        this.apiWrapper.getTableData()
            .then(rows => {
                this.data = rows;
                this.pageOverstep = rows.length % this.pageSize;
                this.pageMax = (rows.length - this.pageOverstep) / this.pageSize;
                if (this.pageOverstep !== 0)
                    this.pageMax++;
            })
            .then(this.LoadPage.bind(this))
            .then(this.CallbackFill.bind(this));
        return this;
    }

    LoadPage() {
        let table = this.table;

        for (let i = table.rows.length - 1; i > 0; i--) {
            table.deleteRow(i);
        }

        let max = this.pageCurrent * this.pageSize + this.pageSize;
        for (let i = this.pageCurrent * this.pageSize; i < max; i++) {
            let rowData = this.data[i];

            if (this.pageCurrent + 1 >= this.pageMax && i > max - this.pageOverstep)
                rowData = {
                    appid: -i,
                    name: '...',
                    completion: '...',
                    dropped: false
                }

            let row = table.insertRow(-1);
            row.onclick = event => {
                this.CallbackClick(event.target.parentNode);
            }

            let cellAppId = row.insertCell(0);
            cellAppId.textContent = rowData.appid;
            cellAppId.style = 'display: none';

            let cellName = row.insertCell(1);
            cellName.textContent = rowData.name;

            let cellPercent = row.insertCell(2);
            cellPercent.textContent = rowData.percent;

            let cellDropped = row.insertCell(3);
            cellDropped.textContent = rowData.dropped;
            cellDropped.style = 'display: none';
        }
        this.pagingIndicator.textContent = this.pageCurrent + 1;
    }

    PageUp() {
        this.pageCurrent++;
        if (this.pageCurrent >= this.pageMax)
            this.pageCurrent = this.pageMax - 1;
        this.LoadPage();
    }

    PageDown() {
        this.pageCurrent--;
        if (this.pageCurrent < 0)
            this.pageCurrent = 0;
        this.LoadPage();
    }

    CallbackFill() {
        this.onFill.forEach(item => {
            item(this);
        });
    }

    CallbackClick(row) {
        this.onClick.forEach(item => {
            item(row);
        });
    }

    ClickFirstRow() {
        this.table.rows[1].cells[1].click();
    }
}