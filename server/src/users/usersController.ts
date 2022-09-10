import User from '.'

export default class UsersController {

    static async createUser() {
        console.log("\tCreateUser");
        const user = new User({ password: '12345ABCDE' });
    }
}
