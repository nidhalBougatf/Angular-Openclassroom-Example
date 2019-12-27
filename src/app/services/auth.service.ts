export class AuthService {

  isAuth = false;

  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000 // 2 seconds , for just simulating the communication with the server
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
}