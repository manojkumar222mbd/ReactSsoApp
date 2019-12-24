const dev = {
    apiUrl: `http://localhost:3000`,
    client_id: `baf50a1c-1a7d-11ea-978f-2e728ce88125`
}

const prod = {
    apiUrl: `http://`,
    client_id: `baf50a1c-1a7d-11ea-978f-2e728ce88125`
}

const config = process.env.NODE_ENV === 'production' ? prod : dev;
export default {
    ...config
};