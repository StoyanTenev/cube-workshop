const { v4: uuid } = require('uuid');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = uuid();
        this.name = name || 'No name';
        this.description = description;
        this.imageUrl = imageUrl || 'placeholder';
        this.difficulty = difficulty || 0;
    }

    create() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty,
        };
    }
}

module.exports = {
    Cube
}
