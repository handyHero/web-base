
const getItem = function(key) {
    var storage = window.localStorage;
    if (storage) {
        var value = storage.getItem(key);
        return value && JSON.parse(value);
    }
    return null;
};

const setItem = function(key, value) {
    var storage = window.localStorage;
    if (storage) {
        storage.setItem(key, JSON.stringify(value));
    }
};

const removeItem = function(key) {
    var storage = window.localStorage;
    if (storage) {
        storage.removeItem(key);
    }
};

const clearStorage = function() {
    var storage = window.localStorage;
    if (storage) {
        storage.clear();
    }
};

export {
    getItem,
    setItem,
    removeItem,
	clearStorage
}
