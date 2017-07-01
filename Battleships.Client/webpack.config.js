const path = require('path')

module.exports = {
    entry: {
       index: path.resolve(__dirname, 'src/index.js'),
       createLobby: path.resolve(__dirname, 'src/create-lobby.js'),
       joinLobby: path.resolve(__dirname, 'src/join-lobby.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/scripts'),
        publicPath: '/'
    }
}