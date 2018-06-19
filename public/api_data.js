define({
  api: [
    {
      type: 'post',
      url: 'auth/login',
      title: 'Login',
      name: 'Login',
      group: 'Auth',
      permission: [
        {
          name: 'None'
        }
      ],
      parameter: {
        examples: [
          {
            title: 'Raw data example',
            content: '{\n    "email": "youness@gmail.com",\n    "password": "123456"\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n{\n    "token": "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVfaWQiOiI1YTUxNjBlZTE4zIiwVuZXNzQGdtYWlsLmNvbSIsInifSx7 ...",\n    "user": {\n        "_id": "5a5160ee18dd6e05a03bf3a2",\n        "firstName": "Youness",\n        "lastName": "Houdass",\n        "email": "youness@gmail.com",\n        "role": {\n            "_id": "5a576e0de14a8635e3dabe23",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    }\n}',
            type: 'json'
          }
        ]
      },
      error: {
        examples: [
          {
            title: 'Register error',
            content: '400 Bad Request',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/auth.router.js',
      groupTitle: 'Auth'
    },
    {
      type: 'post',
      url: 'auth/register',
      title: 'Registration',
      name: 'Register',
      group: 'Auth',
      permission: [
        {
          name: 'None'
        }
      ],
      parameter: {
        examples: [
          {
            title: 'Raw data example',
            content:
              '\n{\n    "email": "john@gmail.com",\n    "password": "123456",\n    "firstName": "John",\n    "lastName": "Doe",\n    "role": "59872482d44ea90d62fc5011"\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '201 Created\n\n{\n    "token": "JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiVybWlzc2lvbnMiOlsiNWE1NzZkZGVlMTR ...",\n    "user": {\n        "_id": "5a5b4d2e311f560d83bc6490",\n        "firstName": "John",\n        "lastName": "Doe",\n        "email": "john@gmail.com",\n        "role": {\n            "_id": "5a576e0de14a8635e3dabe23",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    }\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/auth.router.js',
      groupTitle: 'Auth'
    },
    {
      type: 'get',
      url: 'cityScan/',
      title: 'Analyze',
      name: 'Analyze',
      group: 'CityScan',
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n[\n    {\n        "_id": "5a5160ee18dd6e05a03bf3a2",\n        "firstName": "Youness",\n        "lastName": "Houdass",\n        "email": "youness@gmail.com",\n        "role": {\n            "_id": "5a5b5e287826ecf1aba17e9e",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    },\n    {\n        "_id": "5a5b4f2fc654151673c8dea2",\n        "firstName": "Mouad",\n        "lastName": "Ennaciri",\n        "email": "mouad@gmail.com",\n        "role": {\n            "_id": "5a5b5e287826ecf1aba17e9e",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    }\n]',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/cityscan.router.js',
      groupTitle: 'CityScan'
    },
    {
      type: 'get',
      url: 'cityscan/',
      title: 'Get Places',
      name: 'getAddresses',
      group: 'CityScan',
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n[\n    {\n        "_id": "5a5160ee18dd6e05a03bf3a2",\n        "firstName": "Youness",\n        "lastName": "Houdass",\n        "email": "youness@gmail.com",\n        "role": {\n            "_id": "5a5b5e287826ecf1aba17e9e",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    },\n    {\n        "_id": "5a5b4f2fc654151673c8dea2",\n        "firstName": "Mouad",\n        "lastName": "Ennaciri",\n        "email": "mouad@gmail.com",\n        "role": {\n            "_id": "5a5b5e287826ecf1aba17e9e",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    }\n]',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/cityscan.router.js',
      groupTitle: 'CityScan'
    },
    {
      type: 'post',
      url: 'permissions/',
      title: 'Add permission',
      name: 'addPermission',
      group: 'Permission',
      parameter: {
        examples: [
          {
            title: 'Raw data example',
            content: '{\n    "label": "READ_USERS"\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '201 Created\n{\n    "__v": 0,\n    "label": "READ_USERS",\n    "_id": "5a5b8ac9821831204787ab83"\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/permission.router.js',
      groupTitle: 'Permission'
    },
    {
      type: 'put',
      url: 'permissions/:id',
      title: 'Edit permission',
      name: 'editPermission',
      group: 'Permission',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Permission id</p>'
            }
          ]
        },
        examples: [
          {
            title: 'Raw data example',
            content: '{\n    "label": "WRITE_USERS"\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content: '200 OK\n{\n    "label": "WRITE_USERS"\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/permission.router.js',
      groupTitle: 'Permission'
    },
    {
      type: 'get',
      url: 'permissions/:id',
      title: 'Find permission',
      name: 'findPermission',
      group: 'Permission',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Permission id</p>'
            }
          ]
        }
      },
      success: {
        examples: [
          {
            title: 'Success',
            content: '200 OK\n{\n    "_id": "5a576df7e14a8635e3dabe1b",\n    "label": "WRITE_USERS"\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/permission.router.js',
      groupTitle: 'Permission'
    },
    {
      type: 'get',
      url: 'permissions/',
      title: 'Find all permissions',
      name: 'findPermissions',
      group: 'Permission',
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n[\n    {\n        "_id": "5a576ddee14a8635e3dabe0c",\n        "label": "READ_USERS"\n    },\n    {\n        "_id": "5a576df7e14a8635e3dabe1b",\n        "label": "WRITE_USERS"\n    }\n]',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/permission.router.js',
      groupTitle: 'Permission'
    },
    {
      type: 'delete',
      url: 'permissions/:id',
      title: 'Remove permission',
      name: 'removePermission',
      group: 'Permission',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Permission id</p>'
            }
          ]
        }
      },
      success: {
        examples: [
          {
            title: 'Success',
            content: '204 No Content',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/permission.router.js',
      groupTitle: 'Permission'
    },
    {
      type: 'post',
      url: 'roles/',
      title: 'Add role',
      name: 'addRole',
      group: 'Role',
      parameter: {
        examples: [
          {
            title: 'Raw data example',
            content:
              '{\n    "label": "ADMIN",\n    "permissions": [\n        "5a576ddee14a8635e3dabe0c",\n        "5a576df7e14a8635e3dabe1b"\n    ]\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '201 Created\n\n{\n    "__v": 0,\n    "label": "ADMIN",\n    "_id": "5a5b624ff244752b5321572a",\n    "permissions": [\n        {\n            "_id": "5a576ddee14a8635e3dabe0c",\n            "label": "READ_USERS"\n        },\n        {\n            "_id": "5a576df7e14a8635e3dabe1b",\n            "label": "WRITE_USERS"\n        }\n    ]\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/role.router.js',
      groupTitle: 'Role'
    },
    {
      type: 'put',
      url: 'roles/:id',
      title: 'Edit role',
      name: 'editRole',
      group: 'Role',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Role id</p>'
            }
          ]
        },
        examples: [
          {
            title: 'Raw data example',
            content: '{\n    "label": "MEMBER",\n    "permissions": [\n        "5a576ddee14a8635e3dabe0c"\n    ]\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n{\n    "_id": "5a5a380fffa7560961bd66fd",\n    "label": "MEMBER",\n    "__v": 3,\n    "permissions": [\n        "5a576ddee14a8635e3dabe0c"\n    ]\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/role.router.js',
      groupTitle: 'Role'
    },
    {
      type: 'get',
      url: 'roles/:id',
      title: 'Find role',
      name: 'findRole',
      group: 'Role',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Role id</p>'
            }
          ]
        }
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n{\n    "_id": "5a5b5e287826ecf1aba17e9e",\n    "label": "ADMIN",\n    "permissions": [\n        {\n            "_id": "5a576ddee14a8635e3dabe0c",\n            "label": "READ_USERS"\n        },\n        {\n            "_id": "5a576df7e14a8635e3dabe1b",\n            "label": "WRITE_USERS"\n        }\n    ]\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/role.router.js',
      groupTitle: 'Role'
    },
    {
      type: 'get',
      url: 'roles/',
      title: 'Find all roles',
      name: 'findRoles',
      group: 'Role',
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n[\n {\n     "_id": "5a576e0de14a8635e3dabe23",\n     "label": "ADMIN",\n     "permissions": [\n         {\n             "_id": "5a576ddee14a8635e3dabe0c",\n             "label": "READ_USERS"\n         },\n         {\n             "_id": "5a576df7e14a8635e3dabe1b",\n             "label": "WRITE_USERS"\n         }\n     ]\n },\n {\n     "_id": "5a5a380fffa7560961bd66fd",\n     "label": "CLIENT",\n     "__v": 2,\n     "permissions": []\n }\n]',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/role.router.js',
      groupTitle: 'Role'
    },
    {
      type: 'delete',
      url: 'roles/:id',
      title: 'Remove role',
      name: 'removeRole',
      group: 'Role',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Role id</p>'
            }
          ]
        }
      },
      success: {
        examples: [
          {
            title: 'Success',
            content: '204 No Content',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/role.router.js',
      groupTitle: 'Role'
    },
    {
      type: 'put',
      url: 'users/:id',
      title: 'Edit user',
      name: 'editUser',
      group: 'User',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>User id</p>'
            }
          ]
        },
        examples: [
          {
            title: 'Raw data example',
            content:
              '{\n    "firstName": "Youness",\n    "lastName": "Houdass",\n    "email": "youness@gmail.com",\n    "role": "5a5b5e287826ecf1aba17e9e"\n}',
            type: 'json'
          }
        ]
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n{\n    "_id": "5a5160ee18dd6e05a03bf3a2",\n    "updatedAt": "2018-01-14T17:54:48.309Z",\n    "createdAt": "2017-07-02T23:18:26.347Z",\n    "firstName": "Youness",\n    "lastName": "Houdass",\n    "email": "youness@gmail.com",\n    "role": {\n        "_id": "5a5b5e287826ecf1aba17e9e",\n        "label": "ADMIN",\n        "permissions": [\n            {\n                "_id": "5a576ddee14a8635e3dabe0c",\n                "label": "READ_USERS"\n            },\n            {\n                "_id": "5a576df7e14a8635e3dabe1b",\n                "label": "WRITE_USERS"\n            }\n        ]\n    }\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/user.router.js',
      groupTitle: 'User'
    },
    {
      type: 'get',
      url: 'users/:id',
      title: 'Find user',
      name: 'findUser',
      group: 'User',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>User id</p>'
            }
          ]
        }
      },
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n{\n    "_id": "5a5160ee18dd6e05a03bf3a2",\n    "updatedAt": "2017-07-02T23:18:26.347Z",\n    "createdAt": "2017-07-02T23:18:26.347Z",\n    "firstName": "Youness",\n    "lastName": "Houdass",\n    "email": "youness@gmail.com",\n    "role": {\n        "_id": "5a5b5e287826ecf1aba17e9e",\n        "label": "ADMIN",\n        "permissions": [\n            {\n                "_id": "5a576ddee14a8635e3dabe0c",\n                "label": "READ_USERS"\n            },\n            {\n                "_id": "5a576df7e14a8635e3dabe1b",\n                "label": "WRITE_USERS"\n            }\n        ]\n    }\n}',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/user.router.js',
      groupTitle: 'User'
    },
    {
      type: 'get',
      url: 'users/',
      title: 'Find all users',
      name: 'findUsers',
      group: 'User',
      success: {
        examples: [
          {
            title: 'Success',
            content:
              '200 OK\n[\n    {\n        "_id": "5a5160ee18dd6e05a03bf3a2",\n        "firstName": "Youness",\n        "lastName": "Houdass",\n        "email": "youness@gmail.com",\n        "role": {\n            "_id": "5a5b5e287826ecf1aba17e9e",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    },\n    {\n        "_id": "5a5b4f2fc654151673c8dea2",\n        "firstName": "Mouad",\n        "lastName": "Ennaciri",\n        "email": "mouad@gmail.com",\n        "role": {\n            "_id": "5a5b5e287826ecf1aba17e9e",\n            "label": "ADMIN",\n            "permissions": [\n                {\n                    "_id": "5a576ddee14a8635e3dabe0c",\n                    "label": "READ_USERS"\n                },\n                {\n                    "_id": "5a576df7e14a8635e3dabe1b",\n                    "label": "WRITE_USERS"\n                }\n            ]\n        }\n    }\n]',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/user.router.js',
      groupTitle: 'User'
    },
    {
      type: 'delete',
      url: 'users/:id',
      title: 'Remove user',
      name: 'removeUser',
      group: 'User',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>User id</p>'
            }
          ]
        }
      },
      success: {
        examples: [
          {
            title: 'Success',
            content: '204 No Content',
            type: 'json'
          }
        ]
      },
      version: '0.0.0',
      filename: 'src/routers/user.router.js',
      groupTitle: 'User'
    }
  ]
});
