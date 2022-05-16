export class User{
    constructor(email, role){
        this.email = email;
        this.role = role;
    }
    toString(){
        return this.email + ', ' + this.role;
    }
}

const UserConverter = {
    toFirestore: (user) =>{
        return{
            email: user.email,
            role: user.role
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.email, data.role);
    }
};