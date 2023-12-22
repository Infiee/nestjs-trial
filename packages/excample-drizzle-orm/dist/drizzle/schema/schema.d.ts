export declare const users: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "users";
            dataType: "number";
            columnType: "MySqlSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        username: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "name";
            tableName: "users";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        password: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "password";
            tableName: "users";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        email: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "email";
            tableName: "users";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        createTime: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "create_time";
            tableName: "users";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        updateTime: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "update_time";
            tableName: "users";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        testUpdate: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "test_update";
            tableName: "users";
            dataType: "number";
            columnType: "MySqlBigInt53";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
export declare const posts: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "posts";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "posts";
            dataType: "number";
            columnType: "MySqlSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        content: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "content";
            tableName: "posts";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        authorId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "author_id";
            tableName: "posts";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
