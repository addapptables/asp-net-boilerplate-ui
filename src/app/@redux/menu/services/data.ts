import { MenuModel } from '@addapptables/menu';

export const menus: MenuModel[] = [
    {
        id: '1',
        class: 'material-icons',
        value: 'business',
        title: 'tenant.title',
        isOpen: false,
        multiOption: false,
        url: '/admin/tenants',
        exact: true,
        permission: 'Pages.Tenants'
    },
    {
        id: '2',
        class: 'material-icons',
        value: 'library_books',
        title: 'edition.title',
        isOpen: false,
        multiOption: false,
        url: '/admin/editions',
        exact: true,
        permission: 'Pages.Editions'
    },
    {
        id: '3',
        class: 'material-icons',
        value: 'linear_scale',
        title: 'administration.title',
        isOpen: false,
        multiOption: true,
        exact: true,
        permission: 'Pages.Administration',
        children: [
            {
                id: '4',
                class: 'material-icons',
                value: 'supervised_user_circle',
                title: 'role.title',
                isOpen: false,
                multiOption: false,
                url: '/admin/roles',
                exact: true,
                permission: 'Pages.Administration.Roles'
            },
            {
                id: '5',
                class: 'material-icons',
                value: 'people',
                title: 'user.title',
                isOpen: false,
                multiOption: false,
                url: '/admin/users',
                exact: true,
                permission: 'Pages.Administration.Users'
            },
            {
                id: '6',
                class: 'fas fa-sitemap',
                title: 'organizationUnit.title',
                isOpen: false,
                multiOption: false,
                url: '/admin/organization-units',
                exact: true,
                permission: 'Pages.Administration.OrganizationUnits'
            },
        ]
    },
    {
        id: '7',
        class: 'material-icons',
        value: 'contacts',
        title: 'contact.title',
        isOpen: false,
        multiOption: false,
        url: '/admin/accountancy/contacts',
        exact: true,
        permission: 'Pages.Public.Contacts'
    }
];
