const homeController = {
    joinLobby: async function (value, history) {
        const result = await homeController.register(value);
        history.push('/join', {
            currentUser: result
        });
    },
    createLobby: async function (value, history) {
        const result = await homeController.register(value);        
        history.push('/create', {
            currentUser: result
        });
    },
    register: function (value) {
        return new Promise(async (resolve, reject) => {
            if (!!value && value !== '') {
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(value)
                };

                try {
                    const response = await fetch('/api/users/register', options);
                    const user = await response.json();
                    return resolve(user);
                } catch (ex) {
                    return reject(new Error(ex));
                }
            }
        })
    },
    execute: function (cmd, ...args) {
        return homeController[cmd] && homeController[cmd].call(homeController, ...args);
    }
};

export default homeController;