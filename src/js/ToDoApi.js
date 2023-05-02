

export default {
    baseUrl: "https://localhost:7213/api/todoitems",
    getTodoItems: function (callback) {
        let url = this.baseUrl;
        let fetchPromise = fetch(url); // sends fetch request
        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    },
    addTodoItem: function (description, callback) {
        let url = this.baseUrl;

        let payload = {
            "task": description,
            "isComplete": false
        };

        // stringified
        // '{"task":description, "isComplete":false}'

        let fetchPromise = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        });

        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    },
    updateTodoItem: function (id, complete, callback) {
        let url = this.baseUrl + `/${id}/${complete}`;

        let payload = {
            "isComplete": complete,
            "id": id
        };


        let fetchPromise = fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(payload)
        });

        let jsonPromise = fetchPromise.then(response => response.json()); // takes fetch respose, asks to ==> json
        jsonPromise.then(json => { callback(json) }); // when json'd send to callback function
    }
};