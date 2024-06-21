//this file is for the data (the columns of the users table) we dont to make all of code in the main file of the table (DataTable file), it will be a bit messy

export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "username",
        headerName: "الاسم الكامل",
        width: 200,
        editable: true,
    },
    {
        field: "email",
        headerName: "البريد الالكتروني",
        width: 280,
        editable: true,
    },
    {
        field: "phoneNumber",
        headerName: "رقم الهاتف",
        width: 230,
        editable: true,
    },
    {
        field: "admin",
        headerName: "نوع المستخدم",
        type: "boolean",
        width: 100,
    },
    {
        field: "orders",
        headerName: "الطلبات",
        type: "boolean",
        width: 250,
    },
];

