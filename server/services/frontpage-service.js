const config = require('../config');

let frontpageCache;

async function getFrontpage () {
    if (!frontpageCache) {   
        await rebuildCache();
    }
    return frontpageCache;
}

async function rebuildCache () {
    try {
        const response = await fetch(`${config.apiUri}/frontpage`);
        frontpageCache = await response.json();
    } catch (error) {
        console.log(error);
    }
}

// setTimeout(rebuildCache, 10000);
// setInterval(rebuildCache, 60000);

module.exports = {
    getFrontpage
};
