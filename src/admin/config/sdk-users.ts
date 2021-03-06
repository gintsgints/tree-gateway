'use strict';

import { UserData } from '../../config/users';
import { checkStatus, getCreatedResource, getResponseBody } from './utils';

export interface Users {
    list(filters: any): Promise<Array<UserData>>;
    addUser(user: UserData): Promise<string>;
    updateUser(login: string, user: UserData): Promise<void>;
    removeUser(login: string): Promise<void>;
    getUser(login: string): Promise<UserData>;
    changeUserPassword(login: string, password: string): Promise<void>;
}

export class UsersClient implements Users {
    private swaggerClient: any;

    constructor(swaggerClient: any) {
        this.swaggerClient = swaggerClient;
    }

    public async list(filters: any): Promise<Array<UserData>> {
        const response = await this.swaggerClient.apis.Users.UsersRestList(filters);
        return getResponseBody(response);
    }

    public async addUser(user: UserData): Promise<string> {
        const response = await this.swaggerClient.apis.Users.UsersRestAddUser({ user: user });
        return getCreatedResource(response).substring(6);
    }

    public async updateUser(login: string, user: UserData): Promise<void> {
        user.login = login;
        const response = await this.swaggerClient.apis.Users.UsersRestUpdateUser({ login: login, user: user });
        checkStatus(response, 204);
    }

    public async removeUser(login: string): Promise<void> {
        const response = await this.swaggerClient.apis.Users.UsersRestRemoveUser({ login: login });
        checkStatus(response, 204);
    }

    public async getUser(login: string): Promise<UserData> {
        const response = await this.swaggerClient.apis.Users.UsersRestGetUser({ login: login });
        return getResponseBody(response);
    }

    public async changeUserPassword(login: string, password: string): Promise<void> {
        const response = await this.swaggerClient.apis.Users.UsersRestChangePassword({ login: login, password: password });
        checkStatus(response, 204);
    }
}
