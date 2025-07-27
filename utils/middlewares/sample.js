const globalMw = (req, res, next) => {
    console.log('Hello from globla mw');
    next();
}

const globalMw2 = (req, res, next) => {
    console.log('Hello from second globla mw');
    next();
}

const rootMw = (req, res, next) => {
    console.log('Hello from root mw');
    next();
}

const gmw = (req, res, next) => {
    console.log('Hello from greeting mw');
    next();
}

const exclusiveRootMw = (req, res, next) => {
    console.log('hello from exclusive');
    next();
}

const mwClosure = (firstName, favoriteColor) => {
    return (req, res, next) => {
        console.log('Hello', firstName, 'your favorite color is', favoriteColor);
        next();
    }
}

module.exports = {
    globalMw,
    globalMw2,
    rootMw,
    gmw,
    exclusiveRootMw,
    mwClosure
}