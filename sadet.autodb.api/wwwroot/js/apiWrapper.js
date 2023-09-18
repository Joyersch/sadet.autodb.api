class ApiWrapper {
    async doGetRequest(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                return await response.json();
            } else {
                throw new Error(`Error: Api return ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            console.error(url);
            throw error;
        }
    }

    async getGames() {
        return await this.doGetRequest('api/games');
    }

    async getGameData(id) {
        return await this.doGetRequest('api/data/' + id);
    }

    async getGameDataLimit(id, limit) {
        let data = await this.doGetRequest('api/data/' + id);
        return {
            count: limit,
            data: data.data.splice(-limit)
        };
    }
}