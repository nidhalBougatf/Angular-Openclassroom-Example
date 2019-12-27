export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public drinkPreference: string,
    public hobbies?: string[] // ? : meeans it's an optional parameter 
  ) {}

  // exemple off object creation : 
  //const user = new User('James', 'Smith', 'james@james.com', 'jus d\'orange', ['football', 'lecture'])
}