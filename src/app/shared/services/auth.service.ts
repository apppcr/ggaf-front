import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private angularFire: AngularFireAuth,
        private router: Router
    ) { }

    signIn(email: string, password: string): Promise<auth.UserCredential> {
        return this.angularFire.auth.signInWithEmailAndPassword(email, password);
    }

    signUp(email: string, password: string): Promise<auth.UserCredential> {
        return this.angularFire.auth.createUserWithEmailAndPassword(email, password);
    }

    identifyTheLoggedInUser(): any {
        return this.angularFire.auth.currentUser;
    }

    createCustomToken(): any {
        return this.angularFire.idTokenResult;
    }

    signOut(): any {
        return this.angularFire.auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                this.router.navigate(['/']);
            });
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    sendEmailVerification(): any {
        this.angularFire.auth.languageCode = 'pt-BR';
        return this.angularFire.auth.currentUser.sendEmailVerification();
    }

    updateProfile(data: any): any {
        return this.angularFire.auth.currentUser.updateProfile(data);
    }

    sendPasswordResetEmail(email: string): any {
        this.angularFire.auth.languageCode = 'pt-BR';
        return this.angularFire.auth.sendPasswordResetEmail(email);
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(sessionStorage.getItem('userFirebase'));
        return !!user && user.emailVerified;
    }

    getSessionUser(): any {
        this.angularFire.authState.subscribe(user => {
            if (user) {
                localStorage.setItem('userFirebase', JSON.stringify(user));
            } else {
                localStorage.setItem('userFirebase', null);
            }
        });
    }
}
